import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the wordmark and nav links", () => {
    render(<Header />);
    expect(screen.getByText("extra.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq");
    expect(screen.getByRole("link", { name: "Download" })).toHaveAttribute("href", "/download");
  });
});
