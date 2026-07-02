"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeInSection } from "@/components/FadeInSection";
import { animations } from "@/lib/animations";

const tiers = [
  {
    name: "FREE",
    price: "$0",
    features: ["5 analyses per month", "Works with any Code AI tool", "Basic prompt grounding"],
    cta: "Download — free",
    featured: false,
  },
  {
    name: "PRO",
    price: "$9/mo",
    features: [
      "Unlimited analyses",
      "1 active project with memory",
      "Tool-specific prompt formatting",
    ],
    cta: "Start Pro",
    featured: true,
  },
  {
    name: "STUDIO",
    price: "$29/mo",
    features: [
      "Everything in Pro",
      "Up to 5 projects",
      "Security & issue detection included",
      "Team sharing",
    ],
    cta: "Start Studio",
    featured: false,
  },
];

export function PricingCards() {
  const reduce = useReducedMotion();

  return (
    <FadeInSection id="pricing" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/pricing</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        start free. <em className="italic text-cream-light">upgrade when it&apos;s obvious.</em>
      </h2>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : animations.stagger80 } },
        }}
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            className={cn(
              "clip-corner flex flex-col gap-4 border p-6",
              tier.featured
                ? "border-signal-ember bg-bg-mid"
                : "border-grid-line bg-bg-mid/60"
            )}
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            whileHover={reduce ? undefined : { y: -6 }}
          >
            {tier.featured && (
              <span className="w-fit rounded-full bg-signal-ember px-2 py-0.5 font-mono text-xs font-bold text-bg-void">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-bold text-cream-light">{tier.name}</h3>
            <p className="font-display text-3xl font-bold text-cream-light">{tier.price}</p>
            <ul className="flex flex-col gap-2 text-sm text-cream-warm">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href="#"
              className={cn(
                "clip-corner mt-auto flex min-h-11 items-center justify-center px-4 py-2 text-center font-display text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ember",
                tier.featured
                  ? "bg-signal-ember text-bg-void"
                  : "border border-grid-line text-cream-light"
              )}
            >
              {tier.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-6 text-center font-mono text-xs text-cream-warm/80">
        cancel anytime · no credit card for Free
      </p>
    </FadeInSection>
  );
}
