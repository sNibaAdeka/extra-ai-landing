import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HeroTextMatrix } from "./HeroTextMatrix";

describe("HeroTextMatrix", () => {
  it("renders as a decorative, non-interactive background layer", () => {
    const { container } = render(<HeroTextMatrix />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(root.className).toContain("pointer-events-none");
  });
});
