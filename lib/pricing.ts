import { pricingCurrency, pricingSection, SHOW_PUBLIC_PRICING, type PriceSpec } from "@/data/pricing";

const formatter = new Intl.NumberFormat(pricingCurrency.locale, {
  style: "currency",
  currency: pricingCurrency.code,
  maximumFractionDigits: 0,
});

export type FormattedPrice = {
  /** Main figure, e.g. "₹1,60,000" or "Custom engagement". */
  value: string;
  unit?: string;
  prefix?: string;
  suffix?: string;
  isCustom: boolean;
};

/** Formats a PriceSpec, honouring SHOW_PUBLIC_PRICING. */
export function formatPrice(spec: PriceSpec, show = SHOW_PUBLIC_PRICING): FormattedPrice {
  if (spec.type === "custom") return { value: spec.label, isCustom: true };
  if (!show) return { value: pricingSection.hiddenPriceLabel, isCustom: true };
  return {
    value: formatter.format(spec.amount),
    unit: spec.unit,
    prefix: spec.prefix,
    suffix: spec.suffix,
    isCustom: false,
  };
}
