import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { pricingSection, pricingTiers } from "@/data/pricing";
import { PricingCard } from "./pricing-card";

export function PricingGrid({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <ul className="grid gap-5 pt-3 md:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier) => (
          <li key={tier.id}>
            <PricingCard tier={tier} compact={compact} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-caption text-muted-foreground">{pricingSection.footnote}</p>
    </>
  );
}

/** Homepage pricing preview. */
export function PricingPreview() {
  return (
    <Section tone="muted" aria-labelledby="pricing-heading">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader eyebrow={pricingSection.eyebrow} id="pricing-heading" title={pricingSection.heading} description={pricingSection.description} />
        <ButtonLink href="/pricing" variant="outline" className="self-start lg:self-auto">
          View pricing details
        </ButtonLink>
      </div>
      <div className="mt-14">
        <PricingGrid compact />
      </div>
    </Section>
  );
}
