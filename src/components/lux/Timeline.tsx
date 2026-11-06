import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MaskedTitle, Reveal } from "../../motion/motion";
import styles from "./Timeline.module.scss";

/** Trajetória resumida: cinco marcos em linha do tempo (horizontal no desktop, vertical no celular). O detalhe fica em /trajetoria. */
const Timeline: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.journey;
  const last = t.timeline.length - 1;

  return (
    <section id="experience" className={styles.section} aria-labelledby="timeline-title">
      <div className="container">
        <MaskedTitle id="timeline-title" className={styles.title}>
          {t.timelineTitle}
        </MaskedTitle>

        <ol className={styles.rail}>
          {t.timeline.map((step, index) => (
            <li key={step.year} className={`${styles.step} ${index === last ? styles.now : ""}`}>
              <Reveal delay={index * 0.08} y={16}>
                <span className={styles.year}>{step.year}</span>
                <span className={styles.dot} aria-hidden="true" />
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.blurb}>{step.blurb}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Link to="/trajetoria" className={`linkArrow ${styles.cta}`}>
          {t.timelineCta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default Timeline;
