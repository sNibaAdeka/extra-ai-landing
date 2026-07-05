import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadingIntro } from "./LoadingIntro";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

describe("LoadingIntro", () => {
  beforeEach(() => {
    navigation.pathname = "/";
    window.sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    window.sessionStorage.clear();
  });

  it("plays once on the home page and then removes itself", () => {
    const { container } = render(<LoadingIntro />);

    expect(screen.getByRole("status", { name: "Loading Extra AI" })).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(container.querySelector(".extra-loader-brand-mark")).toBeInTheDocument();
    expect(container.querySelector(".extra-loader-word")).toHaveTextContent("extra.");
    expect(window.sessionStorage.getItem("extra-intro-played")).toBe("true");

    act(() => vi.advanceTimersByTime(1880));
    expect(screen.getByRole("status", { name: "Loading Extra AI" })).toHaveAttribute(
      "data-state",
      "closing"
    );

    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole("status", { name: "Loading Extra AI" })).not.toBeInTheDocument();
  });

  it("does not play on the download page", () => {
    navigation.pathname = "/download";

    render(<LoadingIntro />);

    expect(screen.queryByRole("status", { name: "Loading Extra AI" })).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem("extra-intro-played")).toBeNull();
  });

  it("does not replay after the session has seen it", () => {
    window.sessionStorage.setItem("extra-intro-played", "true");

    render(<LoadingIntro />);

    expect(screen.queryByRole("status", { name: "Loading Extra AI" })).not.toBeInTheDocument();
  });
});
