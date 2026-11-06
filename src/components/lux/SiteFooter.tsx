import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { featuredProjects } from "../../data/featuredProjects";
import { RESUME_URL } from "../../motion/motion";
import Monogram from "./Monogram";
import styles from "./SiteFooter.module.scss";

const EMAIL = "carvalhofernandesgfc@proton.me";

const SiteFooter: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.footer;
  const nav = data.lux.nav;
  const liveProjects = data.lux.work.live.flatMap((item) => {
    const url = featuredProjects.find((project) => project.i18nKey === item.key)?.caseStudy.referenceLink;
    return url ? [{ name: item.name, url }] : [];
  });

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label={`GFC, ${nav.home}`}>
            <Monogram still className={styles.logoIcon} />
            <span>Gabriel Fernandes de Carvalho</span>
          </Link>
          <p>{t.tagline}</p>
          <a className={styles.cta} href={`mailto:${EMAIL}`}>
            {t.cta} <span aria-hidden="true">→</span>
          </a>
        </div>

        <nav className={styles.col} aria-labelledby="footer-nav">
          <h2 id="footer-nav">{t.navTitle}</h2>
          <ul>
            <li>
              <Link to="/" state={{ scrollTo: "top" }}>
                {nav.home}
              </Link>
            </li>
            <li>
              <Link to="/" state={{ scrollTo: "work" }}>
                {nav.work}
              </Link>
            </li>
            <li>
              <Link to="/trajetoria">{nav.journey}</Link>
            </li>
            <li>
              <Link to="/" state={{ scrollTo: "about" }}>
                {nav.about}
              </Link>
            </li>
            <li>
              <Link to="/" state={{ scrollTo: "contact" }}>
                {nav.contact}
              </Link>
            </li>
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                {nav.resume} (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <nav className={styles.col} aria-labelledby="footer-live">
          <h2 id="footer-live">{t.liveTitle}</h2>
          <ul>
            {liveProjects.map((project) => (
              <li key={project.url}>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2>{t.contactTitle}</h2>
          <ul>
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/gabrielgfc1" target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/GabrielGFC" target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bar}`}>
          <p>
            © {new Date().getFullYear()} Gabriel Fernandes de Carvalho. {t.rights}
            <span className={styles.made}>{t.madeWith}</span>
          </p>
          <ul aria-label={t.legalTitle}>
            <li>
              <Link to="/privacidade">{t.privacy}</Link>
            </li>
            <li>
              <Link to="/termos">{t.terms}</Link>
            </li>
            <li>
              <Link to="/cookies">{t.cookies}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
