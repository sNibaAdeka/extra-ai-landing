"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/Logo";

export function LoadingIntro() {
  const pathname = usePathname();
  const [state, setState] = useState<"hidden" | "open" | "closing">("hidden");

  useEffect(() => {
    if (pathname !== "/" || window.sessionStorage.getItem("extra-intro-played") === "true") {
      setState("hidden");
      return;
    }

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const showFor = reduceMotion ? 220 : 1880;
    const exitFor = reduceMotion ? 120 : 300;

    window.sessionStorage.setItem("extra-intro-played", "true");
    setState("open");

    const closeTimer = window.setTimeout(() => setState("closing"), showFor);
    const removeTimer = window.setTimeout(() => setState("hidden"), showFor + exitFor);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [pathname]);

  if (state === "hidden") {
    return null;
  }

  return (
    <div
      className="extra-loading-intro"
      data-state={state}
      role="status"
      aria-label="Loading Extra AI"
    >
      <div className="extra-loader-shell" aria-hidden="true">
        <div className="extra-loader-morph">
          <div className="extra-loader-brand-mark">
            <LogoMark className="extra-loader-brand-svg" />
            <span className="extra-loader-logo-scan" />
          </div>

          <span className="extra-loader-drop" />

          <span className="extra-loader-word">
            <span>extra.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
