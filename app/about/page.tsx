import { ApproachSection } from "@/components/marketing/approach-section";
import { CTASection } from "@/components/marketing/cta-section";
import { LeaderProfile, visibleTeam } from "@/components/marketing/leadership";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { StatCard } from "@/components/marketing/stat-card";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/config/site";
import { verifiedStats } from "@/data/companyStats";
import { differentiators } from "@/data/differentiators";
import { services } from "@/data/services";
import { leadershipSection } from "@/data/team";
import { beliefs, values } from "@/data/values";
import { Icon } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "PrivInfosec Consulting is a multidisciplinary privacy, information-security, governance and risk advisory firm helping organisations translate complex requirements into practical operating programmes.",
  path: "/about",
});

export default function AboutPage() {
  const stats = verifiedStats();
  const leaders = visibleTeam();
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About PrivInfosec"
        title="Good compliance should enable business — not obstruct it."
        description={`${siteConfig.name} is a multidisciplinary privacy, information-security, governance and risk advisory firm helping organisations translate complex requirements into practical operating programmes.`}
      />

      {/* Who we are */}
      <Section aria-labelledby="who-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Who we are" id="who-heading" title={siteConfig.tagline} />
          </div>
          <div className="space-y-5 text-body leading-relaxed text-muted-foreground lg:col-span-7">
            <p className="text-lead text-foreground">
              We work alongside leadership, legal, technology and operational teams as a trusted extension of the organisation — bringing
              privacy, information security, governance and risk expertise together under one coordinated advisory model.
            </p>
            <p>
              Our focus is execution. Requirements from laws such as India’s Digital Personal Data Protection Act and the EU GDPR, and
              standards such as ISO/IEC 27001, ISO/IEC 27701 and SOC 2, only reduce risk when they become processes, controls, systems and
              evidence that teams actually use. That is where we spend our time.
            </p>
            <p>
              We support organisations through retainer, fractional, project-based and remote or hybrid engagements, sized to what each
              organisation genuinely needs.
            </p>
          </div>
        </div>
        {stats.length > 0 && (
          <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        )}
      </Section>

      {/* What we believe */}
      <Section tone="ink" grid aria-labelledby="believe-heading">
        <SectionHeader eyebrow="What we believe" id="believe-heading" title="Principles behind every engagement" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {beliefs.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 100}>
              <div className="h-full border-t border-border-accent pt-6">
                <h3 className="font-heading text-h4 leading-snug font-semibold text-foreground">{b.title}</h3>
                <p className="mt-3 text-small leading-relaxed text-muted-foreground">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* How we work */}
      <ApproachSection eyebrow="How we work" />

      {/* Our expertise */}
      <Section tone="muted" aria-labelledby="expertise-heading">
        <SectionHeader
          eyebrow="Our expertise"
          id="expertise-heading"
          title="Four integrated practices"
          description="Privacy · Information Security · Governance · Risk"
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.id}>
              <ServiceCard service={s} variant="compact" />
            </li>
          ))}
        </ul>
      </Section>

      {/* Our approach */}
      <Section aria-labelledby="approach-pillars-heading">
        <SectionHeader eyebrow="Our approach" id="approach-pillars-heading" title="Coordinated, practical and flexible" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d) => (
            <li key={d.title} className="bg-background p-7">
              <Icon name={d.icon} className="size-6 text-accent-text" />
              <h3 className="mt-6 font-heading text-h4 font-semibold text-foreground">{d.title}</h3>
              <p className="mt-3 text-small leading-relaxed text-muted-foreground">{d.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Values */}
      <Section tone="muted" aria-labelledby="values-heading">
        <SectionHeader eyebrow="Our values" id="values-heading" title="How we conduct ourselves" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 3) * 80}>
              <Card className="flex h-full gap-5 p-6">
                <Icon name={v.icon} className="mt-0.5 size-5 shrink-0 text-accent-text" />
                <div>
                  <h3 className="font-heading text-body font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-small text-muted-foreground">{v.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Leadership */}
      {leaders.length > 0 && (
        <Section aria-labelledby="leadership-heading">
          <SectionHeader
            eyebrow={leadershipSection.eyebrow}
            id="leadership-heading"
            title={leadershipSection.heading}
            description={leadershipSection.description}
          />
          <div className="mt-12 space-y-6">
            {leaders.map((m) => (
              <LeaderProfile key={m.name} member={m} />
            ))}
          </div>
        </Section>
      )}

      <CTASection />
    </>
  );
}
