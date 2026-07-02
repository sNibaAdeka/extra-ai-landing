import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline words with 'fix' emphasized", () => {
    render(<Hero />);
    expect(screen.getByText("stop")).toBeInTheDocument();
    expect(screen.getByText("guessing")).toBeInTheDocument();
    expect(screen.getByText("fix")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });

  it("renders the exact subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Extra AI looks at your site and your code at the same time/i
      )
    ).toBeInTheDocument();
  });

  it("renders the CTA button linking to pricing", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /download extra ai/i });
    expect(cta).toHaveAttribute("href", "#pricing");
  });

  it("renders the macOS free-to-start note", () => {
    render(<Hero />);
    expect(screen.getByText("macOS · free to start")).toBeInTheDocument();
  });

  it("renders the product window mock", () => {
    render(<Hero />);
    expect(screen.getByText("extra — analysis")).toBeInTheDocument();
  });
});
