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

        <nav className="flex items-center gap-4 sm:gap-6">
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
          <a
            href="https://www.producthunt.com/products/extra-ai?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-extra-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Extra AI on Product Hunt"
            className="hidden items-center gap-2 rounded-md border border-grid-line px-3 py-2 font-mono text-[11px] text-cream-warm transition-colors hover:border-[#da552f]/60 hover:text-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember sm:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[#da552f]"
              fill="currentColor"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.4 13.6H10.4V17H8V7h5.4a3.3 3.3 0 0 1 0 6.6zm0-4.4H10.4v2.2h3a1.1 1.1 0 0 0 0-2.2z" />
            </svg>
            <span className="leading-tight">
              We&apos;re on <span className="font-bold text-cream-light">Product Hunt</span>
            </span>
          </a>
          <Link
            href="/download"
            className="clip-corner border border-grid-line px-4 py-2 font-display text-xs font-bold text-cream-light transition-colors hover:border-signal-ember/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}
