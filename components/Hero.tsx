import Link from "next/link";
import { HotkeyBadge } from "@/components/HotkeyBadge";

export function Hero() {
  return (
    <section className="gradient-warm bg-grid-texture relative overflow-hidden px-6 pb-24 pt-32 sm:px-10 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 animate-pulse rounded-full bg-signal-ember/20 blur-[120px]"
        style={{ animationDuration: "1.1s" }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="flex items-center gap-2 rounded-full border border-grid-line bg-bg-mid/60 px-3 py-1 font-mono text-xs text-cream-warm">
          <HotkeyBadge keys={["⌘", "⇧", "E"]} /> · macOS
        </span>

        <h1 className="font-display text-4xl font-bold leading-tight text-cream-light sm:text-5xl md:text-6xl">
          stop guessing what to <em className="text-signal-ember not-italic">fix</em> next
        </h1>

        <p className="max-w-xl text-balance text-base text-cream-warm sm:text-lg">
          Extra AI looks at your site and your code at the same time — then writes the
          exact prompt your next fix needs. Works with Cursor, Windsurf, Claude Code, or
          whatever you&apos;re using today.
        </p>

        <Link
          href="#pricing"
          className="clip-corner flex min-h-11 items-center gap-2 bg-signal-ember px-6 py-3 font-display text-sm font-bold text-bg-void transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Download Extra AI <HotkeyBadge keys={["⌘", "⇧", "E"]} />
        </Link>

        <span className="font-mono text-xs text-cream-warm/80">macOS · free to start</span>
      </div>
    </section>
  );
}
