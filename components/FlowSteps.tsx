"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import { StoryPanel } from "@/components/StoryPanel";
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
    <StoryPanel
      id="the-flow"
      eyebrow="~/the-flow"
      title={
        <>
          point · describe · <em className="story-accent">ship.</em>
        </>
      }
      description="three steps. any AI coding tool you already use."
    >
      <motion.ol
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
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
            className="story-demo-tile group rounded-lg p-5 transition duration-200"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            whileHover={reduce ? undefined : { y: -4 }}
          >
            <span className="font-mono text-sm font-bold text-signal-ember">{step.number}</span>
            <div className="mt-5 flex min-h-40 items-center justify-center rounded-md border border-cream-light/8 bg-bg-void/62 p-5">
              {step.number === "01" ? (
                <div className="flex items-center gap-2">
                  {["⌘", "⇧", "E"].map((key) => (
                    <span
                      key={key}
                      className="extra-glow-filter rounded-md border border-cream-light/10 bg-cream-light/8 px-3 py-2 font-mono text-sm font-bold text-cream-light shadow-[0_0_30px_rgba(255,107,53,0.12)]"
                    >
                      {key}
                    </span>
                  ))}
                </div>
              ) : null}
              {step.number === "02" ? (
                <div className="story-selection-demo relative h-28 w-full max-w-[230px]">
                  <span className="story-selection-box" />
                  <span className="story-selection-fill" />
                  <span className="story-selection-cursor" />
                </div>
              ) : null}
              {step.number === "03" ? (
                <div className="story-prompt-demo w-full max-w-[240px] font-mono text-sm text-cream-light">
                  <div className="mb-4 flex items-center gap-2 text-[11px] text-cream-warm/78">
                    <span className="story-prompt-icon">
                      <ClipboardCheck aria-hidden className="size-3.5" />
                    </span>
                    <span>prompt ready</span>
                  </div>
                  <div className="space-y-3" aria-hidden="true">
                    <span className="story-prompt-line story-prompt-line-long" />
                    <span className="story-prompt-line story-prompt-line-mid" />
                    <span className="story-prompt-line story-prompt-line-short" />
                    <span className="story-prompt-caret" />
                  </div>
                </div>
              ) : null}
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-cream-light">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-cream-warm/82">{step.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </StoryPanel>
  );
}
