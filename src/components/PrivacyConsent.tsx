import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./PrivacyConsent.module.scss";

const STORAGE_KEY = "gfc-privacy-consent";
const POLICY_VERSION = "2026-11-06";

type ConsentStatus = "accepted" | "rejected" | null;
type ConsentRecord = {
  status: Exclude<ConsentStatus, null>;
  version: string;
  decidedAt: string;
};

const readConsent = (): ConsentRecord | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== POLICY_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeConsent = (status: Exclude<ConsentStatus, null>) => {
  try {
    const record: ConsentRecord = {
      status,
      version: POLICY_VERSION,
      decidedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(
      new CustomEvent("gfc:consent-change", { detail: record })
    );
  } catch {
    /* noop */
  }
};

const PrivacyConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Publica a altura da barra para o hero reservar espaço, em vez de ficar coberto por ela
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!visible || !bar) {
      root.style.removeProperty("--consent-h");
      return;
    }
    const publish = () => root.style.setProperty("--consent-h", `${bar.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-h");
    };
  }, [visible]);

  useEffect(() => {
    const record = readConsent();
    if (!record) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (next: Exclude<ConsentStatus, null>) => {
    writeConsent(next);
    setVisible(false);
    setExpanded(false);
  };

  useEffect(() => {
    const onReopen = () => {
      setVisible(true);
      setExpanded(false);
    };
    window.addEventListener("gfc:open-privacy", onReopen);
    return () => window.removeEventListener("gfc:open-privacy", onReopen);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible ? (
          <motion.div
            ref={barRef}
            className={styles.banner}
            role="dialog"
            aria-modal="false"
            aria-live="polite"
            aria-label="Aviso de privacidade"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.content}>
              <div className={styles.text}>
                <h3 className={styles.heading}>Sua privacidade importa</h3>
                <p className={styles.message}>
                  Este site não usa cookies nem ferramentas de análise de
                  visitas. Ele guarda só um item temporário no navegador, para
                  não repetir uma animação.{" "}
                  <button
                    type="button"
                    className={styles.inlineLink}
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                  >
                    Saiba mais
                  </button>
                </p>

                {expanded ? (
                  <div className={styles.details}>
                    <p>
                      <strong>O que é guardado:</strong> um item temporário
                      (<code>gfc-mark-played</code>, em sessionStorage) que
                      some ao fechar a aba. Não identifica você.
                    </p>
                    <p>
                      <strong>O que não existe aqui:</strong> cookies,
                      análise de visitas, anúncios e formulários. O único
                      contato é por e-mail, se você escrever para mim.
                    </p>
                    <p>
                      <strong>Seus direitos:</strong> você pode acessar,
                      corrigir, revogar o consentimento ou pedir a remoção dos
                      seus dados a qualquer momento escrevendo para{" "}
                      <a
                        className={styles.mailLink}
                        href="mailto:carvalhofernandesgfc@proton.me"
                      >
                        carvalhofernandesgfc@proton.me
                      </a>
                      .
                    </p>
                    <p className={styles.controller}>
                      Controlador dos dados: Gabriel Fernandes de Carvalho ·
                      Anápolis-GO · Política v. {POLICY_VERSION}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className={styles.actions}>
                <Link className={styles.secondary} to="/privacidade">
                  Política completa
                </Link>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => decide("accepted")}
                >
                  Entendi
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

    </>
  );
};

export default PrivacyConsent;
