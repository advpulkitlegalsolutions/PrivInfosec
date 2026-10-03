import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { H3 } from "@/components/ui/typography";
import { problemSection } from "@/data/problems";
import { Icon } from "@/lib/icons";

export function ProblemSection() {
  return (
    <Section aria-labelledby="problem-heading">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow="The challenge" title={problemSection.heading} id="problem-heading" className="lg:sticky lg:top-28" />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {problemSection.problems.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80}>
              <Card className="h-full p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <Icon name={p.icon} className="size-6 text-accent-text" />
                  <span className="font-mono text-caption text-muted-foreground">0{i + 1}</span>
                </div>
                <H3 className="mt-8 text-h4">{p.title}</H3>
                <p className="mt-3 text-small leading-relaxed text-muted-foreground">{p.description}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
