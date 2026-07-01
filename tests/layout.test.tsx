import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Space_Grotesk: () => ({ variable: "--font-space-grotesk" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains-mono" }),
}));

const { default: RootLayout, metadata } = await import("@/app/layout");

describe("RootLayout", () => {
  it("sets the exact page title from the spec", () => {
    expect(metadata.title).toBe("Extra AI — stop guessing what to fix next");
  });

  it("renders a body element with the font-body class", () => {
    const tree = RootLayout({ children: <div data-testid="child">content</div> });
    const [, body] = tree.props.children;
    expect(body.type).toBe("body");
    expect(body.props.className).toContain("font-body");
  });
});
