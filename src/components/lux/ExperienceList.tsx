import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MaskedTitle, Reveal, duration, ease } from "../../motion/motion";
import styles from "./ExperienceList.module.scss";

// Atuais primeiro; depois, do mais recente para o mais antigo.
const order = ["proppe", "ftt", "estagio", "fab", "leomed", "tecpress"] as const;
const current = new Set<string>(["proppe", "ftt"]);

const ExperienceList: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.experience;
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <MaskedTitle id="experience-title" className={styles.title}>
            {t.title}
          </MaskedTitle>
        </header>

        <ol className={styles.list}>
          {order.map((key, index) => {
            const job = data.experience[key];
            const isOpen = open === key;
            const isCurrent = current.has(key);
            const panelId = `job-${key}`;
            const stack = t.stacks[key];
            return (
              <li key={key} className={`${styles.item} ${isCurrent ? styles.now : ""}`}>
                <Reveal delay={reduce ? 0 : index * 0.04} y={14}>
                  <div className={styles.row}>
                    <span className={styles.period}>{job.period}</span>
                    <div className={styles.what}>
                      <h3 className={styles.role}>{job.role}</h3>
                      <p className={styles.org}>{job.company}</p>
                      {isCurrent && (
                        <ul className={styles.tags} aria-label="Stack">
                          {stack.slice(0, 3).map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      className={styles.toggle}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : key)}
                    >
                      <span>{isOpen ? t.less : t.more}</span>
                      <span aria-hidden="true" className={`${styles.plus} ${isOpen ? styles.plusOpen : ""}`} />
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        className={styles.details}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : duration.base, ease }}
                      >
                        <ul>
                          {[job.bullet1, job.bullet2, job.bullet3].map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                        {!isCurrent && <p className={styles.stackLine}>{stack.join(" · ")}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceList;
