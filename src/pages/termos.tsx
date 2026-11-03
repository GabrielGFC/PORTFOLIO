import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./legal.module.scss";

const Termos: React.FC = () => {
  useEffect(() => {
    document.title = "Termos de Uso | Gabriel Fernandes de Carvalho";
  }, []);

  return (
    <main className={styles.page} lang="pt-BR">
      <div className={styles.wrap}>
        <Link to="/" className={styles.back}>
          ← Voltar ao portfólio
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>Termos de Uso</h1>
          <p className={styles.subtitle}>
            Última atualização: 03/06/2026 · Ao acessar este portfólio você
            concorda com os termos abaixo.
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. Objeto</h2>
          <p>
            Este portfólio tem caráter exclusivamente informativo e de
            divulgação profissional do trabalho de{" "}
            <strong>Gabriel Fernandes de Carvalho</strong>. Não constitui
            oferta comercial, contrato ou prestação de serviço.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Propriedade intelectual</h2>
          <p>
            O conteúdo, textos, código-fonte do portfólio, layout e identidade
            visual são de titularidade do autor, salvo material de terceiros
            devidamente atribuído. Reprodução não autorizada é vedada.
          </p>
          <p>
            Os sistemas apresentados (JAC, James Fanstone, Portal E-Sports,
            Maximiza Seguros, Farm Automático de XP Dev) pertencem às suas
            respectivas instituições/clientes — eu sou autor/coautor do
            desenvolvimento, sem reivindicar titularidade exclusiva.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Uso permitido</h2>
          <p>Você pode:</p>
          <ul>
            <li>Navegar livremente pelo portfólio.</li>
            <li>Compartilhar links públicos das páginas.</li>
            <li>
              Citar conteúdo desde que com atribuição clara e link de origem.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Uso vedado</h2>
          <p>É proibido:</p>
          <ul>
            <li>
              Copiar e republicar trechos como se fossem de autoria própria.
            </li>
            <li>
              Utilizar o conteúdo em campanhas comerciais sem autorização
              expressa.
            </li>
            <li>
              Tentar acessar áreas restritas, fazer scraping massivo ou
              comprometer a integridade do site.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Links externos</h2>
          <p>
            Este portfólio contém links para serviços de terceiros (LinkedIn,
            GitHub, Vercel, Cloudflare Workers, UniEVANGÉLICA). O autor não se
            responsabiliza pelo conteúdo ou pela disponibilidade desses
            recursos externos.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Disponibilidade</h2>
          <p>
            O site é fornecido &quot;como está&quot;. Não há garantia de disponibilidade
            ininterrupta ou ausência de erros. Atualizações podem ocorrer a
            qualquer momento.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Limitação de responsabilidade</h2>
          <p>
            O autor não responde por danos diretos ou indiretos decorrentes do
            uso, da impossibilidade de uso ou de decisões tomadas com base no
            conteúdo do portfólio.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Foro</h2>
          <p>
            Estes termos são regidos pela legislação brasileira. Fica eleito o
            foro da Comarca de Anápolis-GO para dirimir eventuais conflitos.
          </p>
        </section>

        <nav className={styles.legalNav} aria-label="Documentos legais">
          <Link to="/privacidade" className={styles.legalNavLink}>
            Política de Privacidade
          </Link>
          <Link to="/cookies" className={styles.legalNavLink}>
            Cookies
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default Termos;
