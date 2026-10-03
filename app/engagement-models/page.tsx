import { CTASection } from "@/components/marketing/cta-section";
import { EngagementModelsSection } from "@/components/marketing/engagement-models-section";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingGrid } from "@/components/marketing/pricing-section";
import { VirtualDpoFeature } from "@/components/marketing/virtual-dpo-feature";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { engagementModels } from "@/data/engagementModels";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Engagement Models",
  description:
    "Retainer, Fractional / Virtual, Project-Based and Remote / Hybrid engagement models for privacy, information security, governance and risk support.",
  path: "/engagement-models",
});

const comparison = [
  { label: "Best when", values: ["Needs recur month to month", "You need senior capability without a full-time hire", "Scope and outcome are well defined", "Teams are distributed or requirements vary"] },
  { label: "Commercial basis", values: ["Monthly retainer", "Monthly retainer with defined hours", "Fixed scope and fee", "Applies to any model"] },
  { label: "Typical duration", values: ["Ongoing", "Ongoing or interim", "Weeks to months", "As agreed"] },
];

export default function EngagementModelsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Engagement Models", path: "/engagement-models" }]}
        eyebrow="Engagement models"
        title="Flexible Support. Built Around Your Requirements."
        description="Choose the level of support that fits your organisation today — and adjust it as your programme matures."
      />
      <EngagementModelsSection tone="default" />

      <Section tone="muted" aria-labelledby="compare-heading">
        <SectionHeader eyebrow="Compare" id="compare-heading" title="Which model fits?" />
        <div role="region" aria-label="Engagement model comparison" tabIndex={0} className="mt-10 overflow-x-auto rounded-lg border border-card-border bg-card">
          <table className="w-full min-w-[720px] border-collapse text-left text-small">
            <caption className="sr-only">Comparison of engagement models</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="p-4 font-medium text-muted-foreground sm:p-5">
                  <span className="sr-only">Attribute</span>
                </th>
                {engagementModels.map((m) => (
                  <th key={m.id} scope="col" className="p-4 font-heading text-body font-semibold text-foreground sm:p-5">
                    {m.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <th scope="row" className="p-4 align-top font-medium text-foreground sm:p-5">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-4 align-top text-muted-foreground sm:p-5">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <VirtualDpoFeature />

      <Section aria-labelledby="pricing-heading">
        <SectionHeader eyebrow="Indicative pricing" id="pricing-heading" title="Starting points" description="Every engagement is confirmed in a written proposal." />
        <div className="mt-12">
          <PricingGrid compact />
        </div>
      </Section>
      <CTASection />
    </>
  );
}
