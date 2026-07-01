"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInSection } from "@/components/FadeInSection";

const faqs = [
  {
    q: "Which platforms does Extra AI run on?",
    a: "macOS 13+ (Apple Silicon + Intel via universal build). Windows is on the roadmap.",
  },
  {
    q: "Does Extra AI work with tools other than Cursor?",
    a: "Yes — Cursor, Windsurf, Claude Code, Codex, and v0 are all supported, with prompt formatting adapted to each tool's conventions.",
  },
  {
    q: "Where does my code go?",
    a: "Your screenshot and code are sent only to Gemini for the current analysis. Secrets are redacted locally first. Nothing is stored on a remote server.",
  },
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you 5 analyses a month to try it. Pro removes the limit and adds persistent project memory.",
  },
  {
    q: "Can I use this without an active Cursor/Windsurf subscription?",
    a: "Yes — Extra AI generates the prompt, you paste it wherever you write code.",
  },
];

export function FAQAccordion() {
  return (
    <FadeInSection className="mx-auto max-w-2xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/faq</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        questions, <em className="text-signal-ember not-italic">answered.</em>
      </h2>

      <Accordion className="mt-10">
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q} className="border-grid-line">
            <AccordionTrigger className="text-left font-display text-cream-light">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-cream-warm">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FadeInSection>
  );
}
