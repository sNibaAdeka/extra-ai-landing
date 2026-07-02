"use client";

import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * A stylised macOS-framed mock of Extra AI's analysis overlay — a captured
 * screen region on the left, the grounded prompt it generates on the right.
 * Floats with a subtle mouse-driven tilt and an ember drop shadow so the
 * hero reads as a real product, not a coming-soon page.
 */
export function ProductWindow() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="w-full max-w-2xl [perspective:1200px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="gradient-border clip-corner overflow-hidden border border-grid-line bg-bg-mid shadow-[0_40px_120px_-24px_rgba(255,107,53,0.4)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-grid-line bg-bg-void/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-cream-warm">extra — analysis</span>
        </div>

        {/* Body */}
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {/* Captured region */}
          <div className="clip-corner border border-grid-line bg-bg-void/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-cream-warm/70">
              captured region
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="h-2 w-2/3 rounded bg-cream-light/15" />
              <div className="h-2 w-1/2 rounded bg-cream-light/10" />
              <div className="relative mt-2 w-fit">
                <span className="clip-corner inline-block bg-cream-light/20 px-4 py-2 text-xs text-cream-light">
                  Get started
                </span>
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-signal-ember font-mono text-[10px] font-bold text-bg-void">
                  !
                </span>
              </div>
            </div>
          </div>

          {/* Generated prompt */}
          <div className="clip-corner border border-signal-ember/30 bg-signal-ember/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-signal-ember">
              generated prompt
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-cream-warm">
              {`Fix the mobile CTA:
· padding 13px → 16px (8px scale)
· contrast 3.8 → 4.5:1 minimum
· add a breakpoint below 768px`}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
