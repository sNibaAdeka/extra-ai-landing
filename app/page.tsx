import { Header } from "@/components/Header";
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { FlowSteps } from "@/components/FlowSteps";
import { GroundingShowcase } from "@/components/GroundingShowcase";
import { SignalStackSection } from "@/components/SignalStackSection";
import { MemorySection } from "@/components/MemorySection";
import { SecuritySection } from "@/components/SecuritySection";
import { PricingCards } from "@/components/PricingCards";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header />
      <main>
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
        <FlowSteps />
        <GroundingShowcase />
        <SignalStackSection />
        <MemorySection />
        <SecuritySection />
        <PricingCards />
        <FAQAccordion />
        <FinalCTA />
        <Footer />
      </main>
      <div className="noise-overlay" aria-hidden />
    </>
  );
}
