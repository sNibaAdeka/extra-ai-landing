import { FadeInSection } from "@/components/FadeInSection";

const annotations = [
  { id: 1, label: "spacing inconsistent — 13px where the rest of the page uses an 8px scale", top: "22%", left: "18%" },
  { id: 2, label: "contrast 3.8:1 — fails WCAG AA for body text", top: "48%", left: "62%" },
  { id: 3, label: "no mobile breakpoint below 768px", top: "76%", left: "34%" },
];

export function GroundingShowcase() {
  return (
    <FadeInSection className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/why</p>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-cream-light sm:text-4xl">
        it doesn&apos;t just read your prompt.{" "}
        <em className="italic text-cream-light">it sees your site.</em>
      </h2>
      <p className="mt-2 max-w-xl text-cream-warm">
        most AI tools guess from code alone. Extra AI looks at what you&apos;re actually
        looking at.
      </p>

      <div className="clip-corner relative mt-12 aspect-video w-full border border-grid-line bg-bg-mid">
        {annotations.map((a) => (
          <span
            key={a.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
            style={{ top: a.top, left: a.left }}
          >
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              <span
                aria-hidden
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-ember/50 motion-reduce:hidden"
                style={{ animationDelay: `${a.id * 0.4}s`, animationDuration: "2.4s" }}
              />
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-signal-ember font-mono text-xs font-bold text-bg-void">
                {a.id}
              </span>
            </span>
            <span className="max-w-[220px] rounded-md border border-grid-line bg-bg-void/90 px-2 py-1 font-mono text-xs text-cream-light">
              {a.label}
            </span>
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-cream-warm">
        grounded in your real screenshot and your real code — not a generic guess.
      </p>
    </FadeInSection>
  );
}
