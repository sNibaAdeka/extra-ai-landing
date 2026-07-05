import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DownloadPage, { metadata } from "./page";

vi.mock("@/components/ui/background-paths", () => ({
  BackgroundPaths: ({
    className,
    pathClassName,
  }: {
    className?: string;
    pathClassName?: string;
  }) => (
    <div data-testid="background-paths" className={className}>
      <div className={pathClassName} />
    </div>
  ),
}));

describe("DownloadPage", () => {
  it("sets download metadata", () => {
    expect(metadata.title).toBe("Download Extra AI — macOS and Windows");
  });

  it("renders platform choices and switches the CTA", () => {
    render(<DownloadPage />);

    expect(screen.getByRole("heading", { name: /pick your platform/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /macos/i }));
    expect(screen.getByRole("link", { name: /download for macos/i })).toHaveAttribute(
      "href",
      "/downloads/ExtraAI-1.0.0-universal.dmg"
    );

    // Windows is not built yet — selecting it must NOT offer a dead link,
    // it shows an honest coming-soon state instead.
    fireEvent.click(screen.getByRole("button", { name: /windows/i }));

    expect(
      screen.queryByRole("link", { name: /download for windows/i })
    ).not.toBeInTheDocument();
    expect(screen.getByText(/windows build coming soon/i)).toBeInTheDocument();
  });
});
