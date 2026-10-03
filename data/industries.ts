/**
 * Industries — where privacy, security and governance themes commonly arise.
 * Themes describe typical risk areas, not claims of sector-regulatory expertise.
 */

export type Industry = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  themes: string[];
  /** Service ids most often relevant. */
  serviceIds: string[];
};

export const industries: Industry[] = [
  {
    id: "financial-services",
    title: "Financial Services",
    icon: "landmark",
    summary:
      "Customer data, outsourcing and supervisory expectations make privacy, security and vendor governance board-level topics.",
    themes: [
      "Customer-data governance",
      "Vendor and outsourcing risk",
      "Information-security controls",
      "Privacy operations",
      "Regulatory expectations",
      "Cross-border data",
    ],
    serviceIds: ["compliance-governance", "information-security", "risk-audit-training", "dpo-privacy"],
  },
  {
    id: "fintech",
    title: "FinTech",
    icon: "credit-card",
    summary:
      "Fast product cycles meet sensitive financial data, partner-bank due diligence and growing regulatory scrutiny.",
    themes: [
      "Partner and bank due diligence",
      "Consent and data-sharing flows",
      "Security readiness",
      "Third-party and API risk",
      "Privacy by Design",
      "Incident readiness",
    ],
    serviceIds: ["dpo-privacy", "information-security", "risk-audit-training"],
  },
  {
    id: "saas",
    title: "SaaS",
    icon: "cloud",
    summary:
      "Enterprise customers expect clear answers on privacy, security and sub-processors before they sign.",
    themes: [
      "Enterprise contracting",
      "Customer privacy requirements",
      "GDPR",
      "Vendor and sub-processor risk",
      "Data transfers",
      "Security readiness (ISO 27001 / SOC 2)",
    ],
    serviceIds: ["dpo-privacy", "information-security", "compliance-governance"],
  },
  {
    id: "technology",
    title: "Technology",
    icon: "cpu",
    summary:
      "Products, platforms and IT services that process client data need governance that keeps pace with engineering.",
    themes: [
      "Security governance",
      "Client data handling",
      "Access and asset management",
      "Secure development practices",
      "Customer audits",
      "Cross-border delivery",
    ],
    serviceIds: ["information-security", "compliance-governance", "risk-audit-training"],
  },
  {
    id: "market-research",
    title: "Market Research",
    icon: "chart-bar",
    summary:
      "Research built on respondent data depends on lawful collection, transparent notices and careful sharing.",
    themes: [
      "Respondent consent and notices",
      "Panel and survey data governance",
      "Anonymisation and retention",
      "Client data-sharing",
      "Vendor and fieldwork partners",
      "International studies",
    ],
    serviceIds: ["dpo-privacy", "compliance-governance"],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    icon: "briefcase",
    summary:
      "Firms entrusted with client information are increasingly asked to evidence how they protect it.",
    themes: [
      "Client confidentiality",
      "Information-security policies",
      "Client security assessments",
      "Document retention",
      "Staff awareness",
      "Supplier governance",
    ],
    serviceIds: ["information-security", "compliance-governance", "risk-audit-training"],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    icon: "shopping-cart",
    summary:
      "High volumes of customer data, marketing technologies and payment partners create everyday privacy decisions.",
    themes: [
      "Cookie and consent compliance",
      "Marketing and tracking",
      "Customer requests (DSARs)",
      "Payment and logistics partners",
      "Breach readiness",
      "Data retention",
    ],
    serviceIds: ["dpo-privacy", "information-security", "risk-audit-training"],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: "heart-pulse",
    summary:
      "Health information is among the most sensitive data an organisation can hold, raising the bar for governance.",
    themes: [
      "Sensitive data handling",
      "Access controls",
      "DPIAs for new services",
      "Vendor and platform risk",
      "Incident response",
      "Staff training",
    ],
    serviceIds: ["dpo-privacy", "information-security", "risk-audit-training"],
  },
  {
    id: "startups",
    title: "Startups & Scale-ups",
    icon: "rocket",
    summary:
      "Building the right foundations early avoids expensive rework when enterprise customers and investors ask questions.",
    themes: [
      "Proportionate privacy programmes",
      "Investor and customer due diligence",
      "Fractional privacy leadership",
      "Security readiness roadmaps",
      "Policies that fit the business",
      "International expansion",
    ],
    serviceIds: ["dpo-privacy", "information-security", "compliance-governance"],
  },
];

export const getIndustryById = (id: string) => industries.find((i) => i.id === id);
