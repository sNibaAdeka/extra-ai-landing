"use client";

import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StoryPanel } from "@/components/StoryPanel";
import { animations } from "@/lib/animations";

const tiers = [
  {
    name: "FREE",
    price: "$0",
    suffix: "",
    eyebrow: "STARTER",
    features: ["5 analyses per month", "Works with any Code AI tool", "Basic prompt grounding"],
    cta: "Download — free",
    featured: false,
    className: "lg:col-span-3",
  },
  {
    name: "PRO",
    price: "$9/mo",
    suffix: "billed monthly",
    eyebrow: "MOST RECOMMENDED",
    features: [
      "Unlimited analyses",
      "1 active project with memory",
      "Tool-specific prompt formatting",
      "Screen + code grounding on every prompt",
    ],
    cta: "Start Pro",
    featured: true,
    className: "lg:col-span-5",
  },
  {
    name: "STUDIO",
    price: "$29/mo",
    suffix: "for heavier project work",
    eyebrow: "BUILDER",
    features: [
      "Everything in Pro",
      "Up to 5 projects",
      "Security & issue detection included",
      "Team sharing",
    ],
    cta: "Start Studio",
    featured: false,
    className: "lg:col-span-4",
  },
  {
    name: "TEAM",
    price: "$79/mo",
    suffix: "for small product teams",
    eyebrow: "COLLAB",
    features: [
      "Everything in Studio",
      "Shared prompt history",
      "Team review workspace",
      "Priority onboarding",
    ],
    cta: "Talk to us",
    featured: false,
    className: "lg:col-span-4",
  },
];

function FilledCheck() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-signal-ember text-bg-void shadow-[0_0_18px_rgba(255,107,53,0.18)]">
      <CheckIcon aria-hidden className="size-3.5" strokeWidth={3} />
    </span>
  );
}

export function PricingCards() {
  const reduce = useReducedMotion();
  const proTier = tiers.find((tier) => tier.featured);
  const otherTiers = tiers.filter((tier) => !tier.featured);

  return (
    <StoryPanel
      id="pricing"
      eyebrow="~/pricing"
      title={
        <>
          start free. <em className="story-accent">upgrade when it&apos;s obvious.</em>
        </>
      }
      description="free enough to try on real work, paid when the saved time is already obvious."
    >
      <motion.div
        className="grid grid-cols-1 gap-4 lg:grid-cols-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: reduce ? 0 : animations.stagger80 } },
        }}
      >
        {proTier ? (
          <motion.div
            key={proTier.name}
            className={cn("h-full", proTier.className)}
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            whileHover={reduce ? undefined : { y: -3 }}
          >
            <div className="story-demo-tile pricing-card relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-lg p-0 shadow-[0_26px_90px_rgba(23,13,18,0.24)]">
              <div className="relative z-10 flex flex-wrap items-center gap-3 border-b border-cream-light/10 p-5">
                <span className="rounded-full border border-signal-ember/40 bg-signal-ember/15 px-2 py-0.5 font-mono text-xs font-bold text-signal-ember">
                  {proTier.eyebrow}
                </span>
                <span className="rounded-full border border-cream-light/10 bg-cream-light/8 px-2 py-0.5 font-mono text-xs text-cream-warm">
                  Most popular
                </span>
                <Link
                  href="#pricing"
                  className="clip-corner ml-auto flex min-h-9 items-center justify-center bg-signal-ember px-4 py-2 font-display text-sm font-bold text-bg-void transition hover:bg-[#ff7b4b]"
                >
                  {proTier.cta}
                </Link>
              </div>
              <div className="relative z-10 grid flex-1 gap-6 p-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-[0.22em] text-cream-warm/80">
                    {proTier.name}
                  </h3>
                  <p className="mt-4 bg-gradient-to-r from-cream-light via-[#f0a3d7] to-signal-ember bg-clip-text font-display text-6xl font-bold text-transparent sm:text-7xl">
                    {proTier.price}
                  </p>
                  <p className="mt-2 font-mono text-xs text-cream-warm/68">{proTier.suffix}</p>
                </div>
                <ul className="grid gap-3 text-sm leading-6 text-cream-warm">
                  {proTier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <FilledCheck />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}

        {otherTiers.map((tier) => (
          <motion.div
            key={tier.name}
            className={cn("h-full", tier.className)}
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: animations.durations.transition, ease: animations.easeOut }}
            whileHover={reduce ? undefined : { y: -3 }}
          >
            <div className="story-demo-tile pricing-card relative flex h-full min-h-[320px] flex-col gap-4 rounded-lg p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-cream-light/10 bg-cream-light/8 px-2 py-0.5 font-mono text-xs font-bold text-cream-warm">
                  {tier.eyebrow}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-mono text-sm font-bold tracking-[0.2em] text-cream-warm/80">
                  {tier.name}
                </h3>
                <p className="mt-3 bg-gradient-to-r from-cream-light via-cream-warm to-signal-ember bg-clip-text font-display text-5xl font-bold text-transparent">
                  {tier.price}
                </p>
                {tier.suffix ? (
                  <p className="mt-1 font-mono text-xs text-cream-warm/60">{tier.suffix}</p>
                ) : null}
              </div>
              <ul className="grid gap-2 text-sm text-cream-warm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FilledCheck />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.name === "FREE" ? "/download" : "#pricing"}
                className="clip-corner mt-auto flex min-h-11 items-center justify-center border border-grid-line px-4 py-2 text-center font-display text-sm font-bold text-cream-light transition hover:border-signal-ember/50 hover:text-signal-ember"
              >
                {tier.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-6 text-center font-mono text-xs text-cream-warm/80">
        cancel anytime · no credit card for Free · macOS first, Windows next
      </p>
    </StoryPanel>
  );
}
