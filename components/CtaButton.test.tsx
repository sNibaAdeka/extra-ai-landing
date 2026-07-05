import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaButton } from "./CtaButton";

describe("CtaButton", () => {
  it("renders the label as a link to the given href", () => {
    render(<CtaButton href="#pricing" label="Download Extra AI" />);
    const link = screen.getByRole("link", { name: /download extra ai/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#pricing");
  });

  it("groups the ⌘⇧E keycaps into one chip", () => {
    render(<CtaButton label="Download Extra AI" />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("⇧")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
  });

  it("defaults its href to the download page", () => {
    render(<CtaButton label="Get it" />);
    expect(screen.getByRole("link", { name: /get it/i })).toHaveAttribute("href", "/download");
  });
});
