import Portuguese from "../mocks/portuguese.json";
import { featuredProjects } from "../data/featuredProjects";

/** Origem e prefixo do site publicado (GitHub Pages). */
export const SITE_URL = "https://gabrielgfc.github.io/Portifolio";
export const SITE_NAME = "Gabriel Fernandes de Carvalho";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export type SeoPage = {
  /** Caminho dentro do site, sem prefixo: "/", "/trajetoria", "/projetos/jac". */
  path: string;
  title: string;
  description: string;
  /** Imagem de compartilhamento absoluta (1200x630). */
  image: string;
  /** Entra no sitemap.xml (a página 404 não entra). */
  indexable: boolean;
};

const HOME_DESCRIPTION =
  "Desenvolvedor de software que resolve problemas no back-end e no front-end. Veja os sistemas que coloquei no ar para uma universidade e para empresas, com as tecnologias de cada um.";

const projectPages: SeoPage[] = featuredProjects.map((project) => ({
  path: `/projetos/${project.id}`,
  title: `${project.title} | ${SITE_NAME}`,
  description: project.impact,
  image: `${SITE_URL}/og/${project.id}.png`,
  indexable: true,
}));

/** Todas as páginas pré-geradas. A ordem define a do sitemap. */
export const seoPages: SeoPage[] = [
  {
    path: "/",
    title: `${SITE_NAME} | Desenvolvedor Backend e Full Stack`,
    description: HOME_DESCRIPTION,
    image: DEFAULT_IMAGE,
    indexable: true,
  },
  {
    path: "/trajetoria",
    title: `${Portuguese.lux.journey.eyebrow} | ${SITE_NAME}`,
    description: Portuguese.lux.journey.intro,
    image: DEFAULT_IMAGE,
    indexable: true,
  },
  ...projectPages,
  {
    path: "/privacidade",
    title: `Política de Privacidade | ${SITE_NAME}`,
    description: "O que este site coleta (quase nada), como falar comigo e como pedir a exclusão de dados, com base na LGPD.",
    image: DEFAULT_IMAGE,
    indexable: true,
  },
  {
    path: "/termos",
    title: `Termos de Uso | ${SITE_NAME}`,
    description: "Termos de uso do portfólio de Gabriel Fernandes de Carvalho.",
    image: DEFAULT_IMAGE,
    indexable: true,
  },
  {
    path: "/cookies",
    title: `Política de Cookies | ${SITE_NAME}`,
    description: "Este site não grava cookies. Veja o único item temporário que ele guarda no navegador.",
    image: DEFAULT_IMAGE,
    indexable: true,
  },
];

export const notFoundPage: SeoPage = {
  path: "/404",
  title: `Página não encontrada | ${SITE_NAME}`,
  description: "A página procurada não existe.",
  image: DEFAULT_IMAGE,
  indexable: false,
};

/** URL pública e canônica de uma página, com barra final (é como o GitHub Pages serve diretórios). */
export const pageUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`);
