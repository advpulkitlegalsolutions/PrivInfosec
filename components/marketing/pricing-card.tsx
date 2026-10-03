import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { pricingCurrency, type PricingTier } from "@/data/pricing";
import { formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Pricing tier card. All values come from data/pricing.ts via formatPrice. */
export function PricingCard({ tier, compact = false }: { tier: PricingTier; compact?: boolean }) {
  const price = formatPrice(tier.price);
  const highlighted = Boolean(tier.highlight);

  return (
    <article
      aria-labelledby={`tier-${tier.id}`}
      className={cn(
        "relative flex h-full flex-col rounded-lg border bg-card p-7 sm:p-8",
        highlighted ? "border-border-accent-strong" : "border-card-border",
      )}
    >
      {highlighted && <span aria-hidden="true" className="absolute inset-x-7 top-0 h-px bg-accent" />}
      {highlighted && (
        <span className="absolute -top-3 left-7 rounded-pill bg-accent px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-accent-foreground">
          {tier.highlight}
        </span>
      )}
      <h3 id={`tier-${tier.id}`} className="font-heading text-h4 font-semibold text-foreground xl:min-h-[2lh]">
        {tier.name}
      </h3>
      <p className="mt-2 text-small text-muted-foreground xl:min-h-[3lh]">{tier.description}</p>

      <div className="mt-6 border-t border-border pt-6">
        {price.prefix && <p className="text-caption text-muted-foreground">{price.prefix}</p>}
        <p className={cn("mt-1 font-heading leading-tight font-semibold tracking-tight text-foreground", price.isCustom ? "text-h3" : "text-price whitespace-nowrap")}>
          {price.value}
        </p>
        {!price.isCustom && (
          <p className="mt-1 text-caption text-muted-foreground">
            {price.unit && `per ${price.unit} · `}
            {price.suffix ?? pricingCurrency.taxNote}
          </p>
        )}

        {tier.terms && (
          <dl className="mt-4 space-y-1.5 text-small">
            {tier.terms.map((t) => {
              const termPrice = t.price ? formatPrice(t.price) : null;
              return (
                <div key={t.label} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t.label}</dt>
                  <dd className="text-right font-medium whitespace-nowrap text-foreground">
                    {t.text}
                    {termPrice && (
                      <>
                        {termPrice.value}
                        {termPrice.unit && ` / ${termPrice.unit}`}
                      </>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>

      {!compact && (
        <div className="mt-6">
          <p className="text-caption font-medium text-foreground">{tier.bestForLabel}</p>
          <ul className="mt-3 space-y-2">
            {tier.bestFor.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-small text-subtle-foreground">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-8">
        <ButtonLink href={tier.cta.href} variant={highlighted ? "primary" : "outline"} className="w-full">
          {tier.cta.label}
        </ButtonLink>
      </div>
    </article>
  );
}
