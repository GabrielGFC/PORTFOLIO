import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

/** Tokens de movimento: poucos valores, sempre os mesmos. */
export const ease = [0.16, 1, 0.3, 1] as const;
export const duration = { fast: 0.22, base: 0.6, slow: 1.1, cinematic: 1.4 };
export const stagger = { tight: 0.06, base: 0.12 };
export const distance = { sm: 16, md: 28, lg: 60 };

export const RESUME_URL = `${import.meta.env.BASE_URL}Gabriel_Fernandes_de_Carvalho.pdf`;

/** Rola até uma seção e entrega o foco a ela, para quem navega por teclado. */
export const scrollToSection = (id: string, reduce: boolean) => {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = id === "top" ? 0 : (header?.getBoundingClientRect().height ?? 72) + 16;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Entrada única ao rolar: opacidade e deslocamento curto, uma vez. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = distance.md }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: duration.slow, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

type MaskedTitleProps = {
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  onMount?: boolean;
};

/** Título revelado por máscara: o texto sobe de dentro de um recorte. */
export const MaskedTitle: React.FC<MaskedTitleProps> = ({
  as = "h2",
  id,
  className,
  children,
  delay = 0,
  onMount = false,
}) => {
  const reduce = useReducedMotion();
  const Tag = as;
  // Observa o recorte, não o texto: o texto começa fora da máscara e nunca "entraria" na tela.
  const maskRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(maskRef, { once: true, amount: 0.5 });
  const visible = onMount || inView;
  return (
    <Tag id={id} className={className}>
      <span ref={maskRef} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
        <motion.span
          style={{ display: "block" }}
          initial={reduce ? false : { y: "105%" }}
          animate={visible ? { y: "0%" } : undefined}
          transition={{ duration: duration.cinematic, ease, delay }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
};

/** Transição entre páginas: só opacidade, curta. */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
};
