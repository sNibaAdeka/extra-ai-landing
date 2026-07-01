import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingCards } from "./PricingCards";

describe("PricingCards", () => {
  it("renders eyebrow and title", () => {
    render(<PricingCards />);
    expect(screen.getByText("~/pricing")).toBeInTheDocument();
  });

  it("renders all three tiers with prices", () => {
    render(<PricingCards />);
    expect(screen.getByText("FREE")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("PRO")).toBeInTheDocument();
    expect(screen.getByText("$9/mo")).toBeInTheDocument();
    expect(screen.getByText("STUDIO")).toBeInTheDocument();
    expect(screen.getByText("$29/mo")).toBeInTheDocument();
  });

  it("marks only Pro as Most popular", () => {
    render(<PricingCards />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getAllByText("Most popular")).toHaveLength(1);
  });

  it("renders each tier's CTA", () => {
    render(<PricingCards />);
    expect(screen.getByRole("link", { name: /download — free/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start pro/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start studio/i })).toBeInTheDocument();
  });

  it("renders the fine print", () => {
    render(<PricingCards />);
    expect(screen.getByText(/cancel anytime · no credit card for free/i)).toBeInTheDocument();
  });
});
