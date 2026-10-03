import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { differentiators } from "@/data/differentiators";
import { Icon } from "@/lib/icons";

export function WhySection() {
  return (
    <Section aria-labelledby="why-heading">
      <SectionHeader
        eyebrow="Why PrivInfosec"
        id="why-heading"
        title="Why PrivInfosec Consulting?"
        description="A coordinated advisory model for organisations that need privacy, security and compliance to work together — in practice, not just on paper."
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((d, i) => (
          <Reveal as="li" key={d.title} delay={i * 80} className="group bg-background p-7 sm:p-8">
            <Icon name={d.icon} className="size-6 text-muted-foreground transition-colors duration-300 group-hover:text-accent-text" />
            <h3 className="mt-8 font-heading text-h4 font-semibold text-foreground">{d.title}</h3>
            <p className="mt-3 text-small leading-relaxed text-muted-foreground">{d.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
