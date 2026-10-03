/**
 * Central site configuration.
 * ------------------------------------------------------------------
 * Every component reads company details from here — never hard-code
 * the company name, email, phone, social links or booking URL elsewhere.
 *
 * Values left as "" are intentionally empty until verified business
 * details are supplied. Components hide any element whose value is empty.
 */

export type BookingProvider = "calendly" | "cal" | "other" | "none";

export const siteConfig = {
  name: "PrivInfosec Consulting",
  shortName: "PrivInfosec",
  legalName: "PrivInfosec Consulting", // TODO: confirm registered legal entity name
  tagline: "Your Trusted Arm.",
  heroProposition: "Your Trusted Arm for Privacy, Security & Compliance.",
  description:
    "Practical advisory and implementation support across data privacy, information security, technology and compliance risk.",
  positioning: ["Privacy", "Information Security", "Governance", "Risk"],
  approach: ["Assess", "Design", "Implement", "Support"],

  /** Canonical origin. Override per environment with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.privinfosec.com").replace(/\/$/, ""),
  locale: "en_IN",

  /* ----- Contact details (fill in once verified) ------------------ */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: "", // e.g. "+91 00000 00000"
  whatsapp: "", // digits only, international format, e.g. "910000000000"
  location: "", // e.g. "Mumbai, India" — do not list cities without an actual presence
  social: {
    linkedin: "", // full company page URL
  },

  /** Optional response commitment shown on /contact, e.g. "We aim to respond within two business days." */
  responseCommitment: "",

  /* ----- Booking (Calendly / Cal.com) ------------------------------ */
  booking: {
    provider: (process.env.NEXT_PUBLIC_BOOKING_PROVIDER || "none") as BookingProvider,
    url: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  },

  /**
   * Show clearly-labelled placeholder blocks (client logos, testimonials,
   * leadership, case studies) while real, approved content is pending.
   * Set NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS=false before public launch —
   * sections with no approved content are then hidden automatically.
   */
  showContentPlaceholders: process.env.NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS !== "false",
};

export type SiteConfig = typeof siteConfig;

/** Primary + secondary calls to action used across the site. */
export const ctas = {
  primary: { label: "Book a Consultation", href: "/contact?intent=consultation" },
  secondary: { label: "Explore Services", href: "/services" },
  contact: { label: "Contact Us", href: "/contact" },
} as const;
