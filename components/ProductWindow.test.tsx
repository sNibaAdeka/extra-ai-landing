import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductWindow } from "./ProductWindow";

describe("ProductWindow", () => {
  it("renders the window title and both panels", () => {
    render(<ProductWindow />);
    expect(screen.getByText("extra — analysis")).toBeInTheDocument();
    expect(screen.getByText("captured region")).toBeInTheDocument();
    expect(screen.getByText("generated prompt")).toBeInTheDocument();
  });

  it("shows the grounded fix content", () => {
    render(<ProductWindow />);
    expect(screen.getByText(/padding 13px → 16px/)).toBeInTheDocument();
  });
});
