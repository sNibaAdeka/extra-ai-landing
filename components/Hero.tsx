"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HotkeyBadge } from "@/components/HotkeyBadge";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HeroTextMatrix } from "@/components/HeroTextMatrix";
import { ProductWindow } from "@/components/ProductWindow";
import { CtaButton } from "@/components/CtaButton";
import { animations } from "@/lib/animations";

const words: { t: string; ember?: boolean }[] = [
  { t: "stop" },
  { t: "guessing" },
  { t: "what" },
  { t: "to" },
  { t: "fix", ember: true },
  { t: "next" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = animations.easeOut;

  return (
    <section className="gradient-warm bg-grid-texture relative overflow-hidden px-6 pb-28 pt-32 sm:px-10 md:pt-40">
      <HeroBackdrop />
      <HeroTextMatrix />
      <div aria-hidden className="hero-center-scrim pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="animate-breathe pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] rounded-full bg-signal-ember blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <motion.span
          className="flex items-center gap-2 rounded-full border border-grid-line bg-bg-mid/60 px-3 py-1 font-mono text-xs text-cream-warm"
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.4, ease }}
        >
          <HotkeyBadge keys={["⌘", "⇧", "E"]} /> · macOS
        </motion.span>

        <motion.h1
          className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 font-display text-4xl font-bold leading-tight text-cream-light sm:text-5xl md:text-6xl"
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={{ visible: { transition: { delayChildren: 0.3, staggerChildren: 0.07 } } }}
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word.t}-${i}`}
              className={word.ember ? "inline-block text-signal-ember" : "inline-block"}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
            >
              {word.t}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="max-w-xl text-balance text-base text-cream-warm sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.3, ease }}
        >
          Extra AI looks at your site and your code at the same time — then writes the
          exact prompt your next fix needs. Works with Cursor, Windsurf, Claude Code, or
          whatever you&apos;re using today.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.3, ease }}
        >
          <CtaButton label="Download Extra AI" />
        </motion.div>

        <motion.span
          className="font-mono text-xs text-cream-warm/80"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3, ease }}
        >
          macOS · free to start
        </motion.span>

        <motion.div
          className="mt-10 flex w-full justify-center"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease }}
        >
          <ProductWindow />
        </motion.div>
      </div>
    </section>
  );
}
