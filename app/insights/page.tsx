import { InsightsBrowser } from "@/components/content/insights-browser";
import { CTASection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/ui/section";
import { getAllInsights } from "@/lib/content/insights";
import { insightCategories } from "@/lib/content/schema";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Practical guidance, checklists and regulatory explainers on privacy, information security, governance and risk — including DPDP, GDPR, ISO 27001, ISO 27701 and SOC 2.",
  path: "/insights",
});

export default function InsightsPage() {
  // Strip article bodies before passing to the client component.
  const summaries = getAllInsights().map((insight) => {
    const { body, ...rest } = insight;
    void body;
    return rest;
  });
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Knowledge hub"
        title="Insights"
        description="Practical guidance on privacy, information security, governance and risk — written for the people who have to make it work."
      />
      <Section aria-label="Articles">
        {summaries.length ? (
          <InsightsBrowser insights={summaries} categories={insightCategories} />
        ) : (
          <p className="text-muted-foreground">New insights are being prepared. Please check back soon.</p>
        )}
      </Section>
      <CTASection />
    </>
  );
}
