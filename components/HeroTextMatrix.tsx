"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Snippet = { text: string; col: number; row: number; highlight?: boolean };

// Snippets snap to a 6×6 grid so the field reads as structured, not scattered.
const snippets: Snippet[] = [
  { text: "npm run build", col: 1, row: 1 },
  { text: "Suspense fallback", col: 3, row: 1 },
  { text: "git diff --stat", col: 5, row: 1 },
  { text: "useEffect(() =>", col: 2, row: 2 },
  { text: "aria-label=\"\"", col: 4, row: 2 },
  { text: "TypeError: undefined", col: 6, row: 2 },
  { text: "className=", col: 1, row: 3 },
  { text: "contrast 4.5:1", col: 5, row: 3, highlight: true },
  { text: "z-index: 999", col: 6, row: 4 },
  { text: "op. cit. p. 42", col: 1, row: 4 },
  { text: "flex: 1 1 0", col: 3, row: 4 },
  { text: "prompt.md", col: 4, row: 5 },
  { text: "grounded.", col: 3, row: 5, highlight: true },
  { text: "onClick={() =>", col: 2, row: 6 },
  { text: "8px scale", col: 1, row: 6 },
  { text: "fixed.", col: 6, row: 6, highlight: true },
];

export function HeroTextMatrix() {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 120, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (reduce) return;
    function handleMove(e: MouseEvent) {
      // Map cursor to a ±4px offset — subtle depth, never distracting.
      x.set(((e.clientX / window.innerWidth) - 0.5) * 8);
      y.set(((e.clientY / window.innerHeight) - 0.5) * 8);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduce, x, y]);

  return (
    <div aria-hidden className="hero-matrix-mask pointer-events-none absolute inset-0 select-none overflow-hidden">
      <motion.div
        style={reduce ? undefined : { x, y }}
        className="grid h-full w-full grid-cols-6 grid-rows-6 gap-4 p-10"
      >
        {snippets.map((s) => (
          <span
            key={s.text}
            className={
              s.highlight
                ? "self-center font-mono text-xs text-signal-ember/30 sm:text-sm"
                : "self-center font-mono text-xs text-cream-light/[0.07] sm:text-sm"
            }
            style={{ gridColumn: s.col, gridRow: s.row }}
          >
            {s.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
