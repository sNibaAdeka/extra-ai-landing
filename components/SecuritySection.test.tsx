import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SecuritySection } from "./SecuritySection";

describe("SecuritySection", () => {
  it("renders eyebrow and title", () => {
    render(<SecuritySection />);
    expect(screen.getByText("~/security")).toBeInTheDocument();
    expect(screen.getByText("never")).toBeInTheDocument();
  });

  it("renders all three bullets", () => {
    render(<SecuritySection />);
    expect(screen.getByText(/Local secret redaction/)).toBeInTheDocument();
    expect(screen.getByText(/Prompt injection defense/)).toBeInTheDocument();
    expect(screen.getByText(/No backend server/)).toBeInTheDocument();
  });

  it("renders the monospace caption", () => {
    render(<SecuritySection />);
    expect(
      screen.getByText(/only the current request context is sent for analysis/i)
    ).toBeInTheDocument();
  });
});
