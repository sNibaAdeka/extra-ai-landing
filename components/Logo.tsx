import { cn } from "@/lib/utils";

/**
 * The Extra AI brand mark: a bracket-cursor glyph — two rounded square
 * brackets in a pink→amber gradient framing a light cursor bar.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="extraBracketGrad" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F6A6C4" />
          <stop offset="55%" stopColor="#F4B57E" />
          <stop offset="100%" stopColor="#EFB94F" />
        </linearGradient>
        <linearGradient id="extraCursorGrad" x1="32" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5DAC1" />
        </linearGradient>
      </defs>
      <path
        d="M27 9 H15 a5 5 0 0 0 -5 5 V50 a5 5 0 0 0 5 5 H27"
        stroke="url(#extraBracketGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 9 H49 a5 5 0 0 1 5 5 V50 a5 5 0 0 1 -5 5 H37"
        stroke="url(#extraBracketGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="30" y="17" width="4" height="30" rx="2" fill="url(#extraCursorGrad)" />
    </svg>
  );
}

/**
 * Full lockup: mark + "extra." wordmark (white → warm tan gradient).
 */
export function Logo({
  className,
  markClassName = "h-6 w-6",
  wordmarkClassName = "text-lg",
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "bg-gradient-to-r from-cream-light via-cream-light to-cream-warm bg-clip-text font-display font-bold text-transparent",
          wordmarkClassName
        )}
      >
        extra.
      </span>
    </span>
  );
}
