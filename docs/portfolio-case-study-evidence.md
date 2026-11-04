# Evidências para os estudos de caso (Lote 3, levantamento)

Data: 2026-10-23. Levantamento somente leitura nos repositórios locais. As contagens de testes dos itens por projeto abaixo foram feitas por busca de padrão no código (`@Test`, `it(`, `test(`), **sem executar as suítes**; os valores **medidos executando as suítes** estão na seção "Medições de testes" logo a seguir e prevalecem sobre qualquer outro número deste documento.

## Medições de testes (2026-10-23)

Suítes executadas localmente, sem alterar os repositórios (o `git status` de cada um ficou igual ao de antes). Docker indisponível na máquina, então nada que dependa de contêiner rodou.

| Projeto | Resultado medido | Comando | Observações |
| --- | --- | --- | --- |
| James Fanstone (Java) | **482 testes, 0 falhas, 0 pulados** (68 arquivos) | `gradlew test --offline` (7 min 48 s, `BUILD SUCCESSFUL`) | Soma dos relatórios XML em `build/test-results/test`. Os testes de integração rodaram, sem pulos. O "27 arquivos de integração" do site vem do levantamento anterior e **não foi recontado**. |
| JAC backend (Jest) | **182 passaram, 10 pulados** (28 suítes rodaram, 1 pulada) | `jest --runInBand` | Os pulados dependem de PostgreSQL (opt-in). |
| JAC frontend (Vitest) | **171 passaram** (34 arquivos) | `vitest run` | Só unitários. |
| JAC, total unitário | **353** (182 + 171) | soma | **Não inclui** os 121 testes E2E do Playwright nem os testes de concorrência em PostgreSQL, que não foram executados. |
| Maximiza (Vitest) | **239 passaram** (47 arquivos) | `vitest run` | |
| Aila (pytest) | **112 passaram, 70 pulados** | `pytest backend/tests` em um ambiente virtual temporário | Os 70 pulados exigem `TEST_DATABASE_URL` (PostgreSQL). Dependências pesadas (`sentence-transformers`, `transformers`) não foram instaladas; não se sabe se algum dos 70 depende delas. O frontend do Aila não tem testes. |

Como foram obtidos: cada comando foi executado na raiz do repositório correspondente, com a saída lida do resumo final da própria ferramenta (Jest, Vitest, pytest) ou dos relatórios XML do Gradle. Os valores publicados no site, a partir da mesma data: James Fanstone 482, JAC 353 unitários, Maximiza 239, Aila 112 executados (mais 70 que exigem PostgreSQL).

Para reproduzir: rodar os mesmos comandos nas mesmas pastas; para fixar um número completo do JAC e do Aila é preciso Docker/PostgreSQL disponível.

## Atualização de autoria (2026-11-04)

- **Aila:** branch `main` (`36dd7f9`) com 72 commits; o `shortlog` agrupa 71 commits no e-mail acadêmico e 1 no e-mail noreply vinculado ao GitHub. O site foi atualizado de 68 para 72.
- **Maximiza Seguros:** branch `main` (`250776d`) com 242 commits: 215 humanos de Gabriel em quatro identidades e 27 de `github-actions[bot]`, usados pela sincronização automática. O site foi atualizado para descrever as duas contagens separadamente.
- O total informado pelo usuário para a conta GitHub é **77 repositórios**. O site apresenta esse total como acesso ao perfil, sem chamar cada repositório de projeto autoral.

Repositórios lidos:

| Projeto | Caminho local | Commits |
| --- | --- | --- |
| James Fanstone (Java) | `Editora/jamesfanstone/lion-james-fanstone-backend` | 83 |
| JAC | `Pessoal/Academia/jac/JAC-BACK-END` (195) e `JAC-FRONT-END` (210) | 405 |
| Aila | `Editora/Aila` | 68 |
| Maximiza Seguros | `Externo/maximiza-seguros` | 210 |

Legenda: **Confirmado** = bate com código ou documentação do repositório. **Divergente** = o texto atual do site e a fonte não coincidem. **Pergunta** = preciso da sua resposta antes de escrever.

## 1. James Fanstone (Java)

**Confirmado**
- Java 21, Spring Boot 4.0.5, Gradle, PostgreSQL, Flyway, Spring Security por cookie/sessão, MapStruct, springdoc, JUnit 5 + Mockito (README).
- 31 controllers e 26 migrações no código. Seeds reais do legado: 93 tipos de produção, 49 áreas CAPES, 8 estratos Qualis.
- ADRs 0005 (reaproveitamento dos legados PHP), 0006 (núcleo `lattesreport`) e 0007 (contrato unificado de erro da API).
- Decisão de projeto registrada: nenhum código PHP é copiado; regras são reescritas em Java, com dumps reais só para não inventar schema.
- Há documentos de auditoria no repositório (exposição do Actuator, integridade de dados, tratamento de exceções, autenticação OpenAPI).
- Integração Lattes/CNPq por SOAP (`CnpqSoapLattesClient`), atrás da flag `app.lattes.enabled`, com `NoOpLattesClient` como padrão.

