import { ApproachSection } from "@/components/marketing/approach-section";
import { CTASection } from "@/components/marketing/cta-section";
import { EngagementModelsSection } from "@/components/marketing/engagement-models-section";
import { FrameworksSection } from "@/components/marketing/frameworks-section";
import { Hero } from "@/components/marketing/hero";
import { IndustriesSection } from "@/components/marketing/industries-section";
import { InsightsPreview } from "@/components/marketing/insights-preview";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { PricingPreview } from "@/components/marketing/pricing-section";
import { ProblemSection } from "@/components/marketing/problem-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { VirtualDpoFeature } from "@/components/marketing/virtual-dpo-feature";
import { WhySection } from "@/components/marketing/why-section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "PrivInfosec Consulting | Privacy, Information Security & Compliance Advisory",
  absoluteTitle: true,
  description:
    "Your Trusted Arm for privacy, security and compliance. Virtual DPO, privacy implementation, information-security governance, compliance and risk advisory for growing and regulated businesses.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <ProblemSection />
      <ServicesSection />
      <ApproachSection />
      <VirtualDpoFeature />
      <WhySection />
      <EngagementModelsSection showUseCases={false} />
      <FrameworksSection />
      <IndustriesSection limit={6} />
      <TestimonialsSection />
      <PricingPreview />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
