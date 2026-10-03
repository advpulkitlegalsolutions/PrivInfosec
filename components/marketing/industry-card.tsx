import { Card } from "@/components/ui/card";
import type { Industry } from "@/data/industries";
import { Icon } from "@/lib/icons";

export function IndustryCard({ industry, showSummary = true, headingLevel = "h3" }: { industry: Industry; showSummary?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Card id={industry.id} className="flex h-full scroll-mt-28 flex-col p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <Icon name={industry.icon} className="size-5 text-accent-text" />
        <Heading className="font-heading text-h4 font-semibold text-foreground">{industry.title}</Heading>
      </div>
      {showSummary && <p className="mt-4 text-small leading-relaxed text-muted-foreground">{industry.summary}</p>}
      <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">Typical themes</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {industry.themes.map((t) => (
          <li key={t} className="rounded-pill border border-border bg-surface-2 px-2.5 py-1 text-caption text-subtle-foreground">
            {t}
          </li>
        ))}
      </ul>
    </Card>
  );
}
