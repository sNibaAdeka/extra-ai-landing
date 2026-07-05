import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GroundingShowcase } from "./GroundingShowcase";

describe("GroundingShowcase", () => {
  it("renders eyebrow, title, and subtitle", () => {
    render(<GroundingShowcase />);
    expect(screen.getByText("~/why")).toBeInTheDocument();
    expect(screen.getByText("get the fix.")).toBeInTheDocument();
  });

  it("renders all three numbered annotations", () => {
    render(<GroundingShowcase />);
    expect(screen.getByText(/uneven spacing/i)).toBeInTheDocument();
    expect(screen.getByText(/hard to read/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile version/i)).toBeInTheDocument();
  });

  it("renders the grounding caption", () => {
    render(<GroundingShowcase />);
    expect(
      screen.getByText(/grounded in your real screenshot and real code/i)
    ).toBeInTheDocument();
  });
});