**Concluído versus planejado (fonte: README, CHANGELOG, `docs/lattesreport/status.md`)**
- Schema pronto **sem carga de conteúdo**: `QualisClassification` (≈131 mil linhas ficaram fora) e `JcrRanking` (≈12 mil linhas).
- O CHANGELOG lista "13 módulos de negócio ainda por migrar" para a arquitetura-alvo de monólito modular; só `ProductionType` estava concluído na lista. O README ainda descreve MVC "achatado" por camada técnica. A reorganização é um trabalho **em andamento**, e o estudo de caso não deve apresentá-la como pronta.

**Divergente**
- Testes: encontrei 481 anotações `@Test`/`@ParameterizedTest` em 68 arquivos; o site dizia 480. **Resolvido:** a suíte executada reporta 482 (ver "Medições de testes"), e o site foi atualizado.
- O README fala em migrações `V1` a `V21`; o código tem 26. O site usa 26 (correto), o README é que está defasado.
- Autoria: o histórico mostra duas identidades (`GabrielGFC` 50 e `Gabriel Fernandes De Carvalho` 33). O site diz "83 de 83 commits".

**Perguntas**
1. As duas identidades de autor são você? O "83 de 83" vale?
2. A flag `app.lattes.enabled` está ligada em produção? Sem isso, não posso dizer que a importação do Lattes está em uso.
3. O que o sistema Java já atende em produção hoje e o que ainda roda no Laravel legado? Houve migração de dados reais?
4. Qual foi seu papel no sistema legado? O site cita relatórios de matrícula e edital; há evidência (PRs, tarefas) para linkar?
5. Pode contar um desafio concreto (por exemplo, o achado de auditoria do Actuator ou o SOAP do CNPq) e o que mudou depois?

## 2. JAC

**Confirmado**
- Backend: Express 5, Prisma 6.19, PostgreSQL 16. Frontend: Vue com Pinia e Vue Router, Vitest e Playwright; migração de React para Vue em andamento (`docs/migration/`).
- Auditoria de segurança de 2026-08-13 com 6 achados (JAC-SEC-001 a 006). SEC-001 (pontuação inflada por ciclos de check-in/check-out) foi remediado com teste vermelho antes da correção (`582a3e4`). SEC-004 (`csrf.ts` lendo chave inexistente) foi tratado.
- `release-readiness-2026-10-13.md`: CSRF por HMAC-SHA256 com token duplo (header + cookie); índice único parcial de check-in aberto por inscrição, validado em PostgreSQL 16 local com 6 cenários de concorrência; check-in só dentro da janela do evento; cerca por Haversine.
- Diagramas na pasta `docs/diagramas/` (arquitetura, casos de uso, MER, sequência de autenticação CSRF e de presença) e ADRs 0001 e 0002.

**Divergente**
- **Produção:** o documento de 13/10 diz que **React permanece em produção e o Vue não foi promovido**, com bloqueadores abertos. O site diz "frontend em migração de React para Vue", o que é coerente, mas não pode sugerir que o Vue está no ar.
- **Deploy:** o site cita "Fly.io, Cloudflare e Vercel". Há `fly.toml` e `wrangler.toml` no repositório; o Vercel aparece só em `docs/migration/history/`. O documento de readiness diz que a topologia e a configuração de produção **não foram confirmadas**.
- **Testes:** o site diz "≈440 (backend ≈168, frontend ≈272)". Minha contagem por padrão: backend 182 e frontend 153 unitários + 121 E2E. O readiness de 13/10 registra 133 (backend) + 6 (PostgreSQL); a rodada Vue registra 17 unitários + 5 E2E. Os números não fecham entre si. **Resolvido:** executadas as suítes, 353 unitários (backend 182, frontend 171); o site foi atualizado e agora diz "unitários".
- **Prisma:** o ADR-0001 propõe migrar Prisma para Sequelize, com status "Proposto". O site descreve Prisma, que é o estado atual; não mencionar Sequelize como feito.
- **Autoria:** o histórico tem três identidades; as três principais somam 159 commits no backend, que bate com "159 de 194", mas o total é 195.

**Limitações assumidas pela própria documentação (úteis para o estudo)**
- GPS vem do navegador e é falsificável; a cerca não prova presença física.
- SEC-002 está parcial; SEC-003 mitigado; AES-256-GCM sem versão de chave, então não dá para rotacionar sem mudança de código.
- WCAG 2.2 AA **não** está aprovada; leitor de tela e zoom 200% não foram verificados.

**Perguntas**
1. JAC é só pessoal ou há vínculo com a UniEVANGÉLICA? O "Documento de Fundamentação" em PDF sugere um programa. Isso muda o campo "Projeto pessoal" do site.
2. O que está de fato no ar, e onde (URL, serviço)? Posso citar Fly.io, Cloudflare e Vercel?
3. Quem são os outros ~36 autores de commit do backend (ou são suas outras identidades)?
4. ~~Qual número de testes devo usar?~~ Respondido: 353 unitários (ver "Medições de testes").
5. Posso usar os diagramas de `docs/diagramas/` como imagem no estudo de caso?

