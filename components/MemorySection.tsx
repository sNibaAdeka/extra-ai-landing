"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { History, PencilLine } from "lucide-react";
import { StoryPanel } from "@/components/StoryPanel";
import { animations } from "@/lib/animations";

const thread = [
  { from: "user" as const, text: `Monday, in Cursor: "fix the header spacing"` },
  {
    from: "assistant" as const,
    text: "→ Extra AI: adjusted .header padding to match your 8px scale",
  },
  { from: "user" as const, text: `Wednesday, in Windsurf: "the header still looks off"` },
  {
    from: "assistant" as const,
    text: `→ Extra AI: "You already adjusted spacing on Monday — this looks like a different issue: the logo image itself is misaligned, not the padding."`,
  },
];

export function MemorySection() {
  const reduce = useReducedMotion();

  return (
    <StoryPanel
      eyebrow="~/memory"
      title={
        <>
          it <em className="story-accent">remembers</em> your project.
        </>
      }
      description="switch between Cursor today and Windsurf tomorrow — Extra AI still knows what you already tried."
      bodyClassName="mx-auto max-w-4xl"
    >
      <motion.div
        className="story-demo-tile rounded-lg p-4 font-mono text-sm sm:p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : animations.stagger80 } },
        }}
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center gap-3 rounded-md border border-signal-ember/24 bg-signal-ember/8 px-3 py-2 text-cream-warm">
            <span className="memory-status-icon">
              <History aria-hidden className="size-4" />
            </span>
            <span className="font-display text-sm font-bold text-cream-light">project memory</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-cream-warm/75">
            {["header.tsx", "8px scale", "Cursor", "Windsurf"].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-cream-light/10 bg-bg-void/58 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {thread.map((message, i) => (
            <motion.div
              key={i}
              className={message.from === "user" ? "flex justify-end" : "flex justify-start"}
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0 },
                    }
              }
              transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            >
              <p
                className={
                  message.from === "user"
                    ? "max-w-[88%] rounded-md border border-cream-light/10 bg-bg-void/70 px-4 py-3 text-cream-light"
                    : "max-w-[88%] rounded-md border border-signal-ember/35 bg-signal-ember/12 px-4 py-3 text-cream-warm shadow-[0_0_48px_rgba(255,107,53,0.08)]"
                }
              >
                {message.from === "assistant" ? (
                  <>
                    <span className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase text-signal-ember">
                      <PencilLine aria-hidden className="size-3.5" />
                      writing from memory
                    </span>
                    <span
                      className="memory-type-line block"
                      style={{ animationDelay: `${220 + i * 120}ms` } as CSSProperties}
                    >
                      {message.text}
                    </span>
                  </>
                ) : (
                  message.text
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <p className="mt-6 text-center text-sm text-cream-warm">
        context that survives switching tools. something no single AI coding assistant
        does today.
      </p>
    </StoryPanel>
  );
}
