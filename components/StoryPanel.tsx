"use client";

import type { ReactNode } from "react";
import { FadeInSection } from "@/components/FadeInSection";
import { cn } from "@/lib/utils";

export function StoryPanel({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  bodyClassName,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <FadeInSection
      id={id}
      className={cn(
        "story-panel relative mx-3 overflow-hidden rounded-lg border border-grid-line/70 px-5 py-20 sm:mx-6 sm:px-8 lg:mx-10 lg:px-12 lg:py-24",
        className
      )}
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="story-eyebrow font-mono text-xs text-cream-warm sm:text-sm">
            {eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] text-cream-light sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-cream-warm/82 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className={cn("mt-12", bodyClassName)}>{children}</div>
      </div>
    </FadeInSection>
  );
}
