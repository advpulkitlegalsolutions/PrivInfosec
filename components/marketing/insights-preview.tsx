import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { getAllInsights, getRelatedInsights } from "@/lib/content/insights";
import { InsightCard } from "./insight-card";

export function InsightsPreview({
  title = "Insights",
  description = "Practical guidance on privacy, information security, governance and risk.",
  tags,
  tone = "default",
}: {
  title?: string;
  description?: string;
  /** When provided, shows related insights only. */
  tags?: string[];
  tone?: "default" | "muted";
}) {
  const items = tags ? getRelatedInsights(tags, 3) : getAllInsights().slice(0, 3);
  if (!items.length) return null;
  return (
    <Section tone={tone} aria-labelledby="insights-heading">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader eyebrow="Knowledge hub" id="insights-heading" title={title} description={description} />
        <ButtonLink href="/insights" variant="outline" className="self-start lg:self-auto">
          All insights
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((i) => (
          <li key={i.slug}>
            <InsightCard insight={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
