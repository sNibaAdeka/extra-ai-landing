"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

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
          className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
        >
          <Logo markClassName="h-7 w-7" wordmarkClassName="text-lg" />
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
