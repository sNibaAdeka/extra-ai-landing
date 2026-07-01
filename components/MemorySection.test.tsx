import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemorySection } from "./MemorySection";

describe("MemorySection", () => {
  it("renders eyebrow and title", () => {
    render(<MemorySection />);
    expect(screen.getByText("~/memory")).toBeInTheDocument();
    expect(screen.getByText("remembers")).toBeInTheDocument();
  });

  it("renders the Monday and Wednesday exchange", () => {
    render(<MemorySection />);
    expect(screen.getByText(/Monday, in Cursor/)).toBeInTheDocument();
    expect(screen.getByText(/fix the header spacing/)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday, in Windsurf/)).toBeInTheDocument();
    expect(screen.getByText(/the logo image itself is misaligned/)).toBeInTheDocument();
  });

  it("renders the caption", () => {
    render(<MemorySection />);
    expect(screen.getByText(/context that survives switching tools/i)).toBeInTheDocument();
  });
});
