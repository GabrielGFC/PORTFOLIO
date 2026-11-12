import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { featuredProjects, type FeaturedText } from "../../data/featuredProjects";
import { additionalProjects } from "../../data/publicProjects";
import { MaskedTitle, Reveal, duration, ease } from "../../motion/motion";
import ProjectVisual from "./ProjectVisual";
import TechTags from "./TechTags";
import styles from "./SelectedWork.module.scss";

const byKey = (key: string) => featuredProjects.find((project) => project.i18nKey === key);

type LiveItem = { key: string; name: string; meta: string; plain: string; role: string };
type OtherItem = { key: string; name: string; meta: string; plain: string };

/** Projeto com site publicado: a captura e o botão grande levam direto ao site no ar. */
const LiveCard: React.FC<{ item: LiveItem; delay: number }> = ({ item, delay }) => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.work;
  const project = byKey(item.key);
  const url = project?.caseStudy.referenceLink;
  if (!project || !url) return null;
  return (
    <li className={styles.cell}>
      <Reveal delay={delay} y={20} className={styles.reveal}>
        <article className={styles.liveCard} aria-labelledby={`${project.id}-name`}>
          <a className={styles.shot} href={url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
            <ProjectVisual thumbnailKey={project.thumbnailKey} alt="" variant="shot" />
            <span className={styles.shotBadge}>
              <i aria-hidden="true" /> {t.openSite} ↗
            </span>
          </a>
          <div className={styles.liveBody}>
            <p className={styles.meta}>{item.meta}</p>
            <h3 id={`${project.id}-name`} className={styles.name}>
              {item.name}
            </h3>
            <dl className={styles.facts}>
              <div>
                <dt>{t.whatIs}</dt>
                <dd>{item.plain}</dd>
              </div>
              <div>
                <dt>{t.myPart}</dt>
                <dd>{item.role}</dd>
              </div>
            </dl>
            <TechTags project={project} compact />
            <div className={styles.buttons}>
              <a className={styles.visit} href={url} target="_blank" rel="noopener noreferrer">
                {t.openSite} <span aria-hidden="true">↗</span>
                <span className="sr-only"> — {item.name}</span>
              </a>
              <Link className={styles.details} to={`/projetos/${project.id}`}>
                {t.details} <span aria-hidden="true">→</span>
                <span className="sr-only"> — {item.name}</span>
              </Link>
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
};

/** Projeto ainda sem site público: cartão compacto, sem botão de produção (não inventa link). */
const OtherCard: React.FC<{ item: OtherItem; delay: number }> = ({ item, delay }) => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.work;
  const project = byKey(item.key);
  if (!project) return null;
  return (
    <li className={styles.cell}>
      <Reveal delay={delay} y={16} className={styles.reveal}>
        <article className={styles.otherCard} aria-labelledby={`${project.id}-name`}>
          <p className={styles.meta}>{item.meta}</p>
          <h4 id={`${project.id}-name`} className={styles.otherName}>
            {item.name}
          </h4>
          <p className={styles.otherPlain}>{item.plain}</p>
          <TechTags project={project} />
          <Link className={styles.details} to={`/projetos/${project.id}`}>
            {t.details} <span aria-hidden="true">→</span>
            <span className="sr-only"> — {item.name}</span>
          </Link>
        </article>
      </Reveal>
    </li>
  );
};

const SelectedWork: React.FC = () => {
  const { data, langKey } = useContext(LanguageContext);
  const t = data.lux.work;
  const reduce = !!useReducedMotion();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const featuredText = data.featured as unknown as Record<string, FeaturedText>;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <header className={styles.head}>
          <MaskedTitle id="work-title" className={styles.title}>
            {t.title}
          </MaskedTitle>
          <p className={styles.intro}>{t.liveIntro}</p>
        </header>

        <ul className={styles.liveGrid}>
          {t.live.map((item, index) => (
            <LiveCard key={item.key} item={item} delay={(index % 2) * 0.08} />
          ))}
        </ul>

        <p className={styles.group}>{t.othersLabel}</p>
        <ul className={styles.othersGrid}>
          {t.others.map((item, index) => (
            <OtherCard key={item.key} item={item} delay={index * 0.06} />
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

                <h3 className={styles.archiveTitle}>{t.archiveAdditional}</h3>
                <ul className={styles.rows}>
                  {additionalProjects.map((repo) => (
                    <li key={repo.id} className={styles.row}>
                      <span className={styles.rowName}>
                        {langKey === "pt" ? repo.title : repo.titleEn}
                        <span className={styles.rowDesc}>
                          {langKey === "pt" ? repo.description : repo.descriptionEn}
                        </span>
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
                  <li className={styles.row}>
                    <span className={styles.rowName}>{t.repositoryCount}</span>
                    <span className={styles.rowMeta}>{t.repositoryCountNote}</span>
                    <a
                      className={styles.rowAction}
                      href="https://github.com/GabrielGFC?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.githubProfile} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
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