## 3. Aila

**Confirmado**
- Backend Python/FastAPI, PostgreSQL, frontend Vue 3 + Vite (o Nuxt 3 é legado), Docker, Ollama em LAN com fallback Groq (ADR 0006), OpenAlex e ORCID, ranking em 4 níveis (Contato Acadêmico, Candidato, Ativo, Sênior) com justificativa rastreável.
- 6 ADRs (0001 a 0006), `runbook.md` e `troubleshooting.md`. 178 funções `test_` no backend por busca de padrão. **Medido executando:** 112 passaram e 70 foram pulados por falta de PostgreSQL (ver "Medições de testes"); o site agora diz 112 executados, mais 70 que exigem PostgreSQL.
- O README afirma: "apoio à decisão, não decisor". O site já diz isso.
- Roadmap: v0.2 concluída; v0.3 (observabilidade de IA, curadoria em lote, opt-out LGPD) planejada. O site já marca recorrência e histórico enriquecido como roadmap.

**Divergente**
- Nenhuma divergência de números. O frontend tem **0 testes**; o site diz "≈178 testes automatizados", que é só do backend, e vale dizer isso.
- Autoria: duas identidades (67 + 1). O site diz "68 de 68".

**Perguntas**
1. Aila está em uso pela equipe editorial ou é um MVP rodando só na sua máquina e na LAN? Isso define se a página pode dizer "em produção".
2. Existe métrica de qualidade do ranking (comparação com avaliadores reais, benchmark)? Há uma pasta `benchmarks/` que posso ler se você autorizar.
3. Quem é o cliente/solicitante (nome da revista ou setor), e posso citá-lo?
4. Como a privacidade do manuscrito é tratada com o fallback em nuvem (Groq)? O README fala em IA local para preservar privacidade, mas o fallback sai da LAN.

## 4. Maximiza Seguros

**Confirmado**
- Vue 3, Vite, vue-router, vue-i18n (só pt-BR), Tailwind 4, sem Pinia. Publicado como assets estáticos no Cloudflare (`wrangler.jsonc`, `not_found_handling: single-page-application`).
- CI em `quality.yml` e sincronização diária de parceiros em `sync-real-estate-partners.yml`; `docs/architecture.md` define módulos por feature (`about`, `contact`, `home`, `integrations`, `partners`, `services`).
- 210 commits, 207 em três identidades (169 + 34 + 4), bate com "207 de 210". 189 casos de teste por busca de padrão, em 47 arquivos. **Medido executando:** 239 passaram (ver "Medições de testes"); o site foi atualizado para 239.
- Formulário de Seguro Moto valida telefone, CPF, CEP, nome, ano, quilometragem, marca, modelo e seguradora.

**Divergente**
- **Cotação e atendimento:** o site diz que a corretora poderia receber pedidos "sem depender de atendimento manual". O documento de confirmação mostra que os dois formulários **enviam e-mail via FormSubmit**; não há backend próprio nem fila. O lead ainda chega por e-mail e é atendido por pessoas. A frase de problema deve ser reescrita.
- **Fiança:** o site fala em formulários multietapas de "Fiança e Moto", mas o documento de destinatários lista só dois formulários com e-mail (Contato e Moto). Preciso saber o que o fluxo de Fiança (`ServicesRentGuaranteeFlow`) faz.
- **Conteúdo:** `status-atual.md` (24/09) diz que copy, fotos, dados de filiais e política de privacidade seguem placeholder ou pendentes. Não sei o estado atual em produção.
- Meta tags por rota e imagem OG constavam como parciais no mesmo documento.

**Perguntas**
1. O fluxo de Fiança envia para onde? Há integração com sistema da corretora?
2. Os destinatários dos e-mails foram confirmados e os leads estão chegando? Há algum número real (por exemplo, leads por mês) que você possa autorizar?
3. A copy, as fotos e a política de privacidade já são definitivas em produção?
4. Qual é a URL de produção que posso linkar?
5. A API pública da corretora usada na sincronização é de terceiros; posso citar o nome e a fonte?

## 5. Perguntas comuns aos quatro

1. As identidades de commit `GabrielGFC`, `Gabriel Fernandes De Carvalho` e `Gabriel F de  Carvalho` são todas suas?
2. Posso publicar capturas de tela e diagramas de cada projeto, sem dados reais de pessoas?
3. Quais repositórios são públicos e podem ser linkados? Hoje só aparecem os repositórios do GitHub listados em `publicProjects.ts`.
4. Prefere que eu rode as suítes de teste dos quatro projetos para fixar os números do site? Cada execução pode levar alguns minutos e usa Docker em alguns casos.

## 6. Proposta de estrutura para a reescrita (após suas respostas)

Para os quatro projetos principais, acrescentar ao tipo `CaseStudyTabKey` as abas `decisoes`, `desafios`, `qualidade` e `licoes`, mantendo as cinco atuais. Cada afirmação ficaria com a fonte neste documento. Itens sem resposta entram como "a confirmar" e **não** são publicados.
