import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FooterScene } from "@/components/FooterScene";
import { Logo } from "@/components/Logo";

const links = [
  { label: "Pricing", href: "#pricing" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "GitHub", href: "https://github.com/sNibaAdeka/", external: true },
  { label: "Contact", href: "#contact" },
];

const footerLinkClassName =
  "font-mono text-xs text-cream-warm hover:text-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ember";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,1fr)] lg:items-center lg:py-24"
    >
      <div className="space-y-8">
        <Logo markClassName="h-10 w-10" wordmarkClassName="text-2xl sm:text-3xl" />

        <div className="max-w-xl space-y-4">
          <p className="font-display text-3xl font-bold leading-tight text-cream-light sm:text-4xl">
            See the bug. Say it plainly. Ship the fix.
          </p>
          <p className="max-w-lg text-sm leading-6 text-cream-warm/78">
            Extra AI turns messy visual feedback into the next exact prompt your coding tool
            needs.
          </p>
        </div>

        <address className="grid gap-3 not-italic text-sm text-cream-warm/88">
          <a
            href="mailto:adyoka.sars@gmail.com"
            className="group inline-flex w-fit items-center gap-3 font-mono transition hover:text-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
          >
            <Mail className="size-4 text-signal-ember transition group-hover:scale-110" />
            adyoka.sars@gmail.com
          </a>
          <a
            href="tel:+77051242342"
            className="group inline-flex w-fit items-center gap-3 font-mono transition hover:text-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
          >
            <Phone className="size-4 text-signal-ember transition group-hover:scale-110" />
            +7 705 124 23 42
          </a>
        </address>

        <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLinkClassName}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={footerLinkClassName}>
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          <span className="font-mono text-xs text-cream-warm/70">© 2026 Extra AI</span>
        </div>
      </div>

      <FooterScene />
    </footer>
  );
}
