import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the exact headline with emphasis on 'fix'", () => {
    render(<Hero />);
    expect(screen.getByText(/stop guessing what to/i)).toBeInTheDocument();
    expect(screen.getByText("fix")).toBeInTheDocument();
    expect(screen.getByText(/next$/i)).toBeInTheDocument();
  });

  it("renders the exact subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Extra AI looks at your site and your code at the same time/i
      )
    ).toBeInTheDocument();
  });

  it("renders the CTA button with hotkey badge", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /download extra ai/i })).toBeInTheDocument();
  });

  it("renders the macOS badge and free-to-start note", () => {
    render(<Hero />);
    expect(screen.getByText("macOS · free to start")).toBeInTheDocument();
  });
});
