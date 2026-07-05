import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Privacy — Extra AI",
  description: "Basic privacy information for Extra AI.",
};

const sections = [
  {
    title: "What Extra AI handles",
    body: "Extra AI may process the screenshot, selected page context, and relevant code you choose to analyze. We also receive contact details when you email us directly.",
  },
  {
    title: "How we use it",
    body: "We use this information to generate a practical fix prompt, improve reliability, respond to support requests, and keep the product safe.",
  },
  {
    title: "AI processing",
    body: "When you run an analysis, the current screenshot and code context may be sent to an AI provider for that request. Extra AI is designed to redact obvious secrets locally before sending context.",
  },
  {
    title: "Storage",
    body: "The landing page does not collect payment information. Product memory, if enabled, is used to keep project context useful across tools and can be cleared by contacting us.",
  },
  {
    title: "Sharing",
    body: "We do not sell personal information. We share data only with service providers needed to operate Extra AI, comply with law, or protect the service.",
  },
  {
    title: "Contact",
    body: "For privacy questions or removal requests, contact adyoka.sars@gmail.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-void bg-grid-texture text-cream-light">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10 lg:py-12">
        <nav className="flex items-center justify-between gap-6">
          <Link href="/" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember">
            <Logo markClassName="h-9 w-9" wordmarkClassName="text-2xl" />
          </Link>
          <div className="flex items-center gap-5 font-mono text-xs text-cream-warm">
            <Link href="/terms" className="transition hover:text-cream-light">
              Terms
            </Link>
            <Link href="/download" className="clip-corner border border-grid-line px-4 py-2 font-display font-bold text-cream-light transition hover:border-signal-ember/50">
              Download
            </Link>
          </div>
        </nav>

        <article className="relative mt-14 border-t border-grid-line/70 py-12">
          <div className="max-w-3xl">
            <p className="story-eyebrow font-mono text-sm text-cream-warm">~/privacy</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-none text-cream-light sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-cream-warm/72">Last updated July 3, 2026</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-cream-warm/84">
              This is a plain-language privacy page for Extra AI. It explains the basics of
              what the product may process and how to reach us.
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
