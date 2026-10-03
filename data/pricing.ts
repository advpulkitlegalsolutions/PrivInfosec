/**
 * Pricing — the ONLY place monetary values live.
 * ------------------------------------------------------------------
 * Components format these numbers; they never contain prices themselves.
 *
 * SHOW_PUBLIC_PRICING = false replaces every monetary value with
 * "Custom engagement" without changing the layout.
 */

export const SHOW_PUBLIC_PRICING = true;

export const pricingCurrency = {
  code: "INR",
  locale: "en-IN",
  taxNote: "+ applicable taxes",
} as const;

export type PriceSpec =
  | { type: "amount"; amount: number; unit?: string; prefix?: string; suffix?: string }
  | { type: "custom"; label: string };

export type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: PriceSpec;
  /** Extra commercial lines, e.g. included hours or overage rate. */
  terms?: { label: string; price?: PriceSpec; text?: string }[];
  bestForLabel: string;
  bestFor: string[];
  highlight?: string; // e.g. "Most Popular"
  cta: { label: string; href: string };
};

export const pricingTiers: PricingTier[] = [
  {
    id: "advisory",
    name: "Advisory",
    description: "Focused specialist input when you need a clear answer or an expert review.",
    price: { type: "amount", amount: 4000, unit: "hour", prefix: "Starting from" },
    bestForLabel: "Best for",
    bestFor: [
      "Focused privacy questions",
      "Policy review",
      "Contract or clause review",
      "DPIA review",
      "Regulatory advisory",
      "Short-term specialist support",
    ],
    cta: { label: "Discuss Requirement", href: "/contact?engagement=advisory" },
  },
  {
    id: "fractional",
    name: "Fractional Privacy Support",
    description: "Senior privacy support as an extension of your team, on a predictable monthly retainer.",
    price: { type: "amount", amount: 160000, unit: "month", prefix: "Starting structure", suffix: "+ applicable taxes" },
    terms: [
      { label: "Included", text: "40 hours / month" },
      { label: "Additional hours", price: { type: "amount", amount: 4000, unit: "hour" } },
    ],
    bestForLabel: "Includes",
    bestFor: [
      "Privacy programme oversight",
      "Advisory access",
      "Policy review",
      "DPIA support",
      "Vendor support",
      "Governance support",
      "Management reporting",
    ],
    highlight: "Most Popular",
    cta: { label: "Discuss Retainer", href: "/contact?engagement=retainer&service=dpo-privacy" },
  },
  {
    id: "implementation",
    name: "Implementation Programme",
    description: "A defined programme with agreed scope, milestones and deliverables.",
    price: { type: "custom", label: "Custom Project Pricing" },
    bestForLabel: "Best for",
    bestFor: [
      "DPDP implementation",
      "GDPR implementation",
      "Privacy programme build",
      "ISO readiness",
      "Information-security governance",
      "Compliance frameworks",
      "Risk remediation",
    ],
    cta: { label: "Request Proposal", href: "/contact?engagement=project" },
  },
  {
    id: "enterprise",
    name: "Enterprise / Managed Support",
    description: "Sustained, multi-team support for larger or longer-term programmes.",
    price: { type: "custom", label: "Custom Engagement" },
    bestForLabel: "Best for",
    bestFor: [
      "Multi-team requirements",
      "Embedded support",
      "Long-term programmes",
      "Privacy and security operations",
      "Ongoing governance support",
    ],
    cta: { label: "Talk to Us", href: "/contact?engagement=enterprise" },
  },
];

export const pricingSection = {
  eyebrow: "Pricing",
  heading: "Transparent starting points. Scoped to your requirements.",
  description:
    "Every engagement is confirmed in a written proposal after an initial conversation. The figures below are indicative starting points, exclusive of applicable taxes.",
  footnote:
    "All fees are exclusive of applicable taxes. Final scope, fees and terms are confirmed in a written proposal or engagement letter.",
  hiddenPriceLabel: "Custom engagement",
};

export const pricingFaqs = [
  {
    question: "How is an engagement scoped?",
    answer:
      "We start with a short conversation to understand your requirement, then confirm scope, deliverables, timelines and fees in a written proposal before any work begins.",
  },
  {
    question: "What happens if we need more than 40 hours in a month?",
    answer:
      "Additional hours under a Fractional Privacy Support retainer are charged at the published hourly rate, and we agree any material increase with you in advance.",
  },
  {
    question: "Are the prices inclusive of taxes?",
    answer: "No. All fees are exclusive of applicable taxes, which are added to invoices as required.",
  },
  {
    question: "Can we start with an advisory engagement and move to a retainer?",
    answer:
      "Yes. Many organisations begin with a focused advisory or assessment engagement and move to retainer or fractional support once priorities are clear.",
  },
];
