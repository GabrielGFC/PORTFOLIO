import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MaskedTitle, Reveal } from "../../motion/motion";
import styles from "./About.module.scss";

// Na home ficam só os quatro fatos que um recrutador procura (base, stack, formação, idiomas);
// o restante segue em lux.about.facts e na página Trajetória.
const HOME_FACTS = [0, 3, 4, 6];

const About: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.about;
  const facts = HOME_FACTS.map((index) => t.facts[index]).filter(Boolean);

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.story}>
          <MaskedTitle id="about-title" className={styles.title}>
            {t.title}
          </MaskedTitle>
          <Reveal className={styles.copy}>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <Link to="/trajetoria" className="linkArrow">
              {t.journeyLink}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <Reveal className={styles.facts} delay={0.1}>
          <h3 className={styles.factsTitle}>{t.factsTitle}</h3>
          <dl>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
