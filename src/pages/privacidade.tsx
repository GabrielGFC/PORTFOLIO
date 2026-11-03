import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./legal.module.scss";

const Privacidade: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Gabriel Fernandes de Carvalho";
  }, []);

  return (
    <main className={styles.page} lang="pt-BR">
      <div className={styles.wrap}>
        <Link to="/" className={styles.back}>
          ← Voltar ao portfólio
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <p className={styles.subtitle}>
            Última atualização: 03/06/2026 · Controlador: Gabriel Fernandes de
            Carvalho · Em conformidade com a Lei nº 13.709/2018 (LGPD).
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. Quem é o controlador</h2>
          <p>
            <strong>Gabriel Fernandes de Carvalho</strong>, com sede em
            Anápolis-GO, é o controlador dos dados eventualmente coletados por
            este portfólio. Contato pelo e-mail{" "}
            <a className={styles.link} href="mailto:carvalhofernandesgfc@proton.me">
              carvalhofernandesgfc@proton.me
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Dados coletados</h2>
          <p>
            Este site é estático e <strong>não possui formulários, banco de
            dados ou autenticação</strong>. Os dados que podem ser registrados
            são:
          </p>
          <ul>
            <li>
              <strong>Endereço IP e user-agent</strong> — pela hospedagem
              (GitHub Pages), em logs de servidor padrão.
            </li>
            <li>
              <strong>Preferência de tema</strong> (claro/escuro) — armazenada
              localmente no seu navegador.
            </li>
            <li>
              <strong>Decisão de consentimento de cookies</strong> — registrada
              em <code>localStorage</code>, sem ser enviada a servidor.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Finalidade e base legal</h2>
          <p>
            Os dados acima são utilizados exclusivamente para garantir o
            funcionamento técnico do site e respeitar suas preferências. Base
            legal: <strong>consentimento</strong> (art. 7º, I) e{" "}
            <strong>legítimo interesse</strong> (art. 7º, IX) da LGPD.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Compartilhamento</h2>
          <p>
            Nenhum dado é compartilhado, vendido ou cedido a terceiros. Links
            externos (LinkedIn, GitHub, e-mail) redirecionam você para serviços
            de terceiros com políticas próprias.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Seus direitos (art. 18 da LGPD)</h2>
          <p>
            Você pode, a qualquer momento, solicitar: confirmação da existência
            de tratamento, acesso aos dados, correção, anonimização,
            portabilidade, eliminação, revogação do consentimento e informação
            sobre compartilhamentos. Basta escrever para{" "}
            <a className={styles.link} href="mailto:carvalhofernandesgfc@proton.me">
              carvalhofernandesgfc@proton.me
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Segurança</h2>
          <p>
            O site é servido via HTTPS. Como não há coleta ativa, o risco de
            vazamento de dados pessoais associados a este portfólio é mínimo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Alterações</h2>
          <p>
            Esta política pode ser atualizada. A data no topo reflete sempre a
            versão vigente. Mudanças substanciais reativam o banner de
            consentimento.
          </p>
        </section>

        <nav className={styles.legalNav} aria-label="Documentos legais">
          <Link to="/termos" className={styles.legalNavLink}>
            Termos de Uso
          </Link>
          <Link to="/cookies" className={styles.legalNavLink}>
            Cookies
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default Privacidade;
