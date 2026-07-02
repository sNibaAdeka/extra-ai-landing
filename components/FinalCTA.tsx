import { FadeInSection } from "@/components/FadeInSection";
import { CtaButton } from "@/components/CtaButton";

export function FinalCTA() {
  return (
    <FadeInSection className="gradient-warm bg-grid-texture mx-6 flex flex-col items-center gap-6 px-6 py-24 text-center sm:mx-10 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/⌘⇧e</p>
      <h2 className="max-w-xl font-display text-3xl font-bold text-cream-light sm:text-4xl">
        stop starting from <em className="italic text-cream-light">zero</em> on every
        prompt.
      </h2>
      <p className="text-cream-warm">one hotkey. one look at your screen. one exact prompt.</p>

      <CtaButton label="Download Extra AI" size="lg" />

      <span className="font-mono text-xs text-cream-warm/80">
        macOS · free to start · 30 second install
      </span>
    </FadeInSection>
  );
}
