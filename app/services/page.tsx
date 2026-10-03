import { ApproachSection } from "@/components/marketing/approach-section";
import { CTASection } from "@/components/marketing/cta-section";
import { FrameworksSection } from "@/components/marketing/frameworks-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { VirtualDpoFeature } from "@/components/marketing/virtual-dpo-feature";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Four integrated practices: DPO & Privacy Services, Information Security & IT Infrastructure, Compliance / Governance Advisory, and Risk, Audit & Training.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        eyebrow={siteConfig.positioning.join(" · ")}
        title="Expertise Across Privacy, Security & Compliance"
        description="Four integrated practices that work as an extension of your internal teams — from Virtual DPO support and privacy implementation to security governance, compliance frameworks and independent reviews."
      />
      <Section aria-label="Service practices">
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </Section>
      <VirtualDpoFeature />
      <ApproachSection />
      <FrameworksSection tone="muted" />
      <CTASection />
    </>
  );
}
