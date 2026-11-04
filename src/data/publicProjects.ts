export interface AdditionalProject {
  id: string;
  title: string;
  titleEn: string;
  stack: string[];
  description: string;
  descriptionEn: string;
  linkLabel?: string;
  url?: string;
  isFallback?: boolean;
}

export const additionalProjects: AdditionalProject[] = [
  {
    id: "todo-angular",
    title: "To-do List Angular",
    titleEn: "Angular To-do List",
    stack: ["Angular", "TypeScript"],
    description:
      "Aplicação de tarefas em Angular com componentes, formulários reativos e gerenciamento de estado.",
    descriptionEn:
      "Angular task app with reusable components, reactive forms and state management.",
    linkLabel: "Abrir no GitHub",
    url: "https://github.com/GabrielGFC/To-do-List-Agular",
  },
  {
    id: "disponibilidade-baan",
    title: "Disponibilidade BAAN — Backend",
    titleEn: "BAAN Availability — Backend",
    stack: ["Node.js", "JavaScript"],
    description:
      "Clone de um backend de disponibilidade em Node.js, com operações CRUD para registros e regras de horários.",
    descriptionEn:
      "Clone-based Node.js availability backend with CRUD operations for records and scheduling rules.",
    linkLabel: "Ver repositório",
    url: "https://github.com/GabrielGFC/Disponibilidade-BAAN-backend",
  },
  {
    id: "product-api",
    title: "ProductAPI",
    titleEn: "ProductAPI",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker"],
    description:
      "API REST de produtos com upload de imagens, PostgreSQL, documentação Swagger e execução via Docker.",
    descriptionEn:
      "Product REST API with image uploads, PostgreSQL, Swagger documentation and Docker setup.",
    linkLabel: "Ver repositório",
    url: "https://github.com/GabrielGFC/ProductAPI",
  },
  {
    id: "desafio-picpay",
    title: "Desafio PicPay",
    titleEn: "PicPay Coding Challenge",
    stack: ["NestJS", "TypeScript", "Sequelize", "PostgreSQL"],
    description:
      "API de gerenciamento de tarefas com autenticação JWT e operações CRUD, desenvolvida como desafio técnico em NestJS, TypeScript, Sequelize e PostgreSQL.",
    descriptionEn:
      "Task management API with JWT authentication and CRUD operations, built as a coding challenge with NestJS, TypeScript, Sequelize and PostgreSQL.",
    linkLabel: "Abrir no GitHub",
    url: "https://github.com/GabrielGFC/Desafio-PicPay",
  },
  {
    id: "teste-php-laravel",
    title: "Prática de API com Laravel",
    titleEn: "Laravel API Practice",
    stack: ["PHP", "Laravel", "MySQL"],
    description:
      "Projeto público de prática com Laravel, API REST, autenticação e testes.",
    descriptionEn:
      "Public Laravel practice project with a REST API, authentication and tests.",
    linkLabel: "Ver repositório",
    url: "https://github.com/GabrielGFC/teste-php-laravel",
  },
  {
    id: "cannasys",
    title: "CannaSYS — Gestão para Associações de Cannabis Medicinal",
    titleEn: "CannaSYS — Management for Medical-Cannabis Associations",
    stack: ["Node.js", "Vue 3", "PostgreSQL"],
    description:
      "Projeto open source em desenvolvimento para fluxos de gestão de associações de cannabis medicinal, com backend em Node.js e interface Vue 3.",
    descriptionEn:
      "Open-source project in development for management workflows at medical-cannabis associations, with a Node.js backend and Vue 3 interface.",
    linkLabel: "Ver repositório",
    url: "https://github.com/GabrielGFC/restapi-cannays",
  },
  {
    id: "fronteiras-script-automacao",
    title: "Automação Editorial — Revista Fronteiras",
    titleEn: "Editorial Automation — Fronteiras Journal",
    stack: ["Python", "Selenium", "OJS 3.3"],
    description:
      "Automação de fluxos editoriais em OJS com Python e Selenium, execução retomável e relatório de pendências.",
    descriptionEn:
      "Python and Selenium automation for editorial workflows in OJS, with resumable runs and a report of pending items.",
  },
];
