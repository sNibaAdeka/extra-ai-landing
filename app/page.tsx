import { Hero } from "@/components/Hero";
import { FlowSteps } from "@/components/FlowSteps";
import { GroundingShowcase } from "@/components/GroundingShowcase";
import { MemorySection } from "@/components/MemorySection";
import { SecuritySection } from "@/components/SecuritySection";
import { PricingCards } from "@/components/PricingCards";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <FlowSteps />
      <GroundingShowcase />
      <MemorySection />
      <SecuritySection />
      <PricingCards />
      <FAQAccordion />
      <FinalCTA />
      <Footer />
    </main>
  );
}
