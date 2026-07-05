import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlowSteps } from "./FlowSteps";

describe("FlowSteps", () => {
  it("renders the eyebrow and title", () => {
    render(<FlowSteps />);
    expect(screen.getByText("~/the-flow")).toBeInTheDocument();
    expect(screen.getByText("ship.")).toBeInTheDocument();
  });

  it("renders all three numbered steps with their copy", () => {
    const { container } = render(<FlowSteps />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Press the hotkey")).toBeInTheDocument();
    expect(screen.getByText(/no app switching/i)).toBeInTheDocument();

    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Say what's wrong")).toBeInTheDocument();
    expect(screen.getByText(/no technical vocabulary needed/i)).toBeInTheDocument();
    expect(container.querySelector(".story-selection-demo")).toBeInTheDocument();
    expect(container.querySelector(".story-line-scan")).not.toBeInTheDocument();

    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("Get the exact prompt")).toBeInTheDocument();
    expect(screen.getByText(/copy it straight into cursor/i)).toBeInTheDocument();
    expect(container.querySelector(".story-prompt-demo")).toBeInTheDocument();
  });
});
