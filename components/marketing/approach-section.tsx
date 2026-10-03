import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { approachSection } from "@/data/problems";

/** Assess · Design · Implement · Support — a connected four-stage timeline. */
export function ApproachSection({ eyebrow = "How we work" }: { eyebrow?: string }) {
  return (
    <Section aria-labelledby="approach-heading">
      <SectionHeader eyebrow={eyebrow} id="approach-heading" title={approachSection.heading} description={approachSection.description} />
      <div className="relative mt-16">
      <div aria-hidden="true" className="absolute top-[22px] right-0 left-0 hidden h-px bg-linear-to-r from-border-accent via-border to-transparent lg:block" />
      <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {approachSection.stages.map((stage, i) => (
          <Reveal as="li" key={stage.title} delay={i * 120} className="relative">
            <div className="flex items-center gap-4">
              <span className="relative z-10 flex size-11 items-center justify-center rounded-pill border border-border-accent bg-background font-medium tabular-nums text-small text-accent-text">
                {stage.number}
              </span>
              <span className="h-px flex-1 bg-border lg:hidden" aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-heading text-h3 font-semibold tracking-snug text-foreground">{stage.title}</h3>
            <p className="mt-2 text-small font-medium text-subtle-foreground">{stage.lead}:</p>
            <ul className="mt-4 space-y-2">
              {stage.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-small text-muted-foreground">
                  <span aria-hidden="true" className="h-px w-3 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
      </div>
    </Section>
  );
}
