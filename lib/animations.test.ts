import { describe, it, expect } from "vitest";
import { animations } from "./animations";

describe("animations", () => {
  it("matches the global spring token", () => {
    expect(animations.spring).toEqual({ type: "spring", stiffness: 280, damping: 22 });
  });

  it("matches the global easeOut curve", () => {
    expect(animations.easeOut).toEqual([0.22, 1, 0.36, 1]);
  });

  it("defines stagger40 and stagger80 as second offsets", () => {
    expect(animations.stagger40).toBe(0.04);
    expect(animations.stagger80).toBe(0.08);
  });

  it("defines micro, transition, and complex durations in seconds", () => {
    expect(animations.durations.micro).toBe(0.18);
    expect(animations.durations.transition).toBe(0.3);
    expect(animations.durations.complex).toBe(0.5);
  });
});
