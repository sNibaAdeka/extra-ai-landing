"use client";

import { Lock, ShieldCheck, PackageX } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInSection } from "@/components/FadeInSection";
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
    <FadeInSection className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/security</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        your secrets <em className="italic text-cream-light">never</em> leave your
        machine.
      </h2>
      <p className="mt-2 text-cream-warm">
        API keys, tokens, credentials — redacted locally before anything is sent for
        analysis.
      </p>

      <motion.ul
        className="mt-10 flex flex-col gap-6"
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
            className="group flex items-start gap-4"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
          >
            <Icon
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 text-cream-warm transition-colors group-hover:text-signal-ember"
            />
            <p className="text-cream-warm">
              <span className="font-display font-semibold text-cream-light">{title}</span>{" "}
              — {body}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <p className="mt-8 font-mono text-xs text-cream-warm/80">
        only the current request context is sent for analysis — nothing else, ever.
      </p>
    </FadeInSection>
  );
}
