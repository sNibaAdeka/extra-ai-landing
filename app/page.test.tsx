import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renders every section's eyebrow in the correct order", () => {
    render(<Page />);
    const eyebrows = [
      "~/the-flow",
      "~/why",
      "~/signals",
      "~/memory",
      "~/security",
      "~/pricing",
      "~/faq",
      "~/⌘⇧e",
    ];
    for (let i = 0; i < eyebrows.length - 1; i++) {
      const a = screen.getByText(eyebrows[i]);
      const b = screen.getByText(eyebrows[i + 1]);
      expect(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("renders the hero headline and the footer copyright", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { name: /extra ai\./i })).toBeInTheDocument();
    expect(screen.getByText("© 2026 Extra AI")).toBeInTheDocument();
  });
});
