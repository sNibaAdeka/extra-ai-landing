import { CtaButton } from "@/components/CtaButton";
import { StoryPanel } from "@/components/StoryPanel";

export function FinalCTA() {
  return (
    <StoryPanel
      eyebrow="~/⌘⇧e"
      title={
        <>
          stop starting from <em className="story-accent">zero</em> on every prompt.
        </>
      }
      description="one hotkey. one look at your screen. one exact prompt."
      bodyClassName="flex flex-col items-center gap-6"
    >
      <div className="flex h-16 items-center gap-1" aria-hidden>
        {Array.from({ length: 19 }, (_, i) => (
          <span
            key={i}
            className="extra-glow-filter story-wave-bar w-1.5 rounded-full bg-signal-ember"
            style={{
              height: `${18 + Math.sin(i * 0.8) * 10 + (i % 5) * 4}px`,
              animationDelay: `${i * 0.045}s`,
            }}
          />
        ))}
      </div>
      <CtaButton label="Download Extra AI" size="lg" />

      <span className="font-mono text-xs text-cream-warm/80">
        macOS · free to start · 30 second install
      </span>
    </StoryPanel>
  );
}
