import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Terms — Extra AI",
  description: "Basic terms for using Extra AI.",
};

const sections = [
  {
    title: "Using Extra AI",
    body: "Extra AI helps turn screenshots and code context into practical prompts for coding tools. You are responsible for reviewing any generated prompt before applying changes.",
  },
  {
    title: "Downloads",
    body: "Only download Extra AI from our official site or links we provide. macOS support comes first, with Windows support planned next.",
  },
  {
    title: "Plans and pricing",
    body: "Free usage may include monthly limits. Paid plans may change over time, but we will show the current pricing before charging for access.",
  },
  {
    title: "Acceptable use",
    body: "Do not use Extra AI to attack systems, steal data, bypass access controls, or submit code or screenshots you do not have permission to analyze.",
  },
  {
    title: "No guarantee",
    body: "Extra AI is provided as-is. It can make mistakes, so verify generated suggestions, especially before changing production systems.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to adyoka.sars@gmail.com.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg-void bg-grid-texture text-cream-light">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10 lg:py-12">
        <nav className="flex items-center justify-between gap-6">
          <Link href="/" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember">
            <Logo markClassName="h-9 w-9" wordmarkClassName="text-2xl" />
          </Link>
          <div className="flex items-center gap-5 font-mono text-xs text-cream-warm">
            <Link href="/privacy" className="transition hover:text-cream-light">
              Privacy
            </Link>
            <Link href="/download" className="clip-corner border border-grid-line px-4 py-2 font-display font-bold text-cream-light transition hover:border-signal-ember/50">
              Download
            </Link>
          </div>
        </nav>

        <article className="relative mt-14 border-t border-grid-line/70 py-12">
          <div className="max-w-3xl">
            <p className="story-eyebrow font-mono text-sm text-cream-warm">~/terms</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-none text-cream-light sm:text-6xl">
              Terms of Use
            </h1>
            <p className="mt-4 text-sm text-cream-warm/72">Last updated July 3, 2026</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-cream-warm/84">
              These terms are a simple baseline for using Extra AI. By using the product, you
              agree to use it responsibly and verify the output before shipping changes.
            </p>
          </div>

          <div className="mt-10 grid gap-0">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-cream-light/10 py-5">
                <h2 className="font-display text-xl font-bold text-cream-light">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-cream-warm/82">{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
