import { motion, useReducedMotion } from "framer-motion";
import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { duration, ease, scrollToSection } from "../../motion/motion";
import Monogram from "./Monogram";
import styles from "./Intro.module.scss";

/** Herói da Direção C: nome em serifa, marca como forma escultórica no lado direito (escala contida, sem competir com o texto). */
const Intro: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.hero;
  const reduce = !!useReducedMotion();

  const fadeIn = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.slow, ease, delay },
  });

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.art} aria-hidden="true">
        <Monogram className={styles.mark} />
      </div>

      <div className={`container ${styles.inner}`}>
        <motion.h1 id="hero-title" className={styles.title} {...fadeIn(0.15)}>
          <span>{t.line1}</span> <em>{t.line2}</em>
        </motion.h1>

        <motion.p className={styles.statement} {...fadeIn(0.3)}>
          {t.statement}
        </motion.p>

        <motion.div className={styles.actions} {...fadeIn(0.45)}>
          <button type="button" className={styles.primary} onClick={() => scrollToSection("work", reduce)}>
            {t.primary}
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" className={styles.ghost} onClick={() => scrollToSection("contact", reduce)}>
            {t.secondary}
            <span aria-hidden="true">↗</span>
          </button>
        </motion.div>
      </div>

      <p className={styles.place}>{t.location}</p>
    </section>
  );
};

export default Intro;
