"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection } from "@/components/FadeInSection";
import { animations } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Press the hotkey",
    body: "Anywhere on your Mac. The overlay appears instantly, no app switching.",
  },
  {
    number: "02",
    title: "Say what's wrong",
    body: `Plain words — "the button looks off on mobile." No technical vocabulary needed.`,
  },
  {
    number: "03",
    title: "Get the exact prompt",
    body: "Grounded in your actual screenshot and code — copy it straight into Cursor, Windsurf, or Claude Code.",
  },
];

export function FlowSteps() {
  const reduce = useReducedMotion();

  return (
    <FadeInSection className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/the-flow</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        point · describe · <em className="italic text-cream-light">ship.</em>
      </h2>
      <p className="mt-2 text-cream-warm">three steps. any AI coding tool you already use.</p>

      <motion.ol
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : animations.stagger80 } },
        }}
      >
        {steps.map((step) => (
          <motion.li
            key={step.number}
            className="clip-corner border border-grid-line bg-bg-mid/40 p-6 transition-colors hover:border-signal-ember/40"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            whileHover={reduce ? undefined : { y: -4 }}
          >
            <span className="font-display text-4xl font-bold text-signal-ember sm:text-5xl">
              {step.number}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-cream-light">
              {step.title}
            </h3>
            <p className="mt-1 text-cream-warm">{step.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </FadeInSection>
  );
}
