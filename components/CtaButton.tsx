import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Primary download CTA: a raised ember surface (top-light → bottom-dark
 * inner gradient) that emits a soft ember glow, with the ⌘⇧E keycaps
 * grouped into one cohesive dark chip. Hover intensifies the glow and
 * lifts slightly; press dips it.
 */
export function CtaButton({
  href = "/download",
  label,
  size = "md",
  className,
}: {
  href?: string;
  label: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-md",
        "transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember",
        className
      )}
    >
      {/* Emitted glow — separate layer so it escapes the clipped surface. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-md bg-signal-ember opacity-45 blur-2xl transition-opacity duration-150 group-hover:opacity-70"
      />
      <span
        className={cn(
          "cta-ember-surface clip-corner flex items-center gap-3 font-display font-bold text-bg-void",
          size === "lg" ? "min-h-12 px-8 py-4 text-base" : "min-h-11 px-6 py-3 text-sm"
        )}
      >
        {label}
        <span className="extra-glow-filter flex items-center gap-1 rounded-md bg-bg-void/80 px-2 py-1 font-mono text-xs text-cream-light">
          <span>⌘</span>
          <span>⇧</span>
          <span>E</span>
        </span>
      </span>
    </Link>
  );
}
