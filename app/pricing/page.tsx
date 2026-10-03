import { CTASection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingGrid } from "@/components/marketing/pricing-section";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { pricingFaqs, pricingSection } from "@/data/pricing";
import { faqSchema, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Indicative pricing for advisory, Fractional Privacy Support retainers, implementation programmes and enterprise managed support.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        eyebrow={pricingSection.eyebrow}
        title={pricingSection.heading}
        description={pricingSection.description}
      />
      <Section aria-label="Pricing options">
        <PricingGrid />
      </Section>
      <Section tone="muted" aria-labelledby="pricing-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" id="pricing-faq-heading" title="Commercial questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion>
              {pricingFaqs.map((f) => (
                <AccordionItem key={f.question} title={f.question}>
                  {f.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <JsonLd data={faqSchema(pricingFaqs)} />
      </Section>
      <CTASection title="Not sure which option fits?" description="Tell us about your requirement and we will recommend a proportionate approach." />
    </>
  );
}
