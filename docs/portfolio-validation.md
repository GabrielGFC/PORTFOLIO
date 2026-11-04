# Validação do portfólio

Data: 2026-10-23. Estado validado: árvore de trabalho local, **sem commit** (o commit publicado em produção é anterior a estas mudanças). Tudo abaixo foi executado de fato; o que não foi executado está em "Limites e não verificado".

## 1. Verificações de código

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Tipos | `tsc --noEmit` | passou (exit 0) |
| Lint | `eslint .` | 0 erros, 6 avisos (`react-refresh/only-export-components` em `motion.tsx` e `LanguageContext.tsx`, já existentes) |
| Build de produção | `vite build` | passou; JS 429 kB (137 kB gzip), CSS 39 kB (8 kB gzip), fontes 170 kB em 4 arquivos `woff2` (só os subconjuntos usados são baixados) |
| Testes unitários do portfólio | n/a | **não existem**; o projeto não tem suíte de testes |

## 2. Lighthouse 13.5.0 (terceira rodada: fontes locais, nomes acessíveis e imagens em WebP)

Condições: build de produção servido por `vite preview` em `localhost`, Edge headless, categorias Performance, Accessibility, Best Practices e SEO, uma execução por página e modo. "Mobile" usa a simulação padrão do Lighthouse (4G lento, CPU 4× mais lenta); "Desktop" usa o preset desktop. O `vite preview` não comprime as respostas como a GitHub Pages. Uma única execução por página varia; trate os números como indicativos.

| Página | Modo | Perf. | Acess. | Boas práticas | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Mobile | 95 | 100 | 100 | 100 | 2,1 s | 2,5 s | 30 ms | 0,034 |
| Home | Desktop | 100 | 100 | 100 | 100 | 0,5 s | 0,5 s | 0 ms | 0,03 |
| Trajetória | Mobile | 96 | 100 | 100 | 100 | 2,1 s | 2,3 s | 50 ms | 0,021 |
| Trajetória | Desktop | 100 | 100 | 100 | 100 | 0,5 s | 0,5 s | 0 ms | 0,024 |
| Projeto (JAC) | Mobile | 96 | 100 | 100 | 100 | 2,1 s | 2,3 s | 20 ms | 0 |
| Projeto (JAC) | Desktop | 100 | 100 | 100 | 100 | 0,5 s | 0,5 s | 0 ms | 0 |

Peso total da página: Home 301 KiB, Trajetória 215 KiB, Projeto 254 KiB. As imagens dos cartões passaram de 5.223 KB (PNG) para 267 KB (WebP, largura máxima 1.280 px).

**Meta do plano (≥ 90 em todas as categorias): atendida nas seis medições.**

### Antes e depois das correções

| Página / modo | Desempenho antes | Desempenho depois | LCP antes | LCP depois |
| --- | --- | --- | --- | --- |
| Home, mobile | 86 | 95 | 3,3 s | 2,5 s |
| Projeto, mobile | 88 | 96 | 3,0 s | 2,3 s |
| Trajetória, mobile | 91 | 96 | 2,8 s | 2,3 s |
| Home, desktop | 98 | 100 | 0,9 s | 0,5 s |

### O que foi corrigido

| Item | Causa | Correção | Resultado |
| --- | --- | --- | --- |
| CSS de fontes bloqueante | Folha do Google Fonts bloqueava a renderização (≈ 1.180 ms estimados) e o LCP da home é o `<h1>` do hero | Inter e Geist Mono hospedadas no site (`src/assets/fonts/*.woff2`, `src/styles/fonts.scss`, `font-display: swap`); links do Google Fonts removidos do `index.html` | Nenhuma requisição a terceiros; FCP mobile de 2,7 s para 2,1 s |
| Nomes acessíveis (WCAG 2.5.3) | Link da marca com `aria-label="Início"` e texto visível "GFC"; botão de idioma com rótulo sem o texto "PT / EN" | `aria-label` agora começa pelo texto visível: "GFC, início" e "PT / EN, …" | `label-content-name-mismatch`: 0 itens |

### Pendências do Lighthouse

| Item | Evidência | Sugestão |
| --- | --- | --- |
| Entrega de imagens | Continua em 50/100 mesmo após a conversão para WebP; as imagens ainda são servidas com até 1.280 px de largura para áreas de 253 a 568 px (em telas 2×) | Gerar versões menores com `srcset` para os cartões; ganho pequeno, pois o peso total já é de 215 a 301 KiB |
| CSS principal ainda bloqueia | Estimativa de 600 ms na home mobile (1 arquivo, 8 kB comprimido) | Aceitável hoje; só vale mexer se for preciso mais ganho |
| JavaScript não usado | Em torno de 49 KiB no bundle único | Dividir rotas com `React.lazy` se o peso crescer |
| Tempo de thread principal (mobile, home) | Auditoria `mainthread-work-breakdown` em 50 | Reavaliar após as imagens |

## 3. Verificações no navegador (Playwright)

