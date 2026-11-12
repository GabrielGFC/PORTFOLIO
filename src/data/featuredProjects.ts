export type CaseStudyTabKey =
  | "problema"
  | "solucao"
  | "arquitetura"
  | "papel"
  | "resultados";

export type CaseStudyTab = {
  key: CaseStudyTabKey;
  title: string;
  content: string | string[];
};

/** Shape of src/mocks/{portuguese,english}.json → featured.<i18nKey> — the localized text for one Featured project, including its case-study tabs. */
export type FeaturedText = {
  title: string;
  badge: string;
  problem: string;
  impact: string;
  roleShort: string;
  result: string;
  cta: string;
  caseStudy: {
    tabs: CaseStudyTab[];
  };
};

/** Grupos de tecnologia: nomes próprios não se traduzem; só o rótulo do grupo vem do JSON (lux.work.techLabels). */
export type TechGroup = {
  group: "back" | "front" | "db" | "infra" | "before";
  items: string[];
};

export type FeaturedProject = {
  id: string;
  /** Tecnologias comprovadas nos repositórios (package.json, build.gradle, docker-compose), agrupadas por camada. */
  tech?: TechGroup[];
  /** Key matching src/mocks/{portuguese,english}.json → featured.<i18nKey>, used to render localized text. */
  i18nKey:
    | "aila"
    | "maximiza"
    | "pasteur"
    | "esports"
    | "jac"
    | "lionFanstone"
    | "coneleste"
    | "farmxp"
    | "fanstoneLegacy";
  title: string;
  badge: string;
  badgeType: "Institucional/Privado" | "Institucional/Publico";
  problem: string;
  impact: string;
  stack: string[];
  roleShort: string;
  resultsPreview: string[];
  owner: boolean;
  /** Whether a real product screenshot exists in src/assets/projects — false renders an honest placeholder instead of a fake preview. */
  hasRealMedia: boolean;
  /** Sistema acessível em produção: `caseStudy.referenceLink` abre o site no ar e ganha o botão "Ver em produção". */
  live?: boolean;
  thumbnailKey:
    | "jac"
    | "esports"
    | "maximiza"
    | "aila"
    | "pasteur"
    | "lion"
    | "coneleste"
    | "farmxp"
    | "fanstoneLegacy";
  /** Case-study tab content lives in the i18n JSON (featured.<i18nKey>.caseStudy.tabs) so the modal is bilingual too — only the structural link stays here. */
  caseStudy: {
    referenceLink?: string;
  };
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "aila",
    i18nKey: "aila",
    title: "Aila — Recomendação Inteligente de Pareceristas",
    badge: "Institucional / Plataforma Editorial",
    badgeType: "Institucional/Privado",
    problem:
      "Encontrar pareceristas qualificados e compatíveis com cada manuscrito é um trabalho manual e lento para a equipe editorial de uma revista científica.",
    impact:
      "Apoia a seleção de pareceristas: classifica o manuscrito por área do CNPq com IA local e ranqueia avaliadores descobertos via OpenAlex e ORCID em quatro níveis, com justificativa rastreável. A decisão final continua com a equipe editorial.",
    stack: ["Python", "FastAPI", "Vue 3", "PostgreSQL", "Ollama/IA local"],
    roleShort:
      "Desenvolvi os 72 commits do repositório: backend em Python/FastAPI, IA local com fallback em nuvem, ranking de avaliadores, registro de convites e RBAC, além do frontend em Vue 3.",
    resultsPreview: [
      "Ranking explicável, 6 ADRs, runbook e 112 testes aprovados; outros 70 dependem de PostgreSQL e ficaram pendentes na medição registrada.",
    ],
    owner: true,
    hasRealMedia: true,
    thumbnailKey: "aila",
    caseStudy: {},
  },
  {
    id: "maximiza",
    i18nKey: "maximiza",
    title: "Maximiza Seguros",
    badge: "Cliente / Produção — Owner",
    badgeType: "Institucional/Publico",
    problem:
      "Uma corretora de seguros precisava de um site institucional para apresentar seu catálogo e receber pedidos de cotação online, sem depender de atendimento manual.",
    impact:
      "Site institucional em produção, com formulários multietapas de cotação, diretório de imobiliárias parceiras sincronizado diariamente e conteúdo corporativo.",
    stack: ["Vue 3", "TypeScript", "Tailwind 4", "Cloudflare", "GitHub Actions"],
    tech: [
      { group: "front", items: ["HTML", "CSS", "TypeScript", "Vue 3", "Vue Router", "Tailwind CSS 4", "Vite", "Vitest"] },
      { group: "infra", items: ["Cloudflare", "GitHub Actions"] },
    ],
    roleShort:
      "Desenvolvi o site em Vue 3, TypeScript e Tailwind 4. O histórico da branch principal tem 215 commits humanos meus e 27 commits automáticos de sincronização.",
    resultsPreview: [
      "Site em produção, com 239 testes automatizados e sincronização diária de parceiros.",
    ],
    owner: true,
    hasRealMedia: true,
    live: true,
    thumbnailKey: "maximiza",
    caseStudy: {
      referenceLink: "https://www.maximizaseguros.com.br/sitenew/",
    },
  },
  {
    id: "pasteur",
    i18nKey: "pasteur",
    title: "Pasteur",
    badge: "Projeto Público / Demonstração",
    badgeType: "Institucional/Publico",
    problem:
      "Sistemas de saúde frequentemente carecem de backends bem modelados para organizar prescrições e fluxos de atendimento clínico.",
    impact:
      "Backend de aplicação clínica com rotinas de prescrição e fluxos de atendimento, demonstrando modelagem de domínio e organização de APIs para sistemas de saúde.",
    stack: ["Node.js", "JavaScript"],
    tech: [{ group: "back", items: ["Node.js", "JavaScript"] }],
    roleShort:
      "Modelei o domínio e organizei as APIs REST do backend, cobrindo rotinas de prescrição e fluxos de atendimento.",
    resultsPreview: [
      "Backend funcional demonstrando modelagem de domínio aplicada a sistemas de saúde.",
    ],
    owner: true,
    hasRealMedia: true,
    thumbnailKey: "pasteur",
    caseStudy: {
      referenceLink: "https://github.com/GabrielGFC/pasteur-backend",
    },
  },
  {
    id: "esports",
    i18nKey: "esports",
    title: "Portal E-Sports UniEVANGÉLICA — 5ª edição",
    badge: "Institucional / Público",
    badgeType: "Institucional/Publico",
    problem:
      "Um torneio institucional de e-sports com múltiplas edições ao longo do tempo precisava de inscrição por modalidade, regulamentos próprios por edição e um histórico público das edições anteriores.",
    impact:
      "Sistema de inscrição por modalidade e gestão do torneio com edições separadas: a 5ª edição na home e a 4ª preservada em rota histórica.",
    stack: ["NestJS", "Nuxt 4", "TypeScript", "PostgreSQL"],
    tech: [
      { group: "front", items: ["HTML", "CSS", "TypeScript", "Nuxt 4", "Vue 3", "Nuxt UI", "Tailwind CSS 4"] },
      { group: "back", items: ["Node.js", "TypeScript", "NestJS 11", "Sequelize"] },
      { group: "db", items: ["PostgreSQL"] },
    ],
    roleShort:
      "Desenvolvi, com outro desenvolvedor, o backend (NestJS, Sequelize, PostgreSQL) e o frontend (Nuxt 4): inscrição por modalidade, edições e segurança da API.",
    resultsPreview: [
      "5ª edição publicada, 4ª preservada como histórico e três falhas P0 de segurança corrigidas em 12/08/2026.",
    ],
    owner: true,
    hasRealMedia: true,
    live: true,
    thumbnailKey: "esports",
    caseStudy: {
      referenceLink: "https://esports.unievangelica.edu.br/",
    },
  },
  {
    id: "jac",
    i18nKey: "jac",
    title: "JAC – Jornada Acadêmica e Comunitária",
    badge: "Projeto Pessoal / Avançado — Owner",
    badgeType: "Institucional/Privado",
    problem:
      "Controlar presença em eventos acadêmicos manualmente é lento e fácil de fraudar, sem visibilidade real de quem participou.",
    impact:
      "Plataforma para explorar programação, inscrição e presença em eventos acadêmicos, com check-in por QR code, áreas por perfil e trilha de segurança documentada. A interface Vue está em transição e não é apresentada como produção.",
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Vue 3", "TypeScript"],
    tech: [
      { group: "front", items: ["HTML", "CSS", "TypeScript", "Vue 3", "Pinia", "Nuxt UI", "Tailwind CSS 4", "Vite"] },
      { group: "back", items: ["Node.js", "TypeScript", "Express 5", "Prisma", "Zod"] },
      { group: "db", items: ["PostgreSQL"] },
    ],
    roleShort:
      "Implementei partes do backend e do frontend, os fluxos de presença e pontos, proteção CSRF e correções específicas de uma auditoria de segurança.",
    resultsPreview: [
      "353 testes unitários passaram na medição registrada (182 backend, 171 frontend); validações de concorrência usaram PostgreSQL. A prontidão de produção e o cutover seguem pendentes.",
    ],
    owner: true,
    hasRealMedia: true,
    live: true,
    thumbnailKey: "jac",
    // Endereço publicado e acessível; o status de produção/cutover segue em avaliação (ver registro do projeto).
    caseStudy: { referenceLink: "https://jac-front-end.gabriel-fernandes-f48.workers.dev/" },
  },
  {
    id: "lion-fanstone",
    i18nKey: "lionFanstone",
    title: "Reescrita do Sistema James Fanstone",
    badge: "Institucional / Em Produção",
    badgeType: "Institucional/Privado",
    live: true,
    problem:
      "Um sistema institucional de pesquisa acadêmica em Laravel precisava evoluir para uma base mais sustentável, migrando o domínio de pesquisa para uma nova arquitetura sem interromper o sistema em produção.",
    impact:
      "Reescrita do backend de uma plataforma institucional de pesquisa acadêmica, migrando do sistema legado em Laravel para Java e Spring Boot, hoje em produção.",
    stack: ["Java 21", "Spring Boot 4", "PostgreSQL", "Flyway"],
    tech: [
      { group: "back", items: ["Java 21", "Spring Boot 4", "Spring Security", "Spring Data JPA", "SOAP (CNPq/Lattes)"] },
      { group: "db", items: ["PostgreSQL", "Flyway"] },
      { group: "front", items: ["HTML", "CSS", "TypeScript", "Vue 3", "Pinia", "Tailwind CSS 4"] },
      { group: "before", items: ["PHP", "Laravel 11", "MySQL", "React", "TypeScript", "MUI"] },
    ],
    roleShort:
      "Desenvolvi (83 de 83 commits) o backend em Java 21 e Spring Boot 4: arquitetura, domínio, migrações Flyway, integração SOAP com o CNPq/Lattes e decisões registradas em ADRs.",
    resultsPreview: [
      "Em produção: 31 controllers, 26 migrações Flyway, 482 testes automatizados e CI.",
    ],
    owner: true,
    hasRealMedia: true,
    thumbnailKey: "lion",
    // Não há URL separada para a reescrita: o endereço público é o da plataforma James Fanstone.
    caseStudy: { referenceLink: "https://plataformajf.unievangelica.edu.br/" },
  },
  {
    id: "coneleste",
    i18nKey: "coneleste",
    title: "Landing Coneleste + Maximiza",
    badge: "Cliente / Colaboração",
    badgeType: "Institucional/Publico",
    problem:
      "Duas corretoras de seguros que se uniram precisavam comunicar a parceria rapidamente com uma landing page e direcionar o tráfego para o site principal.",
    impact:
      "Landing de campanha anunciando a parceria entre Coneleste e Maximiza Seguros, com pipeline de deploy automatizado via GitHub Actions para AWS S3/CloudFront.",
    stack: ["Vue.js", "TypeScript", "AWS S3", "CloudFront", "GitHub Actions"],
    tech: [
      { group: "front", items: ["HTML", "CSS", "TypeScript", "Vue 3", "Tailwind CSS 4", "Vite"] },
      { group: "infra", items: ["AWS S3", "CloudFront", "GitHub Actions"] },
    ],
    roleShort:
      "Colaborei na finalização da landing (favicon, descrição e link externo) desenvolvida majoritariamente por outro desenvolvedor, dentro de um repositório compartilhado.",
    resultsPreview: [
      "Landing publicada em produção com pipeline de deploy automatizado.",
    ],
    owner: false,
    hasRealMedia: true,
    thumbnailKey: "coneleste",
    caseStudy: {
      referenceLink: "https://www.conelesteseguros.com.br/",
    },
  },
  {
    id: "farm-xp",
    i18nKey: "farmxp",
    title: "Farm Automático de XP Dev",
    badge: "Produto Pessoal / Produção — Owner",
    badgeType: "Institucional/Publico",
    problem:
      "Um currículo tradicional em PDF não comunica bem a trajetória e a personalidade de um desenvolvedor.",
    impact:
      "Portal gamificado com identidade visual pixel/dark que apresenta minha trajetória dev: missões, stack, perfil e contato em um fluxo de progressão.",
    stack: ["Cloudflare Workers", "TypeScript"],
    tech: [
      { group: "front", items: ["TypeScript"] },
      { group: "infra", items: ["Cloudflare Workers"] },
    ],
    roleShort:
      "Concebi, desenhei e publiquei o produto — da identidade visual pixel-art à infraestrutura edge.",
    resultsPreview: [
      "Portal pessoal publicado e usado como vitrine narrativa do meu perfil técnico.",
    ],
    owner: true,
    hasRealMedia: true,
    thumbnailKey: "farmxp",
    caseStudy: {
      referenceLink: "https://farma.gabriel-fernandes-f48.workers.dev/",
    },
  },
  {
    id: "fanstone-legacy",
    i18nKey: "fanstoneLegacy",
    title: "Sistema James Fanstone (legado, em produção)",
    badge: "Institucional / Colaboração — Em Produção",
    badgeType: "Institucional/Privado",
    problem:
      "Uma plataforma institucional de pesquisa acadêmica já em produção precisava evoluir com novos relatórios sem interromper o uso diário da equipe.",
    impact:
      "Contribuí com o relatório de matrículas (com filtro por edital e data), lembretes de avaliação por e-mail, busca avançada e validação de equipe externa em uma plataforma de pesquisa acadêmica da UniEVANGÉLICA em produção, mantida por uma equipe.",
    stack: ["Laravel 11", "React", "MUI"],
    tech: [
      { group: "back", items: ["PHP", "Laravel 11"] },
      { group: "db", items: ["MySQL"] },
      { group: "front", items: ["HTML", "CSS", "TypeScript", "React", "MUI", "Tailwind CSS"] },
    ],
    roleShort:
      "118 dos 764 commits do backend e 105 dos 894 do frontend: contribuição em equipe, não sou autor principal do sistema.",
    resultsPreview: [
      "Sistema em produção na UniEVANGÉLICA, com o relatório de matrículas e outras funcionalidades que desenvolvi.",
    ],
    owner: false,
    hasRealMedia: true,
    live: true,
    thumbnailKey: "fanstoneLegacy",
    caseStudy: {
      referenceLink: "https://plataformajf.unievangelica.edu.br/",
    },
  },
];
