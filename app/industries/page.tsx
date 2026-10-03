import { CTASection } from "@/components/marketing/cta-section";
import { IndustryCard } from "@/components/marketing/industry-card";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  description:
    "Privacy, information-security and governance support for financial services, FinTech, SaaS, technology, market research, professional services, e-commerce, healthcare and scale-ups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title="Support shaped around how your sector uses data"
        description="The same regulation can mean very different things for a lender, a SaaS platform and a research agency. We start from the practical risk themes in your context."
      />
      <Section aria-label="Industries">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.id} delay={(i % 3) * 80}>
              <IndustryCard industry={ind} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-caption text-muted-foreground">
          Themes describe common risk areas we help organisations address. Sector-specific regulatory obligations vary; where specialist
          sector legal advice is required, we will say so and can work alongside your advisers.
        </p>
      </Section>
      <Section tone="muted" aria-labelledby="practices-heading">
        <SectionHeader eyebrow="Our practices" id="practices-heading" title="Four practices, applied to your sector" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.id}>
              <ServiceCard service={s} variant="compact" />
            </li>
          ))}
        </ul>
      </Section>
      <CTASection />
    </>
  );
}
