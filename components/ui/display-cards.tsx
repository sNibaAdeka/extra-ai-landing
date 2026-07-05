"use client";

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  meta?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4" />,
  title = "Signal found",
  description = "Visual mismatch detected",
  meta = "screen + code",
  iconClassName,
  titleClassName,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-36 w-[17rem] -skew-y-[7deg] select-none flex-col justify-between overflow-hidden rounded-lg border border-cream-light/12 bg-bg-void/72 px-4 py-3 text-cream-light shadow-[0_28px_90px_rgba(23,13,18,0.36)] backdrop-blur-md transition-all duration-500 after:absolute after:-right-8 after:top-[-12%] after:h-[124%] after:w-32 after:bg-gradient-to-l after:from-bg-void after:to-transparent after:content-[''] hover:-translate-y-2 hover:border-signal-ember/50 hover:bg-bg-mid/72 hover:shadow-[0_30px_110px_rgba(255,107,53,0.16)] sm:h-40 sm:w-[22rem]",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-cream-light/70 to-transparent opacity-0 shadow-[0_0_24px_rgba(245,228,204,0.32)] transition duration-500 group-hover:translate-y-8 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(115deg,rgba(245,228,204,0.22)_0_1px,transparent_1px_18px)]"
      />
      <div className="relative z-10 flex items-center gap-2">
        <span
          className={cn(
            "extra-glow-filter inline-flex size-8 items-center justify-center rounded-md border border-signal-ember/30 bg-signal-ember/14 text-signal-ember",
            iconClassName
          )}
        >
          {icon}
        </span>
        <p className={cn("font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream-warm", titleClassName)}>
          {title}
        </p>
      </div>
      <p className="relative z-10 max-w-[13.8rem] truncate whitespace-nowrap font-display text-lg font-bold leading-tight text-cream-light sm:max-w-[17rem] sm:text-xl">
        {description}
      </p>
      <p className="relative z-10 font-mono text-xs text-cream-warm/68">{meta}</p>
    </div>
  );
}

export interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  className?: string;
}

export default function DisplayCards({ cards, className }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-lg before:border before:border-cream-light/10 before:bg-bg-void/42 before:content-[''] before:transition-opacity before:duration-500 hover:before:opacity-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-8 translate-y-10 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-lg before:border before:border-cream-light/10 before:bg-bg-void/42 before:content-[''] before:transition-opacity before:duration-500 hover:-translate-y-1 hover:before:opacity-0 sm:translate-x-14",
      title: "Context merged",
      description: "Code and screen agree on the same fix",
      meta: "component trace",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-20 hover:translate-y-14 sm:translate-x-28",
      title: "Prompt ready",
      description: "Exact instruction for the next AI pass",
      meta: "copy to Cursor",
    },
  ];

  return (
    <div
      className={cn(
        "grid min-h-[330px] [grid-template-areas:'stack'] place-items-center py-6 sm:min-h-[390px]",
        className
      )}
    >
      {(cards ?? defaultCards).map((cardProps, index) => (
        <DisplayCard key={`${cardProps.title ?? "display-card"}-${index}`} {...cardProps} />
      ))}
    </div>
  );
}
