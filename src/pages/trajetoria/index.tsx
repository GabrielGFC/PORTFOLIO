import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import SiteHeader from "../../components/lux/SiteHeader";
import SiteFooter from "../../components/lux/SiteFooter";
import { MaskedTitle, PageTransition, RESUME_URL, Reveal, duration, ease, scrollToSection } from "../../motion/motion";
import styles from "./trajetoria.module.scss";

const Trajetoria: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.journey;
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(t.chapters[0].id);

  useEffect(() => {
    document.title = `${t.eyebrow} | Gabriel Fernandes de Carvalho`;
  }, [t.eyebrow]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id.replace("chapter-", ""));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    t.chapters.forEach((chapter) => {
      const el = document.getElementById(`chapter-${chapter.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [t.chapters]);

  return (
    <PageTransition>
      <SiteHeader />
      <motion.div
        aria-hidden="true"
        className={styles.progress}
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />

      <main id="conteudo" tabIndex={-1}>
        <section className={styles.intro} aria-labelledby="journey-title">
          <div className="container">
            <MaskedTitle as="h1" id="journey-title" className={styles.title} onMount delay={0.15}>
              {t.title}
            </MaskedTitle>
            <motion.p
              className={styles.lead}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease, delay: 0.6 }}
            >
              {t.intro}
            </motion.p>
          </div>
        </section>

        <div className={`container ${styles.layout}`}>
          <nav className={styles.index} aria-label={t.indexLabel}>
            <ol>
              {t.chapters.map((chapter, i) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    className={`${styles.indexLink} ${active === chapter.id ? styles.indexActive : ""}`}
                    aria-current={active === chapter.id ? "step" : undefined}
                    onClick={() => {
                      setActive(chapter.id);
                      scrollToSection(`chapter-${chapter.id}`, reduce);
                    }}
                  >
                    <span className={styles.indexNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{chapter.period}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <ol className={styles.chapters}>
            {t.chapters.map((chapter, i) => (
              <li
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className={styles.chapter}
                aria-labelledby={`chapter-title-${chapter.id}`}
              >
                <Reveal className={styles.body}>
                  <p className={styles.meta}>
                    <span>
                      {t.chapterLabel} {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.period}>{chapter.period}</span>
                  </p>
                  <h2 id={`chapter-title-${chapter.id}`} className={styles.chapterTitle}>
                    {chapter.title}
                  </h2>
                  <p className={styles.text}>{chapter.text}</p>
                  <p className={styles.milestone}>
                    <span>{t.milestoneLabel}</span>
                    {chapter.milestone}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <section className={styles.outro}>
          <div className={`container ${styles.outroInner}`}>
            <Link to="/" state={{ scrollTo: "work" }} className={styles.primary}>
              {t.ctaWork}
              <span aria-hidden="true">→</span>
            </Link>
            <a className="linkArrow" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              {t.ctaResume}
              <span aria-hidden="true">↗</span>
            </a>
            <Link to="/" className="linkArrow">
              {t.back}
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </PageTransition>
  );
};

export default Trajetoria;
