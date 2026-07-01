import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FinalCTA } from "./FinalCTA";

describe("FinalCTA", () => {
  it("renders eyebrow, title, and CTA", () => {
    render(<FinalCTA />);
    expect(screen.getByText("~/⌘⇧e")).toBeInTheDocument();
    expect(screen.getByText(/stop starting from/i)).toBeInTheDocument();
    expect(screen.getByText("zero")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download extra ai/i })).toBeInTheDocument();
    expect(screen.getByText("macOS · free to start · 30 second install")).toBeInTheDocument();
  });
});
