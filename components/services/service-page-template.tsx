import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CTASection } from "@/components/marketing/cta-section";
import { FrameworkCard } from "@/components/marketing/framework-badge";
import { IndustryCard } from "@/components/marketing/industry-card";
import { InsightsPreview } from "@/components/marketing/insights-preview";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { VirtualDpoFeature } from "@/components/marketing/virtual-dpo-feature";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ctas } from "@/config/site";
import { engagementModels } from "@/data/engagementModels";
import { frameworks } from "@/data/frameworks";
import { getIndustryById } from "@/data/industries";
import { serviceHref, services, virtualDpo, type Service } from "@/data/services";
import { Icon } from "@/lib/icons";
import { faqSchema, serviceSchema } from "@/lib/seo";

/** Matches service engagement labels ("Fractional", "Fractional / Virtual") to data. */
const matchEngagement = (label: string) =>
  engagementModels.find((m) => m.label === label || m.title === label || m.label.startsWith(label));

/**
 * One template for every service page. All content comes from
 * data/services.ts (+ frameworks, industries, engagement models, insights).
 *
 * Sections: breadcrumb · eyebrow · number · title · proposition ·
 * key capabilities · capability groups · frameworks · challenges ·
 * how we help · engagement models · industries · related insights · FAQ · CTA
 */
export function ServicePageTemplate({ service }: { service: Service }) {
  const path = serviceHref(service);
  const relevantFrameworks = frameworks.filter((f) => f.serviceIds.includes(service.id));
  const relevantIndustries = service.industries.map(getIndustryById).filter((i) => i !== undefined);
  const models = (service.engagementModels ?? []).map(matchEngagement).filter((m) => m !== undefined);
  const otherServices = services.filter((s) => s.id !== service.id);
  const hasVirtualDpo = virtualDpo.parentServiceId === service.id;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]}
        number={service.number}
        eyebrow="Service practice"
        title={service.title}
        description={service.headline}
        actions={
          <>
            <ButtonLink href={`/contact?service=${service.id}`} size="lg">
              {ctas.primary.label}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#capabilities" size="lg" variant="outline">
              View capabilities
            </ButtonLink>
          </>
        }
        aside={
          <Card className="p-6 sm:p-7">
            <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">Key capabilities</p>
            <ul className="mt-5 grid gap-2.5">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-small text-subtle-foreground">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" strokeWidth={2} />
                  {h}
                </li>
              ))}
            </ul>
          </Card>
        }
      />

      {/* Introductory proposition — a plain-language definition. */}
      <Section spacing="md" aria-labelledby="overview-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Overview" id="overview-heading" title="What this practice covers" />
          </div>
          <div className="space-y-5 lg:col-span-8">
            <p className="text-lead leading-relaxed text-foreground">{service.intro}</p>
            <p className="text-body leading-relaxed text-muted-foreground">{service.description}</p>
          </div>
        </div>
      </Section>

      {/* Capability groups */}
      <Section tone="muted" id="capabilities" aria-labelledby="capabilities-heading">
        <SectionHeader
          eyebrow="Capabilities"
          id="capabilities-heading"
          title="What we support"
          description={service.shortDescription}
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.groups.map((g, i) => (
            <Reveal as="li" key={g.title} delay={(i % 3) * 80}>
              <Card className="h-full p-6 sm:p-7">
                <p className="font-mono text-caption text-accent-text">
                  {service.number}.{i + 1}
                </p>
                <h3 className="mt-4 font-heading text-h4 font-semibold text-foreground">{g.title}</h3>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-small text-subtle-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {hasVirtualDpo && <VirtualDpoFeature id={virtualDpo.anchor} />}

      {/* Frameworks */}
      {relevantFrameworks.length > 0 && (
        <Section aria-labelledby="frameworks-heading">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Relevant frameworks"
                id="frameworks-heading"
                title="Laws and standards we support"
                description="We provide readiness, implementation and advisory support. Certification and attestation are issued by independent, accredited bodies."
              />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {relevantFrameworks.map((f) => (
                <li key={f.id}>
                  <FrameworkCard framework={f} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Challenges + how we help */}
      <Section tone={relevantFrameworks.length ? "muted" : "default"} aria-labelledby="challenges-heading">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Typical challenges" id="challenges-heading" title="Where organisations usually start" />
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {service.challenges.map((c, i) => (
                <li key={c} className="flex gap-5 py-5">
                  <span className="font-mono text-caption text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-body text-subtle-foreground">{c}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="How PrivInfosec helps" title="Assess · Design · Implement · Support" as="h2" />
            <ol className="mt-10 space-y-4">
              {service.howWeHelp.map((h, i) => (
                <li key={h.stage}>
                  <Card className="flex gap-5 p-6">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-pill border border-border-accent font-mono text-caption text-accent-text">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-h4 font-semibold text-foreground">{h.stage}</h3>
                      <p className="mt-2 text-small leading-relaxed text-muted-foreground">{h.description}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Engagement models */}
      {models.length > 0 && (
        <Section aria-labelledby="models-heading">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader eyebrow="Engagement models" id="models-heading" title="How this service can be delivered" />
            <Link href="/engagement-models" className="inline-flex items-center gap-2 text-small font-semibold text-foreground hover:text-accent-text">
              Compare engagement models <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((m) => (
              <li key={m.id}>
                <Card className="h-full p-6">
                  <Icon name={m.icon} className="size-5 text-accent-text" />
                  <h3 className="mt-5 font-heading text-body font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-small text-muted-foreground">{m.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Industries */}
      {relevantIndustries.length > 0 && (
        <Section tone="muted" aria-labelledby="industries-heading">
          <SectionHeader eyebrow="Relevant industries" id="industries-heading" title="Where this service is often needed" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relevantIndustries.map((ind) => (
              <li key={ind.id}>
                <IndustryCard industry={ind} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <InsightsPreview tags={service.insightTags} title="Related insights" description={`Guidance related to ${service.title}.`} />

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <Section tone="muted" aria-labelledby="faq-heading">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="FAQ" id="faq-heading" title="Frequently asked questions" />
            </div>
            <div className="lg:col-span-8">
              <Accordion>
                {service.faqs.map((f) => (
                  <AccordionItem key={f.question} title={f.question}>
                    {f.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <JsonLd data={faqSchema(service.faqs)} />
        </Section>
      )}

      {/* Other services */}
      <Section aria-labelledby="other-services-heading" spacing="sm">
        <h2 id="other-services-heading" className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">
          Other practices
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {otherServices.map((s) => (
            <li key={s.id}>
              <ServiceCard service={s} variant="compact" />
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        title={`Discuss your ${service.shortTitle.toLowerCase()} requirements`}
        primary={{ label: ctas.primary.label, href: `/contact?service=${service.id}` }}
      />

      <JsonLd
        data={serviceSchema({ name: service.title, description: service.description, path, serviceTypes: service.capabilities })}
      />
    </>
  );
}
