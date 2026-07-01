import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HotkeyBadge } from "./HotkeyBadge";

describe("HotkeyBadge", () => {
  it("renders one keycap per key", () => {
    render(<HotkeyBadge keys={["⌘", "⇧", "E"]} />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("⇧")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
  });
});
