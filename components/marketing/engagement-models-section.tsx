import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { engagementModels, engagementSection } from "@/data/engagementModels";
import { Icon } from "@/lib/icons";

export function EngagementModelsSection({
  showUseCases = true,
  tone = "muted",
  headingAs = "h2",
}: {
  showUseCases?: boolean;
  tone?: "default" | "muted";
  headingAs?: "h1" | "h2";
}) {
  return (
    <Section tone={tone} aria-labelledby="engagement-heading" id="engagement-models">
      <SectionHeader
        eyebrow="Engagement models"
        id="engagement-heading"
        as={headingAs}
        title={engagementSection.heading}
        description={engagementSection.description}
      />
      <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {engagementModels.map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 80}>
            <Card id={m.id} className="group flex h-full scroll-mt-28 flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-md border border-border bg-surface-3 text-muted-foreground transition-colors duration-300 group-hover:border-border-accent group-hover:text-accent-text">
                  <Icon name={m.icon} className="size-5" />
                </span>
                <span className="font-medium tabular-nums text-caption text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-7 font-heading text-h4 font-semibold text-foreground">{m.title}</h3>
              <p className="mt-3 text-small leading-relaxed text-muted-foreground">{m.description}</p>
              {showUseCases && (
                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {m.useCases.map((u) => (
                    <li key={u} className="flex items-start gap-3 text-small text-subtle-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {u}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
