/**
 * Testimonials.
 * ------------------------------------------------------------------
 * Only entries with permissionStatus "approved" are ever rendered as real
 * testimonials. Never paraphrase, combine or invent quotes.
 */

export type PermissionStatus = "approved" | "pending" | "declined" | "placeholder";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  company: string;
  photo?: string;
  logo?: string;
  permissionStatus: PermissionStatus;
  featured: boolean;
  /** Show company name? Set false to show designation + industry only. */
  showCompany?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Development placeholder. Replace with an approved client testimonial — quoted verbatim and with written permission.",
    name: "Client Name",
    designation: "Designation",
    company: "Company",
    permissionStatus: "placeholder",
    featured: true,
  },
  {
    quote:
      "Development placeholder. This card is only visible while content placeholders are enabled and will never appear in production as a real quote.",
    name: "Client Name",
    designation: "Designation",
    company: "Company",
    permissionStatus: "placeholder",
    featured: true,
  },
];

export const approvedTestimonials = () => testimonials.filter((t) => t.permissionStatus === "approved");
export const placeholderTestimonials = () => testimonials.filter((t) => t.permissionStatus === "placeholder");
