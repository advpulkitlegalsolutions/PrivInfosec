import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { virtualDpo } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Virtual / Fractional DPO conversion block — sits within DPO & Privacy
 * Services (not a fifth service). Ink band in both themes.
 */
export function VirtualDpoFeature({ id, headingLevel = "h2" }: { id?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Section tone="ink" grid id={id} aria-labelledby="vdpo-heading" className="overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Eyebrow>{virtualDpo.eyebrow}</Eyebrow>
          <Heading id="vdpo-heading" className="mt-5 font-heading text-h2 leading-snug font-semibold tracking-tight text-foreground">
            {virtualDpo.headline}
          </Heading>
          <Lead className="mt-5">{virtualDpo.description}</Lead>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={virtualDpo.primaryCta.href} size="lg">
              {virtualDpo.primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={virtualDpo.secondaryCta.href} size="lg" variant="outline">
              {virtualDpo.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-xl border border-border-accent bg-surface-1/70 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">How support is provided</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {virtualDpo.examples.map((ex, i) => (
                <li
                  key={ex}
                  className={cn(
                    "flex items-center gap-3 rounded-md border border-border bg-background/60 px-4 py-3.5 text-small font-medium text-foreground",
                    i === 0 && "border-border-accent",
                  )}
                >
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", i === 0 ? "bg-accent" : "bg-border-strong")} />
                  {ex}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-caption text-muted-foreground">Working alongside</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {virtualDpo.stakeholders.map((s) => (
                  <li key={s} className="rounded-pill border border-border px-3 py-1 text-caption text-subtle-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
