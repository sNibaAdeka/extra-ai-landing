"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection } from "@/components/FadeInSection";
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
    <FadeInSection className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/memory</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        it <em className="italic text-cream-light">remembers</em> your project.
      </h2>
      <p className="mt-2 text-cream-warm">
        switch between Cursor today and Windsurf tomorrow — Extra AI still knows what you
        already tried.
      </p>

      <motion.div
        className="mt-10 flex flex-col gap-3 font-mono text-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : animations.stagger80 } },
        }}
      >
        {thread.map((message, i) => (
          <motion.div
            key={i}
            className={message.from === "user" ? "flex justify-end" : "flex justify-start"}
            variants={
              reduce
                ? undefined
                : {
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
          >
            <p
              className={
                message.from === "user"
                  ? "clip-corner max-w-[85%] border border-grid-line bg-bg-mid px-4 py-2 text-cream-light"
                  : "clip-corner max-w-[85%] border border-signal-ember/30 bg-signal-ember/10 px-4 py-2 text-cream-warm"
              }
            >
              {message.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-4 text-sm text-cream-warm">
        context that survives switching tools. something no single AI coding assistant
        does today.
      </p>
    </FadeInSection>
  );
}
