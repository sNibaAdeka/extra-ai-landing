import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordion } from "./FAQAccordion";

describe("FAQAccordion", () => {
  it("renders eyebrow and all five questions", () => {
    render(<FAQAccordion />);
    expect(screen.getByText("~/faq")).toBeInTheDocument();
    expect(screen.getByText("Which platforms does Extra AI run on?")).toBeInTheDocument();
    expect(
      screen.getByText("Does Extra AI work with tools other than Cursor?")
    ).toBeInTheDocument();
    expect(screen.getByText("Where does my code go?")).toBeInTheDocument();
    expect(
      screen.getByText("What's the difference between Free and Pro?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Can I use this without an active Cursor/Windsurf subscription?")
    ).toBeInTheDocument();
  });

  it("reveals an answer when its question is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion />);
    expect(screen.queryByText(/macOS 13\+/)).not.toBeInTheDocument();

    await user.click(screen.getByText("Which platforms does Extra AI run on?"));

    expect(await screen.findByText(/macOS 13\+/)).toBeInTheDocument();
  });
});
