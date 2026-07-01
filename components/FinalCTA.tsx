import Link from "next/link";
import { HotkeyBadge } from "@/components/HotkeyBadge";
import { FadeInSection } from "@/components/FadeInSection";

export function FinalCTA() {
  return (
    <FadeInSection className="gradient-warm bg-grid-texture mx-6 flex flex-col items-center gap-6 px-6 py-24 text-center sm:mx-10 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/⌘⇧e</p>
      <h2 className="max-w-xl font-display text-3xl font-bold text-cream-light sm:text-4xl">
        stop starting from <em className="italic text-cream-light">zero</em> on every
        prompt.
      </h2>
      <p className="text-cream-warm">one hotkey. one look at your screen. one exact prompt.</p>

      <Link
        href="#pricing"
        className="clip-corner flex min-h-11 items-center gap-2 bg-signal-ember px-6 py-3 font-display text-sm font-bold text-bg-void transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ember"
      >
        Download Extra AI <HotkeyBadge keys={["⌘", "⇧", "E"]} />
      </Link>

      <span className="font-mono text-xs text-cream-warm/80">
        macOS · free to start · 30 second install
      </span>
    </FadeInSection>
  );
}
