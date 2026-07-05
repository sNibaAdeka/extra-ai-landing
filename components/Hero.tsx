import { PixelHero } from "@/components/ui/pixel-perfect-hero";

export function Hero() {
  return (
    <PixelHero
      word1="Extra"
      word2="AI."
      description="Turn rough website feedback into precise, code-aware prompts grounded in your real screen and code."
      primaryCta="Download Extra AI"
      primaryCtaMobile="Download"
      secondaryCta="See How It Works"
      secondaryCtaMobile="How It Works"
      primaryHref="/download"
      secondaryHref="#the-flow"
    />
  );
}
