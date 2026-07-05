"use client";

import { Lock, ShieldCheck, PackageX } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { StoryPanel } from "@/components/StoryPanel";
import { animations } from "@/lib/animations";

const bullets = [
  {
    icon: Lock,
    title: "Local secret redaction",
    body: "scanned and stripped before any API call",
  },
  {
    icon: ShieldCheck,
    title: "Prompt injection defense",
    body: "your code is treated as data, never as commands",
  },
  {
    icon: PackageX,
    title: "No backend server",
    body: "history and project context stay on your device",
  },
];

export function SecuritySection() {
  const reduce = useReducedMotion();

  return (
    <StoryPanel
      eyebrow="~/security"
      title={
        <>
          your secrets <em className="story-accent">never</em> leave your machine.
        </>
      }
      description="API keys, tokens, credentials — redacted locally before anything is sent for analysis."
      bodyClassName="mx-auto max-w-4xl"
    >
      <div className="story-demo-tile mx-auto flex max-w-lg items-center justify-center gap-4 rounded-lg px-6 py-8 text-center font-mono">
        <span className="extra-iridescent-text extra-price-glow font-display text-6xl font-bold">0</span>
        <span className="text-sm text-cream-warm">secrets sent to Extra AI</span>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2 font-mono text-xs text-cream-warm/75">
        {["~/ExtraAI/history.db", "~/ExtraAI/screenshots/", "~/ExtraAI/prompts.json", "~/ExtraAI/settings.toml"].map((path) => (
          <span key={path} className="rounded-md border border-signal-ember/20 bg-signal-ember/8 px-3 py-1">
            {path}
          </span>
        ))}
      </div>
      <motion.ul
        className="mt-10 grid gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : animations.stagger40 } },
        }}
      >
        {bullets.map(({ icon: Icon, title, body }) => (
          <motion.li
            key={title}
            className="story-demo-tile group rounded-lg p-5"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            whileHover={reduce ? undefined : { y: -4 }}
          >
            <Icon
              aria-hidden
              className="extra-glow-icon mb-4 h-6 w-6"
            />
            <p className="text-sm leading-6 text-cream-warm">
              <span className="block font-display text-base font-semibold text-cream-light">
                {title}
              </span>
              {body}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <p className="mt-8 text-center font-mono text-xs text-cream-warm/80">
        only the current request context is sent for analysis — nothing else, ever.
      </p>
    </StoryPanel>
  );
}
