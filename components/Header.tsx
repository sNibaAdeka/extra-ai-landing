"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function BracketMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4H5v16h3M16 4h3v16h-3"
        stroke="var(--color-cream-light)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="11" y="7" width="2" height="10" rx="1" fill="var(--color-signal-ember)" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-grid-line bg-bg-void/70 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="#top"
          className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
        >
          <BracketMark />
          <span className="font-display text-lg font-bold text-cream-light">extra.</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="#pricing"
            className="hidden font-mono text-xs text-cream-warm transition-colors hover:text-cream-light sm:block"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="hidden font-mono text-xs text-cream-warm transition-colors hover:text-cream-light sm:block"
          >
            FAQ
          </Link>
          <Link
            href="#pricing"
            className="clip-corner border border-grid-line px-4 py-2 font-display text-xs font-bold text-cream-light transition-colors hover:border-signal-ember/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}
