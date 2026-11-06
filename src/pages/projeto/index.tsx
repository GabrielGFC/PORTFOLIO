import { motion, useReducedMotion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import SiteHeader from "../../components/lux/SiteHeader";
import SiteFooter from "../../components/lux/SiteFooter";
import { featuredProjects, type FeaturedText } from "../../data/featuredProjects";
import ProjectVisual from "../../components/lux/ProjectVisual";
import TechTags from "../../components/lux/TechTags";
import { MaskedTitle, PageTransition, Reveal, duration, ease } from "../../motion/motion";
import styles from "./projeto.module.scss";

/** Ordem de leitura: os projetos no ar primeiro (mesma ordem da home), depois os demais. */
const order = ["esports", "lion-fanstone", "maximiza", "coneleste", "farm-xp", "jac", "aila", "pasteur", "fanstone-legacy"];

const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useContext(LanguageContext);
  const t = data.lux.caseStudy;
  const reduce = !!useReducedMotion();
  const project = featuredProjects.find((p) => p.id === id);
  const text = project ? (data.featured as unknown as Record<string, FeaturedText>)[project.i18nKey] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (text) document.title = `${text.title} | Gabriel Fernandes de Carvalho`;
  }, [text]);

  if (!project || !text) {
    return (
      <PageTransition>
        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className={`container ${styles.missing}`}>
          <h1>{t.notFound}</h1>
          <Link to="/" className="linkArrow">
            {t.home} <span aria-hidden="true">←</span>
          </Link>
        </main>
      </PageTransition>
    );
  }

  const index = order.indexOf(project.id);
  const prevId = order[(index - 1 + order.length) % order.length];
  const nextId = order[(index + 1) % order.length];
  const titleOf = (pid: string) => {
    const p = featuredProjects.find((item) => item.id === pid);
    return p ? (data.featured as unknown as Record<string, FeaturedText>)[p.i18nKey]?.title : pid;
  };

  return (
    <PageTransition>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={`container ${styles.heroInner}`}>
            <Link to="/" state={{ scrollTo: "work" }} className={styles.back}>
              <span aria-hidden="true">←</span> {t.back}
            </Link>
            <MaskedTitle as="h1" id="case-title" className={styles.title} onMount delay={0.1}>
              {text.title}
            </MaskedTitle>
            <motion.p
              className={styles.lead}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease, delay: 0.5 }}
            >
              {text.impact}
            </motion.p>
            <motion.div
              className={styles.stack}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duration.slow, ease, delay: 0.7 }}
            >
              <TechTags project={project} />
            </motion.div>
            {project.live && project.caseStudy.referenceLink && (
              <a className={styles.live} href={project.caseStudy.referenceLink} target="_blank" rel="noopener noreferrer">
                {t.live} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </section>

        <div className="container">
          <motion.figure
            className={styles.media}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.cinematic, ease, delay: 0.4 }}
          >
            <ProjectVisual thumbnailKey={project.thumbnailKey} alt={text.title} />
          </motion.figure>

          <div className={styles.body}>
            {text.caseStudy.tabs.map((tab) => (
              <Reveal key={tab.key} className={styles.block}>
                <h2 className={styles.blockTitle}>{tab.title}</h2>
                <div className={styles.blockText}>
                  {Array.isArray(tab.content) ? (
                    <ul>
                      {tab.content.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{tab.content}</p>
                  )}
                </div>
              </Reveal>
            ))}

            {project.caseStudy.referenceLink && !project.live && (
              <Reveal className={styles.block}>
                <span />
                <a className="linkArrow" href={project.caseStudy.referenceLink} target="_blank" rel="noopener noreferrer">
                  {t.visit} <span aria-hidden="true">↗</span>
                </a>
              </Reveal>
            )}
          </div>

          <nav className={styles.pager} aria-label={`${t.prev} / ${t.next}`}>
            <Link to={`/projetos/${prevId}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>← {t.prev}</span>
              <span className={styles.pagerTitle}>{titleOf(prevId)}</span>
            </Link>
            <Link to={`/projetos/${nextId}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerLabel}>{t.next} →</span>
              <span className={styles.pagerTitle}>{titleOf(nextId)}</span>
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
};

export default ProjectPage;
