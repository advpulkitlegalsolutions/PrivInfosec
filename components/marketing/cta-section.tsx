import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { ctas } from "@/config/site";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing call to action, placed before the footer. */
export function CTASection({
  eyebrow = "Let’s work together",
  title = "Complex Requirements. Clear Next Steps.",
  description = "Tell us what you’re trying to solve. We’ll help you determine the right privacy, security, governance or risk approach.",
  primary = ctas.primary,
  secondary = ctas.contact,
}: CTAProps) {
  return (
    <Section tone="ink" grid aria-labelledby="cta-heading" spacing="lg" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="cta-heading" className="mt-6 font-heading text-h1 leading-tight font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <Lead className="mt-6 max-w-2xl">{description}</Lead>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={primary.href} size="lg">
            {primary.label}
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={secondary.href} size="lg" variant="outline">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
