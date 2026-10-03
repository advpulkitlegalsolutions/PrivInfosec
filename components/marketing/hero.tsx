import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { ctas, siteConfig } from "@/config/site";
import { engagementModels } from "@/data/engagementModels";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section
      data-theme="dark"
      data-band="ink"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-background bg-ambient-gold text-foreground"
    >
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 -z-10" />
      <Container size="wide" className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24 xl:py-28">
        <div className="lg:col-span-7">
          <Eyebrow>Privacy · Information Security · Governance</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 max-w-[16ch] font-display text-display leading-display font-semibold tracking-display text-foreground"
          >
            Your <span className="text-metal font-bold">Trusted Arm</span> for Privacy, Security &amp; Compliance.
          </h1>
          <Lead className="mt-7 max-w-[var(--layout-measure)] text-muted-foreground">
            {siteConfig.name} provides practical advisory and implementation support to businesses navigating data
            privacy, cybersecurity, technology and compliance risk.
          </Lead>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctas.primary.href} size="lg">
              {ctas.primary.label}
              <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              Explore Our Services
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-small font-medium text-muted-foreground" aria-label="Engagement models">
            {engagementModels.map((m, i) => (
              <li key={m.id} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-accent" />}
                {m.label === "Fractional / Virtual" ? "Fractional" : m.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:col-span-5 lg:max-w-none">
          <HeroVisual className="h-auto w-full" />
        </div>
      </Container>
      <div className="rule-gold" aria-hidden="true" />
    </section>
  );
}
