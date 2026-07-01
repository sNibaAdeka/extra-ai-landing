import Link from "next/link";

const links = [
  { label: "Pricing", href: "#pricing" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-16 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
      <span className="font-display text-sm font-bold text-cream-light">extra.</span>
      <nav className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono text-xs text-cream-warm hover:text-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ember"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="font-mono text-xs text-cream-warm/80">© 2026 Extra AI</span>
    </footer>
  );
}
