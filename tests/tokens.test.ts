import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("design tokens", () => {
  const css = readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf-8");

  it("defines every required color token with the exact spec value", () => {
    expect(css).toContain("--color-bg-void: #170D12");
    expect(css).toContain("--color-bg-mid: #3D2015");
    expect(css).toContain("--color-bg-warm: #6B3620");
    expect(css).toContain("--color-cream-light: #F5E4CC");
    expect(css).toContain("--color-cream-warm: #E8B98A");
    expect(css).toContain("--color-signal-ember: #FF6B35");
  });

  it("defines the grid texture, gradient, and clipped-corner utilities", () => {
    expect(css).toContain(".bg-grid-texture");
    expect(css).toContain(".gradient-warm");
    expect(css).toContain(".clip-corner");
  });

  it("respects prefers-reduced-motion", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
