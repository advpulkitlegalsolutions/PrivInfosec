/**
 * Clients / experience.
 * ------------------------------------------------------------------
 * NEVER add an organisation here without written permission to name it.
 *
 * visibility:
 *   "public"    — name and logo may be shown
 *   "anonymous" — show only `anonymousLabel` (e.g. "Global SaaS Company")
 *   "hidden"    — never rendered
 *
 * Logos go in /public/clients/. Provide an SVG where possible.
 * `logoVariant` controls rendering: "mono" (default, tinted to theme) or "original".
 * Entries with `placeholder: true` render as clearly-labelled grey blocks and
 * only when siteConfig.showContentPlaceholders is true.
 */

export type ClientVisibility = "public" | "anonymous" | "hidden";

export type Client = {
  name: string;
  logo?: string;
  /** Optional dark-background version of the logo. */
  logoDark?: string;
  logoVariant?: "mono" | "original";
  url?: string;
  industry: string;
  anonymousLabel?: string;
  visibility: ClientVisibility;
  featured: boolean;
  placeholder?: boolean;
};

export const clients: Client[] = [
  // --- Development placeholders: replace with approved entries ---------
  { name: "Client logo placeholder", industry: "Financial Services", visibility: "public", featured: true, placeholder: true },
  { name: "Client logo placeholder", industry: "SaaS", visibility: "public", featured: true, placeholder: true },
  { name: "Client logo placeholder", industry: "FinTech", visibility: "public", featured: true, placeholder: true },
  { name: "Client logo placeholder", industry: "Market Research", visibility: "public", featured: true, placeholder: true },
  { name: "Client logo placeholder", industry: "Technology", visibility: "public", featured: true, placeholder: true },
  { name: "Client logo placeholder", industry: "Professional Services", visibility: "public", featured: true, placeholder: true },

  // --- Example of a real entry (keep commented until approved) ---------
  // {
  //   name: "Example Ltd",
  //   logo: "/clients/example.svg",
  //   logoVariant: "mono",
  //   url: "https://example.com",
  //   industry: "SaaS",
  //   visibility: "public",
  //   featured: true,
  // },
  // {
  //   name: "Confidential client",
  //   industry: "Financial Services",
  //   anonymousLabel: "Financial Services Organisation",
  //   visibility: "anonymous",
  //   featured: true,
  // },
];

export const clientSection = {
  heading: "Trusted across regulated and technology-led businesses",
};
