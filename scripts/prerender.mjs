// Pré-renderização estática: roda depois de `vite build` (cliente) e `vite build --ssr` (servidor).
// Para cada rota de src/seo/pages.ts grava dist/<rota>/index.html com o HTML da página já renderizado
// e os metadados próprios (título, descrição, canonical, Open Graph, Twitter). Também gera
// dist/404.html (com noindex) e dist/sitemap.xml. Não depende de nenhum fallback 404 do servidor.
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const BASENAME = process.env.GITHUB_ACTIONS ? "/PORTFOLIO" : "/Portifolio";

const entry = ["entry-server.mjs", "entry-server.js"].map((f) => path.join(ssrDir, f)).find(existsSync);
if (!entry) throw new Error("dist-ssr/entry-server não encontrado: rode `vite build --ssr src/entry-server.tsx --outDir dist-ssr` antes.");
const { render, seoPages, notFoundPage, pageUrl } = await import(pathToFileURL(entry).href);

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html sem <div id="root"></div>');

// O StaticRouter espera a URL completa, com o prefixo do site
const renderAt = (sitePath) => render(`${BASENAME}${sitePath}`, BASENAME);

const esc = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Troca uma tag do <head> do modelo; falha em voz alta se ela não existir. */
const swap = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`Tag do modelo não encontrada: ${pattern}`);
  return html.replace(pattern, replacement);
};

const build = (page, appHtml, { canonical }) => {
  let html = template;
  html = swap(html, /<title>.*?<\/title>/s, `<title>${esc(page.title)}</title>`);
  html = swap(html, /<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${esc(page.description)}" />`);
  html = swap(html, /<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${esc(page.title)}" />`);
  html = swap(html, /<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${esc(page.description)}" />`);
  html = swap(html, /<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${esc(page.image)}" />`);
  html = swap(html, /<meta property="og:image:alt" content=".*?" \/>/s, `<meta property="og:image:alt" content="${esc(page.title)}" />`);
  html = swap(html, /<meta name="twitter:image" content=".*?" \/>/s, `<meta name="twitter:image" content="${esc(page.image)}" />`);
  html = swap(
    html,
    /<meta name="twitter:card" content="summary_large_image" \/>/,
    `<meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${esc(page.title)}" />\n  <meta name="twitter:description" content="${esc(page.description)}" />`,
  );
  if (canonical) {
    html = swap(html, /<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
    html = swap(html, /<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`);
  } else {
    html = swap(html, /\s*<link rel="canonical" href=".*?" \/>/, "");
    html = swap(html, /\s*<meta property="og:url" content=".*?" \/>/, "");
    html = swap(html, /<meta charset="UTF-8" \/>/, '<meta charset="UTF-8" />\n  <meta name="robots" content="noindex" />');
  }
  return swap(html, /<div id="root"><\/div>/, () => `<div id="root">${appHtml}</div>`);
};

const write = async (file, content) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, "utf8");
};

for (const page of seoPages) {
  const appHtml = renderAt(page.path);
  const file = page.path === "/" ? "index.html" : path.join(page.path.slice(1), "index.html");
  await write(path.join(dist, file), build(page, appHtml, { canonical: pageUrl(page.path) }));
}

// 404.html: o GitHub Pages o serve para qualquer caminho inexistente (status 404, noindex)
await write(path.join(dist, "404.html"), build(notFoundPage, renderAt("/rota-inexistente"), { canonical: null }));

const urls = seoPages.filter((p) => p.indexable).map((p) => `  <url>\n    <loc>${pageUrl(p.path)}</loc>\n  </url>`);
await write(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`pré-renderização: ${seoPages.length} páginas + 404.html + sitemap.xml (${urls.length} URLs)`);
