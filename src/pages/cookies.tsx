import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "../components/lux/SiteFooter";
import SiteHeader from "../components/lux/SiteHeader";
import { PageTransition } from "../motion/motion";
import styles from "./legal.module.scss";

const EMAIL = "carvalhofernandesgfc@proton.me";

const Cookies: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Cookies | Gabriel Fernandes de Carvalho";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className={styles.page} lang="pt-BR">
        <div className={styles.wrap}>
          <Link to="/" className={styles.back}>
            ← Voltar ao portfólio
          </Link>

          <header className={styles.header}>
            <h1 className={styles.title}>Política de Cookies</h1>
            <p className={styles.subtitle}>Última atualização: 06/11/2026 · Tudo o que este site guarda no seu navegador.</p>
          </header>

          <aside className={styles.summary} aria-labelledby="resumo">
            <h2 id="resumo">Em resumo</h2>
            <ul>
              <li>Este site não grava cookies.</li>
              <li>O aviso que aparece na página inicial é só informativo: não há cookies para aceitar ou recusar.</li>
              <li>Guarda dois itens no navegador: um temporário (animação) e a marca de que você viu o aviso.</li>
            </ul>
          </aside>

          <section className={styles.section}>
            <h2>1. O que são cookies</h2>
            <p>
              Cookies são pequenos arquivos que um site grava no navegador para lembrar algo sobre você, como um login ou
              uma preferência. Existem também recursos parecidos, como o <code>localStorage</code> e o{" "}
              <code>sessionStorage</code>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. O que este site guarda</h2>
            <ul>
              <li>
                <strong>gfc-mark-played</strong> (<code>sessionStorage</code>): indica que a animação do logotipo já rodou
                nesta visita, para ela não se repetir a cada página. Não identifica você, fica só no seu aparelho e é
                apagado quando a aba é fechada.
              </li>
            </ul>
            <p>
              Ao clicar em “Entendi” no aviso da página inicial, o site registra essa escolha em um item chamado{" "}
              <code>gfc-privacy-consent</code> (<code>localStorage</code>), só para não mostrar o aviso de novo. Ele fica
              no seu aparelho, não é enviado a ninguém e pode ser apagado a qualquer momento nas configurações do
              navegador.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Cookies de análise e de terceiros</h2>
            <p>
              Não há análise de visitas, anúncios, pixels de redes sociais, mapas ou vídeos incorporados. As fontes de letra
              são servidas pelo próprio site. Quando você clica em links externos (LinkedIn, GitHub ou os sistemas
              publicados dos projetos), a política de cada um desses serviços passa a valer.
            </p>
            <p>
              Se um dia eu incluir algo que use cookies, esta página será atualizada antes e o consentimento será pedido
              de forma clara, antes de qualquer coleta.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Como apagar</h2>
            <p>
              Nas configurações do navegador, em “dados do site” ou “cookies”, você pode apagar tudo o que um endereço
              guardou. Dúvidas? Escreva para{" "}
              <a className={styles.link} href={`mailto:${EMAIL}`}>
                {EMAIL}
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
      <SiteFooter />
    </PageTransition>
  );
};

export default Cookies;
