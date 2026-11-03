import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { featuredProjects, type FeaturedText } from "../../data/featuredProjects";
import { publicProjects } from "../../data/publicProjects";
import { MaskedTitle, Reveal, duration, ease } from "../../motion/motion";
import ProjectVisual from "./ProjectVisual";
import styles from "./SelectedWork.module.scss";

const byKey = (key: string) => featuredProjects.find((project) => project.i18nKey === key);

type Item = { key: string; name: string; summary: string; meta: string };

/** Cartão de projeto: o cartão inteiro é um único link para o estudo de caso. */
const ProjectCard: React.FC<{
  item: Item;
  size: "lead" | "compact";
  caseStudy: string;
  liveLabel: string;
  delay: number;
}> = ({ item, size, caseStudy, liveLabel, delay }) => {
  const project = byKey(item.key);
  if (!project) return null;
  return (
    <li className={styles.cell}>
      <Reveal delay={delay} y={20} className={styles.reveal}>
        <article className={`${styles.card} ${size === "lead" ? styles.lead : styles.compact}`}>
          <div className={styles.media}>
            <ProjectVisual thumbnailKey={project.thumbnailKey} alt="" variant="shot" />
          </div>
          <div className={styles.body}>
            <p className={styles.meta}>{item.meta}</p>
            <h3 className={styles.name}>
              <Link
                to={`/projetos/${project.id}`}
                className={styles.link}
                aria-describedby={`${project.id}-cta`}
              >
                {item.name}
              </Link>
            </h3>
            <p className={styles.summary}>{item.summary}</p>
            <ul className={styles.tags} aria-label="Stack">
              {project.stack.slice(0, 3).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className={styles.footerRow}>
              <span className={styles.cta} id={`${project.id}-cta`} aria-hidden="true">
                {caseStudy} <span>→</span>
              </span>
              {project.live && project.caseStudy.referenceLink && (
                <a className={styles.live} href={project.caseStudy.referenceLink} target="_blank" rel="noopener noreferrer">
                  {liveLabel} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> — {item.name}</span>
                </a>
              )}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
};

const SelectedWork: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.work;
  const reduce = !!useReducedMotion();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const featuredText = data.featured as unknown as Record<string, FeaturedText>;

  const lead = t.items.slice(0, 2);
  const more = t.items.slice(2);

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <header className={styles.head}>
          <MaskedTitle id="work-title" className={styles.title}>
            {t.title}
          </MaskedTitle>
        </header>

        <p className={styles.group}>{t.featuredLabel}</p>
        <ul className={styles.leadGrid}>
          {lead.map((item, index) => (
            <ProjectCard
              key={item.key}
              item={item}
              size="lead"
              caseStudy={t.caseStudy}
              liveLabel={data.lux.caseStudy.live}
              delay={index * 0.08}
            />
          ))}
        </ul>

        <p className={styles.group}>{t.moreLabel}</p>
        <ul className={styles.moreGrid}>
          {more.map((item, index) => (
            <ProjectCard
              key={item.key}
              item={item}
              size="compact"
              caseStudy={t.caseStudy}
              liveLabel={data.lux.caseStudy.live}
              delay={index * 0.08}
            />
          ))}
        </ul>

        <div className={styles.archive}>
          <button
            type="button"
            className="linkArrow"
            aria-expanded={archiveOpen}
            aria-controls="work-archive"
            onClick={() => setArchiveOpen((value) => !value)}
          >
            {archiveOpen ? t.archiveClose : t.archiveOpen}
            <span aria-hidden="true">{archiveOpen ? "−" : "+"}</span>
          </button>

          <AnimatePresence initial={false}>
            {archiveOpen && (
              <motion.div
                id="work-archive"
                key="archive"
                className={styles.archivePanel}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : duration.base, ease }}
              >
                <h3 className={styles.archiveTitle}>{t.archiveTitle}</h3>
                <ul className={styles.rows}>
                  {t.archive.map((entry) => {
                    const project = byKey(entry.key);
                    if (!project) return null;
                    return (
                      <li key={entry.key} className={styles.row}>
                        <span className={styles.rowName}>{featuredText[entry.key]?.title}</span>
                        <span className={styles.rowMeta}>{entry.meta}</span>
                        <span className={styles.rowActions}>
                          <Link to={`/projetos/${project.id}`} className={styles.rowAction}>
                            {t.caseStudy}
                          </Link>
                          {project.live && project.caseStudy.referenceLink && (
                            <a
                              className={styles.rowAction}
                              href={project.caseStudy.referenceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {data.lux.caseStudy.live} <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <h3 className={styles.archiveTitle}>{t.archivePublic}</h3>
                <ul className={styles.rows}>
                  {publicProjects.map((repo) => (
                    <li key={repo.id} className={styles.row}>
                      <span className={styles.rowName}>
                        {repo.title}
                        <span className={styles.rowDesc}>{repo.description}</span>
                      </span>
                      <span className={styles.rowMeta}>{repo.stack.join(" · ")}</span>
                      {repo.url ? (
                        <a className={styles.rowAction} href={repo.url} target="_blank" rel="noopener noreferrer">
                          {t.openRepo} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span />
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
