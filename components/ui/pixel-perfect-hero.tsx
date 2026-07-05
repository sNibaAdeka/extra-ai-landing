"use client";

import { useEffect, useRef, type MouseEventHandler } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

type PixelHeroProps = {
  word1: string;
  word2: string;
  description: string;
  primaryCta: string;
  primaryCtaMobile?: string;
  secondaryCta: string;
  secondaryCtaMobile?: string;
  primaryHref?: string;
  secondaryHref?: string;
  onPrimaryClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onSecondaryClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  stackLabel?: string;
  technologies?: string[];
  className?: string;
};

type Pixel = {
  x: number;
  y: number;
  size: number;
  distance: number;
  phase: number;
  accent: boolean;
  color: [number, number, number];
};

const DEFAULT_TECHNOLOGIES = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Next.js",
  "GitHub",
  "Cursor",
  "Claude Code",
  "Windsurf",
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PixelHero({
  word1,
  word2,
  description,
  primaryCta,
  primaryCtaMobile,
  secondaryCta,
  secondaryCtaMobile,
  primaryHref = "#pricing",
  secondaryHref = "#the-flow",
  onPrimaryClick,
  onSecondaryClick,
  stackLabel = "Works with your existing stack",
  technologies = DEFAULT_TECHNOLOGIES,
  className,
}: PixelHeroProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      className={cn(
        "pixel-hero-shell gradient-warm relative isolate flex min-h-[100dvh] overflow-hidden px-4 pb-10 pt-24 text-cream-light sm:px-8 sm:pt-28 md:pb-12",
        className
      )}
    >
      <HeroBackdrop />
      <PixelCanvas reducedMotion={reduceMotion} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_115%_90%_at_50%_43%,transparent_0%,transparent_45%,rgba(23,13,18,0.86)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-void via-bg-void/70 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <motion.div
          className="flex w-full flex-1 flex-col items-center justify-center gap-5 py-8 sm:gap-6 md:py-10"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <motion.div
            aria-hidden
            className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28 md:h-32 md:w-32"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.72, ease: easeOut }}
          >
            <span className="absolute inset-0 rounded-[2rem] border border-cream-light/10 bg-bg-void/20 shadow-[0_24px_90px_rgba(255,107,53,0.14)] backdrop-blur-md" />
            <LogoMark className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />
          </motion.div>

          <motion.h1
            aria-label={`${word1} ${word2}`}
            className="pixel-hero-glass-heading mx-auto inline-flex max-w-full flex-wrap items-baseline justify-center gap-x-3 gap-y-0 px-5 py-3 text-5xl leading-none text-cream-light sm:gap-x-4 sm:px-7 sm:py-4 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[9.5rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.78, ease: easeOut }}
          >
            <span className="relative z-10 font-serif italic font-medium">{word1}</span>
            <span className="relative z-10 font-display font-bold">{word2}</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-balance text-base leading-7 text-cream-warm sm:text-lg md:text-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.62, ease: easeOut }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-2 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6, ease: easeOut }}
          >
            <HeroAction
              href={primaryHref}
              onClick={onPrimaryClick}
              label={primaryCta}
              mobileLabel={primaryCtaMobile}
              variant="primary"
            />
            <HeroAction
              href={secondaryHref}
              onClick={onSecondaryClick}
              label={secondaryCta}
              mobileLabel={secondaryCtaMobile}
              variant="secondary"
            />
          </motion.div>

          <motion.div
            className="mt-4 w-full md:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55, ease: easeOut }}
          >
            <LogoMarquee items={technologies} compact />
          </motion.div>

          <motion.div
            className="mt-8 hidden w-full md:block"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.55, ease: easeOut }}
          >
            <p className="mb-4 font-mono text-xs uppercase text-cream-warm/75">{stackLabel}</p>
            <LogoMarquee items={technologies} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroAction({
  href,
  onClick,
  label,
  mobileLabel,
  variant,
}: {
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  label: string;
  mobileLabel?: string;
  variant: "primary" | "secondary";
}) {
  const className = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 font-display text-sm font-bold transition duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember",
    variant === "primary"
      ? "clip-corner bg-signal-ember text-bg-void shadow-[0_18px_70px_rgba(255,107,53,0.32)] hover:bg-[#ff7b4b]"
      : "border border-cream-light/14 bg-cream-light/[0.055] text-cream-light backdrop-blur-md hover:border-cream-light/24 hover:bg-cream-light/[0.085]"
  );

  const content = (
    <>
      <span className={cn(mobileLabel && "hidden sm:inline")}>{label}</span>
      {mobileLabel ? <span className="sm:hidden">{mobileLabel}</span> : null}
      {variant === "primary" ? (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : (
        <Code2 className="size-4 text-cream-warm" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={className} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}

function PixelCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const boundsRef = useRef({ width: 1, height: 1 });
  const lastFrameRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent || typeof window === "undefined") {
      return;
    }

    let context: CanvasRenderingContext2D | null = null;
    try {
      context = canvas.getContext("2d");
    } catch {
      context = null;
    }

    if (!context) {
      return;
    }

    const ctx = context;
    const palette = getPixelPalette();

    const buildPixels = () => {
      const rect = parent.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width || window.innerWidth || 1));
      const height = Math.max(1, Math.round(rect.height || window.innerHeight || 1));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const gap = width < 640 ? 18 : width < 1024 ? 22 : 26;
      const pixelSize = width < 640 ? 2 : 3;
      const centerX = width / 2;
      const centerY = height * 0.42;
      const pixels: Pixel[] = [];

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      boundsRef.current = { width, height };

      for (let y = -gap; y <= height + gap; y += gap) {
        for (let x = -gap; x <= width + gap; x += gap) {
          const hash = hashPoint(x, y);
          const jitterX = (hash - 0.5) * gap * 0.38;
          const jitterY = (hashPoint(y, x) - 0.5) * gap * 0.38;
          const px = x + jitterX;
          const py = y + jitterY;
          const dx = px - centerX;
          const dy = py - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const accent = hashPoint(x * 7, y * 13) > 0.88;
          const colorIndex = accent ? 2 + Math.floor(hashPoint(x * 3, y * 5) * 2) : Math.floor(hash * 2);

          pixels.push({
            x: px,
            y: py,
            size: accent ? pixelSize + 1 : pixelSize,
            distance,
            phase: hash * Math.PI * 2,
            accent,
            color: palette[colorIndex] ?? palette[0],
          });
        }
      }

      pixelsRef.current = pixels;
    };

    const paint = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }
      if (!lastFrameRef.current) {
        lastFrameRef.current = time;
      }

      const elapsed = time - startTimeRef.current;
      const { width, height } = boundsRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const pixel of pixelsRef.current) {
        const reveal = reducedMotion
          ? 1
          : clamp((elapsed - pixel.distance * 4.8) / 900, 0, 1);
        const wave = reducedMotion
          ? 1
          : 0.5 + 0.5 * Math.sin(elapsed * 0.0015 - pixel.distance * 0.026 + pixel.phase);
        const alpha = reveal * (pixel.accent ? 0.12 + wave * 0.16 : 0.025 + wave * 0.075);

        if (alpha < 0.01) {
          continue;
        }

        ctx.fillStyle = rgba(pixel.color, alpha);
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
      }

      lastFrameRef.current = time;
    };

    const tick = (time: number) => {
      paint(time);
      if (!reducedMotion) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      if (!reducedMotion) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const restart = () => {
      buildPixels();
      startTimeRef.current = performance.now();
      lastFrameRef.current = startTimeRef.current;
      paint(startTimeRef.current);
      startLoop();
    };

    restart();

    const ResizeObserverConstructor = (
      window as Window & typeof globalThis & { ResizeObserver?: typeof ResizeObserver }
    ).ResizeObserver;

    if (typeof ResizeObserverConstructor === "function") {
      observerRef.current = new ResizeObserverConstructor(restart);
      observerRef.current.observe(parent);
    } else {
      window.addEventListener("resize", restart, { passive: true });
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      observerRef.current?.disconnect();
      window.removeEventListener("resize", restart);
      frameRef.current = null;
      observerRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="hero-matrix-mask pointer-events-none absolute inset-0 z-0 opacity-90"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function LogoMarquee({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        compact ? "max-w-[92vw]" : "max-w-4xl"
      )}
    >
      <div
        className={cn(
          "pixel-hero-marquee-track flex w-max items-center",
          compact ? "gap-3" : "gap-4"
        )}
      >
        {[0, 1].map((loop) => (
          <div
            key={loop}
            aria-hidden={loop === 1}
            className={cn("flex items-center", compact ? "gap-3 pr-3" : "gap-4 pr-4")}
          >
            {items.map((item) => (
              <span
                key={`${loop}-${item}`}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-md border border-cream-light/10 bg-bg-void/35 text-cream-warm shadow-[0_10px_36px_rgba(0,0,0,0.16)] backdrop-blur-md transition-colors hover:border-cream-light/20 hover:text-cream-light",
                  compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
                )}
              >
                <TechLogo label={item} className={compact ? "size-4" : "size-5"} />
                <span className="font-mono">{item}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechLogo({ label, className }: { label: string; className?: string }) {
  const normalized = label.toLowerCase();

  if (normalized.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <circle cx="12" cy="12" r="1.9" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (normalized.includes("typescript")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 9h8M11 9v8M15 16c.7.7 2.8 1.1 2.8-.4 0-1.8-2.9-1.1-2.9-3 0-1.4 2.2-1.5 3-.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M4 12.4c2.2-4.2 5.3-4.2 7.5 0 1.1 2.1 2.8 2.1 5.1 0 .8-1.6 2-2.7 3.4-3.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16.7c2.2-4.2 5.3-4.2 7.5 0 1.1 2.1 2.8 2.1 5.1 0 .8-1.6 2-2.7 3.4-3.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
    );
  }

  if (normalized.includes("next")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 16V8l8 8V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M7 7.2h6.2a4 4 0 0 1 4 4v5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="6.5" cy="7.2" r="2.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.2" cy="17.2" r="2.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 7.2l6.5 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("claude")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M12 4l7.3 4.2v7.6L12 20l-7.3-4.2V8.2L12 4Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.6 13.2h6.8M10.2 9.5h3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("cursor")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M6 4l12 8-5.8 1.1L9 19 6 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M8 6l-4 6 4 6M16 6l4 6-4 6M13.5 5.5l-3 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getPixelPalette(): [number, number, number][] {
  const lightMode = typeof document !== "undefined" && document.documentElement.classList.contains("light");

  if (lightMode) {
    return [
      [61, 32, 21],
      [107, 54, 32],
      [255, 107, 53],
      [124, 58, 237],
    ];
  }

  return [
    [245, 228, 204],
    [232, 185, 138],
    [255, 107, 53],
    [168, 85, 247],
  ];
}

function hashPoint(x: number, y: number) {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function rgba([r, g, b]: [number, number, number], alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
