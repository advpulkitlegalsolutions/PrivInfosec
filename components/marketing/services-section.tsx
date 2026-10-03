import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/data/services";
import { ServiceCard } from "./service-card";

export function ServicesSection({ showAllLink = true }: { showAllLink?: boolean }) {
  return (
    <Section tone="muted" aria-labelledby="services-heading" id="services">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader
          eyebrow="Services"
          id="services-heading"
          title="Expertise Across Privacy, Security & Compliance"
          description="From virtual DPO support and privacy implementation to information-security governance, compliance frameworks and risk reviews, PrivInfosec works as an extension of internal teams."
        />
        {showAllLink && (
          <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
            View all services
          </ButtonLink>
        )}
      </div>
      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal as="li" key={s.id} delay={(i % 2) * 100}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
