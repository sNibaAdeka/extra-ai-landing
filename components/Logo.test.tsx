import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo, LogoMark } from "./Logo";

describe("Logo", () => {
  it("renders the wordmark", () => {
    render(<Logo />);
    expect(screen.getByText("extra.")).toBeInTheDocument();
  });

  it("renders the mark as a standalone svg", () => {
    const { container } = render(<LogoMark className="h-6 w-6" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
