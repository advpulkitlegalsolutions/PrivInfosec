import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { industries } from "@/data/industries";
import { IndustryCard } from "./industry-card";

export function IndustriesSection({ limit, tone = "muted" }: { limit?: number; tone?: "default" | "muted" }) {
  const items = limit ? industries.slice(0, limit) : industries;
  return (
    <Section tone={tone} aria-labelledby="industries-heading">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader
          eyebrow="Industries"
          id="industries-heading"
          title="Support shaped around how your sector uses data"
          description="Privacy, security and governance questions look different in a bank, a SaaS platform and a research agency. We start from the risks that matter in your context."
        />
        <ButtonLink href="/industries" variant="outline" className="self-start lg:self-auto">
          All industries
        </ButtonLink>
      </div>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((ind, i) => (
          <Reveal as="li" key={ind.id} delay={(i % 3) * 80}>
            <IndustryCard industry={ind} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
