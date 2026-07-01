import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FadeInSection } from "./FadeInSection";

describe("FadeInSection", () => {
  it("renders its children", () => {
    render(
      <FadeInSection>
        <p>hello world</p>
      </FadeInSection>
    );
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});
