import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MaskedTitle, RESUME_URL, Reveal } from "../../motion/motion";
import styles from "./Closing.module.scss";

const Closing: React.FC = () => {
  const { data } = useContext(LanguageContext);
  const t = data.lux.contact;
  const nav = data.lux.nav;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const mailto = `mailto:${t.email}?subject=${encodeURIComponent(t.subject)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* sem permissão de área de transferência: o e-mail continua visível e clicável */
    }
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <MaskedTitle id="contact-title" className={styles.title}>
          {t.title}
        </MaskedTitle>
        <Reveal className={styles.body}>
          <p className={styles.text}>{t.text}</p>

          <div className={styles.actions}>
            <a className={styles.primary} href={mailto}>
              {t.cta}
              <span aria-hidden="true">→</span>
            </a>
            <button type="button" className={styles.copy} onClick={() => void copy()}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? t.copied : ""}
          </span>

          <a className={styles.email} href={mailto}>
            {t.email}
          </a>
          <p className={styles.note}>{t.note}</p>

          <ul className={styles.links}>
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
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                {nav.resume} (PDF) <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default Closing;
