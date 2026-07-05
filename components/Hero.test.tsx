import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the PixelHero brand headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: /extra ai\./i })).toBeInTheDocument();
  });

  it("renders the short adapted subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Turn rough website feedback into precise, code-aware prompts/i
      )
    ).toBeInTheDocument();
  });

  it("renders real CTA links", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /download extra ai/i })).toHaveAttribute(
      "href",
      "/download"
    );
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute(
      "href",
      "#the-flow"
    );
  });

  it("renders the honest stack marquee label", () => {
    render(<Hero />);
    expect(screen.getByText("Works with your existing stack")).toBeInTheDocument();
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
  });

  it("renders a decorative canvas background", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
