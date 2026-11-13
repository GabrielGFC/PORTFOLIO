import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import Monogram from "./Monogram";
import styles from "./SiteFooter.module.scss";

const EMAIL = "carvalhofernandesgfc@proton.me";

const ExternalArrow: React.FC = () => (
  <svg className={styles.arrow} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SiteFooter: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.footer;
  const nav = data.lux.nav;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label={`GFC, ${nav.home}`}>
            <Monogram still className={styles.logoIcon} />
            <span>Gabriel Fernandes de Carvalho</span>
          </Link>
          <p>{t.tagline}</p>
        </div>

        <section className={styles.contact} aria-labelledby="footer-contact-title">
          <div>
            <h2 id="footer-contact-title">{t.contactTitle}</h2>
            <a className={styles.emailAction} href={`mailto:${EMAIL}`}>
              <span>{EMAIL}</span>
              <ExternalArrow />
            </a>
          </div>

          <nav className={styles.socials} aria-label={t.socialTitle}>
            <a href="https://www.linkedin.com/in/gabrielgfc1" target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <ExternalArrow />
            </a>
            <a href="https://github.com/GabrielGFC" target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <ExternalArrow />
            </a>
          </nav>
        </section>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bar}`}>
          <p>© {new Date().getFullYear()} Gabriel Fernandes de Carvalho. {t.rights}</p>
          <nav aria-label={t.legalTitle}>
            <ul>
              <li><Link to="/privacidade">{t.privacy}</Link></li>
              <li><Link to="/termos">{t.terms}</Link></li>
              <li><Link to="/cookies">{t.cookies}</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
