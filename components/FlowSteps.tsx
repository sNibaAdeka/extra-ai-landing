import { FadeInSection } from "@/components/FadeInSection";

const steps = [
  {
    number: "01",
    title: "Press the hotkey",
    body: "Anywhere on your Mac. The overlay appears instantly, no app switching.",
  },
  {
    number: "02",
    title: "Say what's wrong",
    body: `Plain words — "the button looks off on mobile." No technical vocabulary needed.`,
  },
  {
    number: "03",
    title: "Get the exact prompt",
    body: "Grounded in your actual screenshot and code — copy it straight into Cursor, Windsurf, or Claude Code.",
  },
];

export function FlowSteps() {
  return (
    <FadeInSection className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/the-flow</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        point · describe · <em className="italic text-cream-light">ship.</em>
      </h2>
      <p className="mt-2 text-cream-warm">three steps. any AI coding tool you already use.</p>

      <ol className="mt-12 flex flex-col gap-10 sm:gap-12">
        {steps.map((step) => (
          <li key={step.number} className="flex items-start gap-6">
            <span className="font-display text-4xl font-bold text-signal-ember sm:text-5xl">
              {step.number}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-cream-light">
                {step.title}
              </h3>
              <p className="mt-1 text-cream-warm">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </FadeInSection>
  );
}
