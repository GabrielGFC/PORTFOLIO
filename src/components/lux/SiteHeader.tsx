import { useReducedMotion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { RESUME_URL, scrollToSection } from "../../motion/motion";
import Monogram from "./Monogram";
import styles from "./SiteHeader.module.scss";

const SiteHeader: React.FC = () => {
  const { data, langKey, toggleLanguage } = useContext(LanguageContext);
  const t = data.lux.nav;
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHome = location.pathname === "/";
  const onJourney = location.pathname === "/trajetoria";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  // Seção ativa: marca no menu a seção que ocupa o meio da tela.
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => {
    if (!onHome) {
      setSection(null);
      return;
    }
    const ids = ["work", "experience", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id === "experience" ? null : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const top = document.getElementById("top");
    const topObserver = new IntersectionObserver(([entry]) => entry.isIntersecting && setSection(null), {
      rootMargin: "-45% 0px -50% 0px",
    });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    if (top) topObserver.observe(top);
    return () => {
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    if (onHome) scrollToSection(id, reduce);
    else navigate("/", { state: { scrollTo: id } });
  };

  const sectionLink = (id: string, label: string) => (
    <li>
      <button
        type="button"
        className={`${styles.link} ${section === id ? styles.active : ""}`}
        aria-current={section === id ? "location" : undefined}
        onClick={() => goTo(id)}
      >
        {label}
      </button>
    </li>
  );

  return (
    <>
      <a
        className="skip-link"
        href="#conteudo"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("conteudo")?.focus();
        }}
      >
        {data.lux.skip}
      </a>
      <header className={`${styles.header} ${open ? styles.open : scrolled ? styles.solid : ""}`}>
        <div className={`container ${styles.bar}`}>
          <Link
            to="/"
            className={styles.mark}
            aria-label={`GFC, ${t.home}`}
            onClick={() => onHome && scrollToSection("top", reduce)}
          >
            <Monogram still className={styles.markIcon} />
            <span className={styles.markText}>GFC</span>
          </Link>

          <nav aria-label={t.label} id="site-nav" className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
            <ul>
              {sectionLink("work", t.work)}
              <li>
                <Link
                  to="/trajetoria"
                  className={`${styles.link} ${onJourney ? styles.active : ""}`}
                  aria-current={onJourney ? "page" : undefined}
                >
                  {t.journey}
                </Link>
              </li>
              {sectionLink("about", t.about)}
              {sectionLink("contact", t.contact)}
              <li>
                <a className={styles.link} href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                  {t.resume}
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.lang} onClick={toggleLanguage} aria-label={`PT / EN, ${t.language}`}>
              <span className={langKey === "pt" ? styles.langOn : ""}>PT</span>
              <span aria-hidden="true" className={styles.langSep}>/</span>
              <span className={langKey === "en" ? styles.langOn : ""}>EN</span>
            </button>
            <button type="button" className={styles.cta} onClick={() => goTo("contact")}>
              {t.cta}
            </button>
            <button
              type="button"
              className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? t.close : t.menu}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
