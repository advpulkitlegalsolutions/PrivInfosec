/**
 * Navigation — header, mobile menu and footer.
 * Service links are generated from data/services.ts so new services
 * appear automatically.
 */
import { services, serviceHref, virtualDpo } from "@/data/services";

export type NavLink = { label: string; href: string; description?: string; icon?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const serviceNavLinks: NavLink[] = services.map((s) => ({
  label: s.title,
  href: serviceHref(s),
  description: s.shortDescription,
  icon: s.icon,
}));

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: serviceNavLinks },
  { label: "Industries", href: "/industries" },
  { label: "Engagement Models", href: "/engagement-models" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/** Feature card shown inside the Services mega menu. */
export const megaMenuFeature = {
  eyebrow: "Within DPO & Privacy Services",
  title: "Virtual / Fractional DPO",
  description: "Senior privacy support as an extension of your team — without the full-time overhead.",
  href: virtualDpo.primaryCta.href,
  label: "Explore Virtual DPO Support",
};

export const footerNav = {
  services: serviceNavLinks.map(({ label, href }) => ({ label, href })),
  company: [
    { label: "About", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Engagement Models", href: "/engagement-models" },
    { label: "Insights", href: "/insights" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Notice", href: "/privacy" },
    { label: "Cookie Notice", href: "/cookies" },
    { label: "Terms", href: "/terms" },
  ],
} satisfies Record<string, NavLink[]>;
