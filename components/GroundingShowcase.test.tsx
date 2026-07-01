import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GroundingShowcase } from "./GroundingShowcase";

describe("GroundingShowcase", () => {
  it("renders eyebrow, title, and subtitle", () => {
    render(<GroundingShowcase />);
    expect(screen.getByText("~/why")).toBeInTheDocument();
    expect(screen.getByText("it sees your site.")).toBeInTheDocument();
  });

  it("renders all three numbered annotations", () => {
    render(<GroundingShowcase />);
    expect(screen.getByText(/spacing inconsistent/i)).toBeInTheDocument();
    expect(screen.getByText(/contrast 3\.8:1/i)).toBeInTheDocument();
    expect(screen.getByText(/no mobile breakpoint below 768px/i)).toBeInTheDocument();
  });

  it("renders the grounding caption", () => {
    render(<GroundingShowcase />);
    expect(
      screen.getByText(/grounded in your real screenshot and your real code/i)
    ).toBeInTheDocument();
  });
});
