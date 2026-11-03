import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./legal.module.scss";

const Cookies: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Cookies | Gabriel Fernandes de Carvalho";
  }, []);

  const reopenBanner = () => {
    try {
      localStorage.removeItem("gfc-privacy-consent");
    } catch {
      /* noop */
    }
    // Volta à home do portfólio (a base do site é /Portifolio/, não a raiz do domínio)
    window.location.href = document.baseURI;
  };

  return (
    <main className={styles.page} lang="pt-BR">
      <div className={styles.wrap}>
        <Link to="/" className={styles.back}>
          ← Voltar ao portfólio
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>Política de Cookies</h1>
          <p className={styles.subtitle}>
            Última atualização: 03/06/2026 · Tudo que este site armazena no
            seu navegador, e por quê.
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. O que são cookies</h2>
          <p>
            Cookies (e itens similares como <code>localStorage</code>) são
            pequenos arquivos que ficam guardados no seu navegador, usados pra
            lembrar preferências ou permitir o funcionamento de partes do
            site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Cookies necessários</h2>
          <p>
            Indispensáveis pro funcionamento básico. Não dependem de
            consentimento.
          </p>
          <ul>
            <li>
              <strong>gfc-privacy-consent</strong> — registra sua decisão sobre
              esta política e a versão aceita. Validade: até você revogar ou
              limpar o navegador.
            </li>
            <li>
              <strong>Preferência de tema do sistema</strong> — lida via{" "}
              <code>prefers-color-scheme</code>. Não é cookie, é uma leitura do
              sistema operacional.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Cookies analíticos (opt-in)</h2>
          <p>
            Apenas ativados se você clicar em <strong>Aceitar</strong> no
            banner. Coletam dados anônimos e agregados sobre quais páginas e
            seções são mais visitadas, pra que eu possa melhorar o portfólio.
          </p>
          <ul>
            <li>Nenhuma informação que identifique você é coletada.</li>
            <li>Não há rastreamento entre sites (cross-site tracking).</li>
            <li>Você pode revogar a qualquer momento.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Cookies de terceiros</h2>
          <p>
            Este portfólio <strong>não embute</strong> serviços de terceiros
            que injetam cookies (sem Google Analytics, Meta Pixel, etc).
            Quando você clica em links externos (LinkedIn, GitHub), as
            políticas desses serviços passam a valer.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Como gerenciar</h2>
          <p>
            Você pode revogar ou alterar seu consentimento a qualquer momento:
          </p>
          <ul>
            <li>
              Clicando no botão{" "}
              <strong>&quot;Gerenciar privacidade&quot;</strong> no rodapé ou na pílula
              flutuante &quot;● Privacidade&quot; no canto da tela.
            </li>
            <li>
              Pelo botão abaixo (reabre o banner imediatamente):
              <br />
              <button
                type="button"
                className={styles.link}
                onClick={reopenBanner}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0",
                  font: "inherit",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                Reabrir banner de consentimento →
              </button>
            </li>
            <li>
              Pelas configurações do seu navegador (limpar cookies/storage do
              site).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Contato</h2>
          <p>
            Dúvidas sobre cookies ou privacidade? Escreva para{" "}
            <a
              className={styles.link}
              href="mailto:carvalhofernandesgfc@proton.me"
            >
              carvalhofernandesgfc@proton.me
            </a>
            .
          </p>
        </section>

        <nav className={styles.legalNav} aria-label="Documentos legais">
          <Link to="/privacidade" className={styles.legalNavLink}>
            Política de Privacidade
          </Link>
          <Link to="/termos" className={styles.legalNavLink}>
            Termos de Uso
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default Cookies;
