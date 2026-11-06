import React, { useEffect, useRef } from "react";
import styles from "./InteractiveBackground.module.scss";

type Dot = { x: number; y: number; vx: number; vy: number; r: number; life: number };

const LINK = 120; // distância máxima (px) para ligar dois pontos
const REACH = 150; // raio de influência do cursor
const MAX_BURST = 90; // teto de pontos, contando os criados por toque/clique

/**
 * Fundo interativo em canvas: pontos à deriva que fogem do cursor e se ligam a ele por linhas.
 * Clique ou toque solta um punhado de pontos novos (que somem sozinhos).
 * - prefers-reduced-motion: desenha um quadro estático, sem animação nem reação ao ponteiro.
 * - Desempenho: poucos pontos (proporcionais à área), DPR limitado a 1,5, pausa com a aba oculta.
 */
const InteractiveBackground: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const target = () => Math.max(26, Math.min(70, Math.round((width * height) / 20000)));

    const spawn = (x: number, y: number, life = -1): Dot => {
      const angle = Math.random() * Math.PI * 2;
      const speed = life > 0 ? 0.9 + Math.random() * 1.2 : 0.08 + Math.random() * 0.22;
      return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: 1.4 + Math.random() * 1.6, life };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want = target();
      const base = dots.filter((d) => d.life < 0);
      while (base.length < want) base.push(spawn(Math.random() * width, Math.random() * height));
      dots = [...base.slice(0, want), ...dots.filter((d) => d.life >= 0)];
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(40, 66, 97, ${0.12 * (1 - Math.sqrt(d2) / LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < REACH) {
            ctx.strokeStyle = `rgba(26, 111, 143, ${0.32 * (1 - d / REACH)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }
      for (const d of dots) {
        const fade = d.life > 0 ? Math.min(1, d.life / 60) : 1;
        ctx.fillStyle = `rgba(26, 111, 143, ${0.38 * fade})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const d of dots) {
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < REACH) {
            const push = ((REACH - dist) / REACH) * 0.9;
            d.vx += (dx / dist) * push;
            d.vy += (dy / dist) * push;
          }
        }
        d.x += d.vx;
        d.y += d.vy;
        // atrito: o impulso do cursor some e o ponto volta à deriva lenta
        d.vx *= 0.96;
        d.vy *= 0.96;
        const min = 0.06;
        if (d.life < 0 && Math.hypot(d.vx, d.vy) < min) {
          d.vx += (Math.random() - 0.5) * 0.05;
          d.vy += (Math.random() - 0.5) * 0.05;
        }
        if (d.x < -20) d.x = width + 20;
        if (d.x > width + 20) d.x = -20;
        if (d.y < -20) d.y = height + 20;
        if (d.y > height + 20) d.y = -20;
        if (d.life > 0) d.life -= 1;
      }
      dots = dots.filter((d) => d.life !== 0);
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || raf || document.hidden) return;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (event: PointerEvent) => {
      if (reduced) return;
      // só no fundo: cliques em links, botões e campos não soltam pontos
      if ((event.target as HTMLElement).closest("a, button, input, textarea, select, summary")) return;
      const room = MAX_BURST - dots.length;
      for (let i = 0; i < Math.min(8, room); i++) dots.push(spawn(event.clientX, event.clientY, 90));
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => {
      reduced = motionQuery.matches;
      if (reduced) {
        stop();
        dots = dots.filter((d) => d.life < 0);
        draw();
      } else start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
};

export default InteractiveBackground;
