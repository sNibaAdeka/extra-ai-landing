"use client";

import type { CSSProperties } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StoryPanel } from "@/components/StoryPanel";

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
    <StoryPanel
      id="faq"
      eyebrow="~/faq"
      title={
        <>
          questions, <em className="story-accent">answered.</em>
        </>
      }
      bodyClassName="mx-auto max-w-3xl"
    >
      <Accordion className="story-demo-tile rounded-lg px-4 sm:px-6">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.q}
            value={faq.q}
            className="faq-item-appear border-cream-light/10"
            style={{ animationDelay: `${index * 70}ms` } as CSSProperties}
          >
            <AccordionTrigger className="text-left font-display text-cream-light">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-cream-warm">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </StoryPanel>
  );
}