- **Larguras 320, 375, 768, 1024 e 1440 px:** sem overflow horizontal nas páginas Home, Trajetória e projetos (JAC e James Fanstone); hero, Trabalho, Experiência, Sobre e Contato capturados nas cinco larguras. Imagens em `docs/visual-audit/` (`antes/`, `depois/`, `trabalho/`, `secoes/`, `paginas/`, `hero-proposals/`, `monograma/`). Nem toda captura foi inspecionada a olho: as de 768 e 320 px de várias seções só tiveram a medição de overflow.
- **Teclado:** Tab percorre os quatro cartões de projeto, com contorno de 2 px; Enter abre o estudo de caso. O botão "Detalhes" da Experiência abre e fecha com Enter (`aria-expanded` muda). O índice da Trajetória responde ao Enter e marca o capítulo. Links de contato mostram contorno de foco.
- **Movimento reduzido:** com `prefers-reduced-motion` o monograma aparece já desenhado.
- **Animação do monograma:** roda uma vez por sessão (marcador em `sessionStorage`).
- **Console:** sem erros nas navegações testadas; apenas avisos do ambiente de desenvolvimento.
- **Contraste (cálculo manual, não por ferramenta de página):** marfim sobre ink 14,6:1; texto suave sobre ink 8,6:1; texto suave sobre cartão 7,4:1; ciano sobre ink 7,75:1; creme sobre fundo noturno 10,4:1. O Lighthouse não reportou falha de contraste.
- **Alvos de toque:** botões de contato com 44 px de altura.
- **Fontes após a troca:** confirmado no navegador que Inter e Geist Mono carregam dos arquivos locais, que nenhuma requisição sai para outro domínio e que o hero se renderiza normalmente (`docs/visual-audit/after/fontes-locais-hero.png`). Não foi refeita a revisão visual de todas as telas depois da troca; o Lighthouse não indicou mudança de layout relevante (CLS entre 0 e 0,034).
- **Nome do botão de idioma:** o trecho final do rótulo agora está no idioma da página ("PT / EN, Mudar para inglês" e "PT / EN, Switch to Portuguese"). Antes, o texto em português dizia "Switch to English" e o inglês dizia "Trocar para Português". Conferido nos arquivos de texto; a leitura por leitor de tela não foi testada.
- **Contato e links de produção (verificado no navegador):** o e-mail do site passou a ser carvalhofernandesgfc@proton.me em todos os textos (contato, privacidade, cookies e banner). O botão "Enviar e-mail" abre o `mailto:` com assunto pronto, e "Copiar e-mail" grava o endereço na área de transferência (confirmado). Os sistemas no ar (Maximiza, E-Sports e James Fanstone legado) ganharam "Ver em produção": botão na página do projeto, link no cartão da Maximiza e link nas linhas do arquivo; o clique nesse link abre o site sem abrir o estudo de caso. A Maximiza aponta para um endereço `workers.dev`, e o James Fanstone em Java ainda não tem link público. Não foi repetido o Lighthouse depois destas mudanças.
- **Imagens em WebP:** conferidas no navegador na seção Trabalho a 1440 px (`docs/visual-audit/after/trabalho-webp-1440.png`); o texto pequeno das capturas continua legível. As capturas em PNG originais seguem em `src/assets/projects/`, sem uso no código.

## 4. Conteúdo

Os números de testes publicados vêm de `docs/portfolio-case-study-evidence.md` (seção "Medições de testes", 2026-10-23): James Fanstone 482, JAC 353 unitários, Maximiza 239, Aila 112 aprovados e 70 pulados por dependerem de PostgreSQL. São medições daquela data, não uma execução atual.

## 5. Limites e não verificado

- Nenhuma execução em dispositivos físicos nem em Safari/Firefox; só Chromium (Playwright e Edge).
- Leitor de tela, zoom de 200 % e navegação só por voz **não foram testados**. A conformidade com WCAG 2.2 AA **não está comprovada**: a nota 100 do Lighthouse cobre só as verificações automáticas.
- Lighthouse foi executado uma vez por página e modo, contra `localhost`, e não contra a URL publicada na GitHub Pages.
- O cartão de compartilhamento (`og-image.png`) não foi validado nas redes sociais; isso só funciona com a URL pública.
- O favicon não tem versão simplificada para 16 px; não há `favicon.ico` nem manifesto PWA.
- O site publicado ainda é o commit anterior; estas mudanças não foram enviadas, e o primeiro deploy pode revelar diferenças (o `bun.lock` foi alterado com o Bun 1.3.3 local, e o CI fixa o 1.1.34 com `--frozen-lockfile`). As fontes agora saem do bundle, então o deploy depende dos arquivos em `src/assets/fonts/` estarem no repositório.
- Roteamento por hash (`#/`): páginas de projeto não têm metadados nem indexação próprios; decisão adiada (ver `portfolio-audit.md`).
- Questões de conteúdo pendentes de você: vínculo do JAC com a UniEVANGÉLICA ("Projeto pessoal"), estado de produção de Aila e do JAC, e o que o fluxo de Fiança da Maximiza faz.

## 6. Recomendação

**Pronto para revisão e commit; ainda não pronto para ser chamado de "validado".**

- Os dois problemas apontados na primeira rodada foram corrigidos e medidos: desempenho mobile subiu de 86–91 para 93–96, e o desvio de nome acessível foi zerado.
- Antes de publicar: conferir o primeiro deploy (lockfile do Bun e arquivos de fonte) e repetir o Lighthouse na URL publicada.
- Pode esperar: conversão das imagens para WebP/AVIF, divisão do bundle por rota, favicon de 16 px.
- Antes de afirmar conformidade WCAG: testar com leitor de tela e zoom de 200 %.
