import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { projectMedia } from "../../data/projectMedia";
import type { FeaturedProject } from "../../data/featuredProjects";
import styles from "./ProjectVisual.module.scss";

type Props = {
  thumbnailKey: FeaturedProject["thumbnailKey"];
  alt: string;
  /** "shot": sempre a captura real (vitrine da home); "auto": diagrama quando existe (página do projeto). */
  variant?: "auto" | "shot";
};

type NodeProps = { x: number; y: number; w?: number; h?: number; title: string; sub?: string; sub2?: string; strong?: boolean };

const Node: React.FC<NodeProps> = ({ x, y, w = 168, h = 74, title, sub, sub2, strong }) => (
  <g className={strong ? styles.nodeStrong : styles.node}>
    <rect x={x} y={y} width={w} height={h} rx={12} />
    <text x={x + 16} y={y + 28} className={styles.nodeTitle}>
      {title}
    </text>
    {sub && (
      <text x={x + 16} y={y + 48} className={styles.nodeSub}>
        {sub}
      </text>
    )}
    {sub2 && (
      <text x={x + 16} y={y + 63} className={styles.nodeSub}>
        {sub2}
      </text>
    )}
  </g>
);

const Arrow: React.FC<{ d: string }> = ({ d }) => <path d={d} className={styles.arrow} markerEnd="url(#arrowhead)" />;

const Defs: React.FC = () => (
  <defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 1 L9 5 L0 9" className={styles.arrowHead} />
    </marker>
  </defs>
);

/** Diagrama da reescrita: legado Laravel → backend Java/Spring Boot, com PostgreSQL e integração Lattes. */
const LionDiagram: React.FC<{ label: string }> = ({ label }) => {
  const t = useContext(LanguageContext).data.lux.work.diagrams.lion;
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={label} className={styles.svg}>
      <Defs />
      <Node x={28} y={163} w={140} title={t.legacy} sub="PHP / Laravel" />
      <Arrow d="M168 200 H236" />
      <text x={202} y={188} textAnchor="middle" className={styles.edge}>
        {t.rewrite}
      </text>
      <Node x={236} y={150} w={186} h={100} title="Backend" sub="Java 21 · Spring Boot 4" sub2={t.controllers} strong />
      <Arrow d="M422 180 H452 V112 H468" />
      <Arrow d="M422 220 H452 V288 H468" />
      <Node x={468} y={75} w={148} title="PostgreSQL" sub="Flyway" sub2={t.migrations} />
      <Node x={468} y={251} w={148} title="CNPq / Lattes" sub={t.soap} />
    </svg>
  );
};

/** Diagrama do fluxo do Aila: manuscrito → IA local → curadoria → ranking explicável → decisão humana. */
const AilaDiagram: React.FC<{ label: string }> = ({ label }) => {
  const t = useContext(LanguageContext).data.lux.work.diagrams.aila;
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={label} className={styles.svg}>
      <Defs />
      <Node x={24} y={70} w={176} title={t.manuscript} sub={t.formats} />
      <Arrow d="M200 107 H232" />
      <Node x={232} y={70} w={176} title={t.analysis} sub="Ollama · Groq" sub2={t.cnpq} strong />
      <Arrow d="M408 107 H440" />
      <Node x={440} y={70} w={176} title={t.curation} sub="OpenAlex · ORCID" sub2={t.tiers} />
      <Arrow d="M528 144 V226" />
      <Node x={440} y={230} w={176} title={t.ranking} sub={t.traceable} />
      <Arrow d="M440 267 H408" />
      <Node x={232} y={230} w={176} title={t.decision} sub={t.humanSub} strong />
    </svg>
  );
};

const diagrams: Partial<Record<Props["thumbnailKey"], React.FC<{ label: string }>>> = {
  lion: LionDiagram,
  aila: AilaDiagram,
};

/** Em telas estreitas o diagrama rola na horizontal; nesse caso a moldura vira região focável para quem usa teclado. */
const DiagramFrame: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  const hint = useContext(LanguageContext).data.lux.work.diagrams.scrollable;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScrolls(el.scrollWidth > el.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.frame} ${styles.diagram}`}
      {...(scrolls ? { tabIndex: 0, role: "region", "aria-label": `${label}, ${hint}` } : {})}
    >
      {children}
    </div>
  );
};

/** Moldura padrão dos projetos: diagrama quando a captura não mostra o trabalho; senão, captura real recortada na mesma proporção. */
const ProjectVisual: React.FC<Props> = ({ thumbnailKey, alt, variant = "auto" }) => {
  const Diagram = variant === "auto" ? diagrams[thumbnailKey] : undefined;
  if (Diagram) {
    return (
      <DiagramFrame label={alt}>
        <Diagram label={alt} />
      </DiagramFrame>
    );
  }
  return (
    <div className={`${styles.frame} ${styles.shot} ${variant === "shot" ? styles.compact : ""}`}>
      <span className={styles.chrome} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <img src={projectMedia[thumbnailKey]} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
};

export default ProjectVisual;
