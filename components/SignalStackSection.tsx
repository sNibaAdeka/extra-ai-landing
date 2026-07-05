"use client";

import { ClipboardCheck, Code2, Eye } from "lucide-react";
import { StoryPanel } from "@/components/StoryPanel";
import DisplayCards, { type DisplayCardProps } from "@/components/ui/display-cards";

const signalCards: DisplayCardProps[] = [
  {
    icon: <Eye className="size-4" />,
    title: "Screen",
    description: "Sees the visual bug.",
    meta: "visual signal",
    className:
      "[grid-area:stack] z-10 -translate-y-6 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-lg before:border before:border-cream-light/10 before:bg-bg-void/42 before:content-[''] before:transition-opacity before:duration-500 hover:-translate-y-14 hover:before:opacity-0 sm:-translate-y-10 sm:hover:-translate-y-20",
  },
  {
    icon: <Code2 className="size-4" />,
    title: "Code",
    description: "Finds the component.",
    meta: "tsx + css",
    className:
      "[grid-area:stack] z-20 translate-x-4 translate-y-4 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-lg before:border before:border-cream-light/10 before:bg-bg-void/42 before:content-[''] before:transition-opacity before:duration-500 hover:-translate-y-2 hover:before:opacity-0 sm:translate-x-12 sm:translate-y-6 sm:hover:-translate-y-8",
  },
  {
    icon: <ClipboardCheck className="size-4" />,
    title: "Prompt",
    description: "Writes the next fix.",
    meta: "ready to paste",
    className:
      "[grid-area:stack] z-30 translate-x-8 translate-y-14 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-8 sm:translate-x-24 sm:translate-y-16 sm:hover:translate-y-8",
  },
];

const labels = ["what changed", "where it lives", "what to tell AI"];

export function SignalStackSection() {
  return (
    <StoryPanel
      eyebrow="~/signals"
      title={
        <>
          three layers. <em className="story-accent">one useful prompt.</em>
        </>
      }
      description="a compact view of how Extra AI turns visual context into code-aware instructions."
      bodyClassName="mt-28 grid items-center gap-10 lg:mt-32 lg:grid-cols-[0.82fr_1.18fr]"
    >
      <div className="space-y-5">
        {labels.map((label, index) => (
          <div
            key={label}
            className="story-demo-tile flex items-center gap-5 rounded-lg border-signal-ember/20 px-5 py-4 font-mono text-base text-cream-warm shadow-[0_18px_55px_rgba(23,13,18,0.22)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-signal-ember/40 bg-signal-ember/14 text-sm font-bold text-signal-ember shadow-[0_0_28px_rgba(255,107,53,0.12)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="-mt-8 overflow-visible py-4 sm:-mt-12 lg:-mt-16">
        <DisplayCards cards={signalCards} className="min-h-[300px] sm:min-h-[330px]" />
      </div>
    </StoryPanel>
  );
}
