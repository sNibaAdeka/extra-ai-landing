/**
 * Ambient hero backdrop echoing the brand logo's artwork: soft overlapping
 * dune bands sweeping across the lower half, plus faint corner dot-grids.
 * Purely decorative and non-interactive.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot-grid accents in opposite corners, as on the logo artwork. */}
      <div className="absolute right-8 top-24 h-24 w-32 [background-image:radial-gradient(var(--color-cream-light)_1px,transparent_1px)] [background-size:12px_12px] opacity-[0.06]" />
      <div className="absolute bottom-16 left-8 h-24 w-32 [background-image:radial-gradient(var(--color-cream-light)_1px,transparent_1px)] [background-size:12px_12px] opacity-[0.06]" />

      {/* Soft dune bands. */}
      <svg
        className="absolute inset-x-0 bottom-0 h-2/3 w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 380 C 320 300, 560 440, 820 400 C 1080 360, 1280 300, 1440 340 L1440 600 L0 600 Z"
          fill="var(--color-bg-warm)"
          opacity="0.28"
        />
        <path
          d="M0 470 C 300 410, 620 520, 900 480 C 1140 448, 1300 420, 1440 450 L1440 600 L0 600 Z"
          fill="var(--color-signal-ember)"
          opacity="0.06"
        />
      </svg>
    </div>
  );
}
