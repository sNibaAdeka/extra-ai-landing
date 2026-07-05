import { StoryPanel } from "@/components/StoryPanel";

const annotations = [
  { id: 1, label: "this button has uneven spacing", top: "22%", left: "18%" },
  { id: 2, label: "this text is hard to read", top: "48%", left: "62%" },
  { id: 3, label: "this layout needs a mobile version", top: "76%", left: "34%" },
];

export function GroundingShowcase() {
  return (
    <StoryPanel
      eyebrow="~/why"
      title={
        <>
          show the problem. <em className="story-accent">get the fix.</em>
        </>
      }
      description="Point at what feels wrong. Extra AI connects the screen to the exact code that needs attention."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="story-demo-tile relative aspect-video overflow-hidden rounded-lg p-5">
          <div className="mb-4 flex gap-2">
            <span className="size-2.5 rounded-full bg-signal-ember" />
            <span className="size-2.5 rounded-full bg-cream-warm" />
            <span className="size-2.5 rounded-full bg-bg-violet" />
          </div>
          <div className="grid h-[78%] grid-cols-3 gap-3">
            <div className="col-span-2 space-y-3">
              <div className="relative h-16 rounded-md border border-signal-ember/70 bg-signal-ember/8">
                <Pin id={1} className="-right-3 -top-3" />
              </div>
              <div className="h-3 w-4/5 rounded-full bg-cream-light/8" />
              <div className="h-3 w-2/3 rounded-full bg-cream-light/7" />
              <div className="relative h-20 rounded-md border border-signal-ember/55 bg-signal-ember/6">
                <Pin id={2} className="-right-3 -top-3" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-md bg-cream-light/8" />
              <div className="relative h-28 rounded-md border border-signal-ember/60 bg-signal-ember/6">
                <Pin id={3} className="-right-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="h-3 w-4/5 rounded-full bg-cream-light/7" />
            </div>
          </div>
        </div>

        <ol className="space-y-4">
          {annotations.map((a) => (
            <li key={a.id} className="flex items-start gap-3">
              <span className="extra-glow-icon mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-signal-ember/50 bg-signal-ember/18 font-mono text-xs font-bold">
                {a.id}
              </span>
              <p className="rounded-md border border-cream-light/10 bg-bg-void/55 px-4 py-3 font-mono text-sm leading-6 text-cream-warm">
                {a.label}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-center text-sm text-cream-warm">
        grounded in your real screenshot and real code, so the prompt stays specific.
      </p>
    </StoryPanel>
  );
}

function Pin({ id, className }: { id: number; className?: string }) {
  return (
    <span className={`absolute flex size-7 items-center justify-center ${className ?? ""}`}>
      <span
        aria-hidden
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-ember/45 motion-reduce:hidden"
        style={{ animationDelay: `${id * 0.35}s`, animationDuration: "2.4s" }}
      />
      <span className="extra-glow-filter relative flex size-7 items-center justify-center rounded-full bg-signal-ember font-mono text-xs font-bold text-bg-void">
        {id}
      </span>
    </span>
  );
}
