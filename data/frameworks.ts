/**
 * Frameworks, laws and standards.
 * ------------------------------------------------------------------
 * These are the requirements services may be delivered AGAINST — they are
 * not services in their own right, and PrivInfosec does not certify against
 * them. Add a framework by appending an object; set `category` to an
 * existing or new category and the filter updates automatically.
 */

export type FrameworkCategory = "Privacy" | "Information Security";

export type Framework = {
  id: string;
  name: string;
  fullName: string;
  category: FrameworkCategory;
  kind: "Law" | "Standard" | "Attestation framework";
  jurisdiction?: string;
  shortDescription: string;
  /** Service ids from data/services.ts */
  serviceIds: string[];
  featured: boolean;
};

export const frameworks: Framework[] = [
  {
    id: "dpdp",
    name: "DPDP Act",
    fullName: "Digital Personal Data Protection Act, 2023",
    category: "Privacy",
    kind: "Law",
    jurisdiction: "India",
    shortDescription:
      "India’s data protection law governing how digital personal data is collected, processed and protected.",
    serviceIds: ["dpo-privacy", "compliance-governance", "risk-audit-training"],
    featured: true,
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation (EU) 2016/679",
    category: "Privacy",
    kind: "Law",
    jurisdiction: "European Union",
    shortDescription:
      "The EU regulation on personal data, with extraterritorial reach to organisations serving people in the EU.",
    serviceIds: ["dpo-privacy", "compliance-governance", "risk-audit-training"],
    featured: true,
  },
  {
    id: "iso-27701",
    name: "ISO 27701",
    fullName: "ISO/IEC 27701 — Privacy Information Management",
    category: "Privacy",
    kind: "Standard",
    shortDescription:
      "International standard for a Privacy Information Management System (PIMS), extending ISO/IEC 27001.",
    serviceIds: ["dpo-privacy", "risk-audit-training"],
    featured: true,
  },
  {
    id: "iso-27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001 — Information Security Management",
    category: "Information Security",
    kind: "Standard",
    shortDescription:
      "International standard for establishing, operating and improving an Information Security Management System (ISMS).",
    serviceIds: ["information-security", "risk-audit-training", "compliance-governance"],
    featured: true,
  },
  {
    id: "soc-2",
    name: "SOC 2",
    fullName: "SOC 2 — AICPA Trust Services Criteria",
    category: "Information Security",
    kind: "Attestation framework",
    shortDescription:
      "Attestation framework for service organisations covering security, availability, processing integrity, confidentiality and privacy.",
    serviceIds: ["information-security", "risk-audit-training"],
    featured: true,
  },
];

export const frameworkCategories = Array.from(new Set(frameworks.map((f) => f.category)));

export const frameworksSection = {
  eyebrow: "Regulations & Standards",
  heading: "Requirements we help you work towards",
  description:
    "Our services are delivered against the laws and standards that apply to your organisation. We provide readiness, implementation and advisory support — certification and attestation are issued by independent, accredited bodies.",
};
