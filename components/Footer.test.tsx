import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the nav links and copyright", () => {
    const { container } = render(<Footer />);
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/sNibaAdeka/"
    );
    expect(screen.getByText(/see the bug/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "adyoka.sars@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:adyoka.sars@gmail.com"
    );
    expect(screen.getByRole("link", { name: "+7 705 124 23 42" })).toHaveAttribute(
      "href",
      "tel:+77051242342"
    );
    expect(screen.getByText("© 2026 Extra AI")).toBeInTheDocument();
    expect(container.querySelector("[data-footer-scene]")).toBeInTheDocument();
  });
});
