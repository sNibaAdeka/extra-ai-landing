"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type GlowColor = "extra" | "orange" | "purple" | "blue";
type GlowSize = "sm" | "md" | "lg";

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  extra: { base: 18, spread: 42 },
  orange: { base: 24, spread: 30 },
  purple: { base: 275, spread: 42 },
  blue: { base: 220, spread: 36 },
};

const sizeMap: Record<GlowSize, string> = {
  sm: "h-64 w-48",
  md: "h-80 w-64",
  lg: "h-96 w-80",
};

type GlowCardStyle = CSSProperties & {
  "--base": number;
  "--spread": number;
  "--x"?: string;
  "--xp"?: string;
  "--y"?: string;
  "--yp"?: string;
  "--radius": string;
  "--border": string;
  "--backdrop": string;
  "--backup-border": string;
  "--size": string;
  "--border-size": string;
  "--spotlight-size": string;
};

export function GlowCard({
  children,
  className,
  glowColor = "extra",
  size = "md",
  width,
  height,
  customSize = false,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  size?: GlowSize;
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = glowColorMap[glowColor];

  useEffect(() => {
    const syncFromViewportPoint = (x: number, y: number) => {
      if (!cardRef.current) return;

      cardRef.current.style.setProperty("--x", x.toFixed(2));
      cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
      cardRef.current.style.setProperty("--y", y.toFixed(2));
      cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
    };

    const syncInitialGlow = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      syncFromViewportPoint(rect.left + rect.width * 0.62, rect.top + rect.height * 0.3);
    };

    const syncPointer = (event: PointerEvent) => {
      syncFromViewportPoint(event.clientX, event.clientY);
    };

    syncInitialGlow();
    window.addEventListener("resize", syncInitialGlow);
    window.addEventListener("scroll", syncInitialGlow, { passive: true });
    document.addEventListener("pointermove", syncPointer);
    return () => {
      window.removeEventListener("resize", syncInitialGlow);
      window.removeEventListener("scroll", syncInitialGlow);
      document.removeEventListener("pointermove", syncPointer);
    };
  }, []);

  const style: GlowCardStyle = {
    "--base": base,
    "--spread": spread,
    "--radius": "8",
    "--border": "1.4",
    "--backdrop": "rgba(23, 13, 18, 0.58)",
    "--backup-border": "rgba(245, 228, 204, 0.12)",
    "--size": "260",
    "--border-size": "calc(var(--border) * 1px)",
    "--spotlight-size": "calc(var(--size) * 1px)",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      ref={cardRef}
      data-extra-glow
      style={style}
      className={cn(
        "relative overflow-hidden rounded-lg border backdrop-blur-[5px]",
        customSize ? "" : sizeMap[size],
        className
      )}
    >
      <div aria-hidden data-extra-glow-inner />
      {children}
    </div>
  );
}
