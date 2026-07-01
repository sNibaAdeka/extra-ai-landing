import { FadeInSection } from "@/components/FadeInSection";

export function MemorySection() {
  return (
    <FadeInSection className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/memory</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        it <em className="text-signal-ember not-italic">remembers</em> your project.
      </h2>
      <p className="mt-2 text-cream-warm">
        switch between Cursor today and Windsurf tomorrow — Extra AI still knows what you
        already tried.
      </p>

      <div className="clip-corner mt-10 flex flex-col gap-4 border border-grid-line bg-bg-mid p-6 font-mono text-sm">
        <p className="text-cream-warm">
          <span className="text-cream-light/60">Monday, in Cursor:</span> &quot;fix the
          header spacing&quot;
          <br />
          <span className="text-signal-ember">→ Extra AI:</span> adjusted .header padding
          to match your 8px scale
        </p>
        <p className="text-cream-warm">
          <span className="text-cream-light/60">Wednesday, in Windsurf:</span> &quot;the
          header still looks off&quot;
          <br />
          <span className="text-signal-ember">→ Extra AI:</span> &quot;You already
          adjusted spacing on Monday — this looks like a different issue: the logo image
          itself is misaligned, not the padding.&quot;
        </p>
      </div>

      <p className="mt-4 text-sm text-cream-warm">
        context that survives switching tools. something no single AI coding assistant
        does today.
      </p>
    </FadeInSection>
  );
}
