/**
 * Service architecture — source of truth: approved PrivInfosec brochure.
 * ------------------------------------------------------------------
 * Exactly four principal practices. Every service page, card, menu item,
 * sitemap entry and contact-form option is generated from this array.
 *
 * To ADD a service later (e.g. AI Governance): append an object below.
 * Route /services/<slug>, navigation, sitemap, footer and form options
 * update automatically. No JSX changes required.
 */

export type ServiceCapabilityGroup = {
  title: string;
  items: string[];
};

export type ServiceFaq = { question: string; answer: string };

export type ServiceStageHelp = {
  stage: "Assess" | "Design" | "Implement" | "Support";
  description: string;
};

export type Service = {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  icon: string;
  capabilities: string[];
  groups: ServiceCapabilityGroup[];
  frameworks?: string[];
  engagementModels?: string[];
  featured: boolean;
  seo: {
    title: string;
    description: string;
  };

  /* ---- Presentation content (cards + service page template) ---- */
  /** Card headline used on the homepage and services overview. */
  headline: string;
  /** Longer card description. */
  summary: string;
  /** Six highlights shown on service cards. */
  highlights: string[];
  cta: { label: string; href?: string };
  /** Plain-language definition at the top of the service page (answer-engine friendly). */
  intro: string;
  challenges: string[];
  howWeHelp: ServiceStageHelp[];
  /** Industry ids from data/industries.ts. */
  industries: string[];
  /** Insight tags/categories used to pull related articles. */
  insightTags: string[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    id: "dpo-privacy",
    slug: "dpo-privacy",
    number: "01",
    title: "DPO & Privacy Services",
    shortTitle: "Privacy",
    description:
      "Practical privacy leadership, implementation and operational support for organisations navigating evolving data protection requirements.",
    shortDescription: "DPO support and end-to-end privacy programme advisory and implementation.",
    icon: "shield-user",

    capabilities: [
      "DPO as a Service (vDPO)",
      "Privacy gap assessments and compliance reviews",
      "DPIAs",
      "RoPAs",
      "Privacy policies and notices",
      "DSAR support",
      "Breach response and incident support",
      "Vendor compliance",
      "Transfer compliance",
      "Cookie compliance",
      "DPDP Act support",
      "GDPR support",
      "ISO 27701 support",
    ],

    groups: [
      {
        title: "Privacy Leadership",
        items: [
          "DPO as a Service",
          "Virtual DPO",
          "Fractional privacy support",
          "Privacy programme governance",
          "Interim privacy leadership",
        ],
      },
      {
        title: "Privacy Programme",
        items: [
          "Privacy gap assessments",
          "DPIAs",
          "RoPAs",
          "Privacy policies",
          "Privacy notices",
          "Data-mapping support",
        ],
      },
      {
        title: "Privacy Operations",
        items: [
          "DSAR support",
          "Breach response",
          "Privacy incident support",
          "Cookie compliance",
          "Consent compliance",
        ],
      },
      {
        title: "Third-Party & International Privacy",
        items: [
          "Vendor assessments",
          "Vendor governance",
          "Transfer assessments",
          "Cross-border privacy advisory",
        ],
      },
      {
        title: "Regulatory & Standards Support",
        items: ["DPDP Act", "GDPR", "ISO 27701"],
      },
    ],

    frameworks: ["DPDP Act", "GDPR", "ISO 27701"],
    engagementModels: ["Retainer", "Fractional / Virtual", "Project-Based", "Remote / Hybrid"],
    featured: true,
    seo: {
      title: "DPO & Privacy Services | PrivInfosec Consulting",
      description:
        "Virtual DPO, privacy assessments, DPIAs, RoPAs, DSAR support, breach advisory and DPDP, GDPR and ISO 27701 privacy support.",
    },

    headline: "Build privacy programmes that work beyond the policy document.",
    summary:
      "From Virtual DPO support and privacy assessments to DPIAs, RoPAs, DSARs, breach response and third-party compliance, we help organisations translate privacy obligations into practical processes.",
    highlights: [
      "DPO as a Service",
      "Privacy Gap Assessments",
      "DPIAs & RoPAs",
      "DSAR & Breach Support",
      "Vendor & Transfer Compliance",
      "DPDP, GDPR & ISO 27701",
    ],
    cta: { label: "Explore Privacy Services" },
    intro:
      "DPO & Privacy Services covers the leadership, documentation and day-to-day operations an organisation needs to process personal data lawfully and accountably. PrivInfosec provides experienced privacy support — including Virtual / Fractional DPO arrangements — and helps teams build the assessments, records, notices and response processes that privacy laws such as India’s DPDP Act and the EU GDPR expect.",
    challenges: [
      "No clear owner for privacy, or a privacy role combined with an already full-time job.",
      "Personal data spread across systems and vendors without a reliable record of processing.",
      "Policies and notices that do not reflect how data is actually collected and used.",
      "Uncertainty about what DPDP Act or GDPR readiness requires in practice.",
      "Data subject requests and incidents handled ad hoc, without timelines or evidence.",
      "Enterprise customers and procurement teams asking privacy questions the business cannot answer confidently.",
    ],
    howWeHelp: [
      {
        stage: "Assess",
        description:
          "Privacy gap assessment against applicable requirements, data-mapping workshops and a review of current notices, contracts and controls.",
      },
      {
        stage: "Design",
        description:
          "A proportionate privacy programme: governance roles, RoPA structure, DPIA methodology, notices, consent approach and vendor requirements.",
      },
      {
        stage: "Implement",
        description:
          "Drafting and embedding policies, notices, DSAR and breach procedures, cookie and consent configuration guidance and vendor assessments.",
      },
      {
        stage: "Support",
        description:
          "Ongoing Virtual / Fractional DPO support: advisory access, DPIA reviews, incident support, management reporting and programme oversight.",
      },
    ],
    industries: ["saas", "fintech", "financial-services", "market-research", "technology", "healthcare"],
    insightTags: ["Privacy", "DPDP", "GDPR", "ISO 27701"],
    faqs: [
      {
        question: "What is a Virtual or Fractional DPO?",
        answer:
          "A Virtual (or Fractional) DPO is an experienced privacy professional who provides data protection officer-level support on a part-time, retained basis rather than as a full-time employee. PrivInfosec works as an extension of your team, supporting management, legal, technology, HR, procurement and operations on privacy matters.",
      },
      {
        question: "Can PrivInfosec act as our formally appointed DPO?",
        answer:
          "Whether an external provider can be formally designated depends on the law that applies to you and your organisation’s specific obligations. We will discuss your requirements and structure the engagement accordingly — for example, as privacy advisory and programme support to an internally designated officer.",
      },
      {
        question: "Do you support both the DPDP Act and GDPR?",
        answer:
          "Yes. We support organisations working towards India’s Digital Personal Data Protection Act and the EU GDPR, including organisations that need to address both — for example Indian companies serving European customers.",
      },
      {
        question: "What is a DPIA and when is one needed?",
        answer:
          "A Data Protection Impact Assessment is a structured assessment of the privacy risks of a processing activity and the measures used to address them. It is typically required or expected for higher-risk processing, such as large-scale processing of sensitive data, systematic monitoring or new technologies.",
      },
      {
        question: "Do you help with ISO 27701?",
        answer:
          "We provide ISO/IEC 27701 readiness support — gap assessment, privacy information management system design and implementation support. Certification itself is issued by an accredited certification body; PrivInfosec does not certify organisations.",
      },
    ],
  },
  {
    id: "information-security",
    slug: "information-security",
    number: "02",
    title: "Information Security & IT Infrastructure",
    shortTitle: "Information Security",
    description:
      "Information-security governance, infrastructure assessment and security advisory designed around practical business risks.",
    shortDescription: "Security governance, infrastructure assessments and ISO/SOC readiness support.",
    icon: "network-lock",

    capabilities: [
      "Information security governance and risk reviews",
      "IT infrastructure and security posture assessments",
      "Cloud security advisory",
      "Endpoint security advisory",
      "Network security advisory",
      "Access control advisory",
      "Asset management advisory",
      "Information security policy support",
      "Vendor security due diligence",
      "ISO 27001 readiness support",
      "SOC 2 readiness support",
    ],

    groups: [
      {
        title: "Information Security Governance",
        items: ["Security governance", "Security risk reviews", "Security policies", "Control frameworks"],
      },
      {
        title: "Infrastructure & Security Posture",
        items: [
          "IT infrastructure assessment",
          "Security posture review",
          "Cloud security",
          "Endpoint security",
          "Network security",
        ],
      },
      {
        title: "Identity, Access & Assets",
        items: ["Access-control advisory", "Asset-management advisory", "Information asset governance"],
      },
      {
        title: "Third-Party Security",
        items: ["Vendor security due diligence", "Supplier security reviews", "Third-party security risk"],
      },
      {
        title: "Standards & Assurance Readiness",
        items: ["ISO 27001 readiness", "SOC 2 readiness"],
      },
    ],

    frameworks: ["ISO 27001", "SOC 2"],
    engagementModels: ["Retainer", "Project-Based", "Remote / Hybrid"],
    featured: true,
    seo: {
      title: "Information Security & IT Infrastructure | PrivInfosec Consulting",
      description:
        "Information-security governance, infrastructure security assessments, vendor due diligence and ISO 27001 and SOC 2 readiness support.",
    },

    headline: "Strengthen security across governance, infrastructure and third parties.",
    summary:
      "We support organisations with information-security governance, infrastructure assessments, cloud, endpoint and network security advisory, vendor due diligence and ISO 27001 or SOC 2 readiness.",
    highlights: [
      "Security Governance",
      "IT & Security Assessments",
      "Cloud, Endpoint & Network Advisory",
      "Access & Asset Management",
      "Vendor Security Due Diligence",
      "ISO 27001 & SOC 2 Readiness",
    ],
    cta: { label: "Explore Information Security" },
    intro:
      "Information Security & IT Infrastructure advisory helps an organisation decide which security controls it needs, confirm whether existing controls are working, and organise them into a governed, evidence-backed programme. PrivInfosec reviews infrastructure, cloud, endpoint, network and access practices and supports readiness for frameworks such as ISO/IEC 27001 and SOC 2.",
    challenges: [
      "Security responsibilities spread across IT, engineering and vendors with no single governance view.",
      "Customer security questionnaires and audits arriving faster than the team can respond.",
      "Cloud environments that have grown faster than access, logging and configuration standards.",
      "Policies that exist on paper but are not reflected in day-to-day operations.",
      "Limited visibility of assets, privileged access and third-party connections.",
      "A requirement to demonstrate ISO 27001 or SOC 2 readiness within a commercial timeline.",
    ],
    howWeHelp: [
      {
        stage: "Assess",
        description:
          "Security posture and infrastructure assessment across governance, cloud, endpoints, network, access and assets, with risk-ranked findings.",
      },
      {
        stage: "Design",
        description:
          "A security governance model, policy set and control framework sized to the organisation, mapped to ISO 27001 or SOC 2 where relevant.",
      },
      {
        stage: "Implement",
        description:
          "Implementation support for prioritised controls, evidence collection, vendor due diligence and readiness activities with internal teams.",
      },
      {
        stage: "Support",
        description:
          "Ongoing security advisory, periodic reviews, policy maintenance and support during customer assessments and external audits.",
      },
    ],
    industries: ["saas", "fintech", "financial-services", "technology", "ecommerce", "startups"],
    insightTags: ["Information Security", "ISO 27001", "SOC 2"],
    faqs: [
      {
        question: "Do you certify organisations against ISO 27001 or SOC 2?",
        answer:
          "No. ISO/IEC 27001 certification is issued by accredited certification bodies, and SOC 2 reports are issued by licensed CPA firms. PrivInfosec provides readiness support — gap assessments, control design, implementation support and evidence preparation — so you are prepared for the external audit.",
      },
      {
        question: "Should we pursue ISO 27001 or SOC 2?",
        answer:
          "It usually depends on where your customers are and what they ask for. SOC 2 is commonly requested by North American customers; ISO 27001 is widely recognised internationally, including in India, Europe and Asia. Many organisations design one control set that supports both.",
      },
      {
        question: "Is this a penetration-testing or managed security service?",
        answer:
          "No. This practice is advisory and implementation support across governance, infrastructure and third-party security. Where technical testing is needed, we can help you scope it and act on the results.",
      },
      {
        question: "Can you help us respond to customer security questionnaires?",
        answer:
          "Yes. We help organisations build accurate, reusable answers grounded in their actual controls and evidence, and identify gaps that need to be addressed.",
      },
    ],
  },
  {
    id: "compliance-governance",
    slug: "compliance-governance",
    number: "03",
    title: "Compliance / Governance Advisory",
    shortTitle: "Compliance & Governance",
    description:
      "Practical governance and compliance support covering regulatory programmes, data governance, policy frameworks and cross-border requirements.",
    shortDescription: "Governance frameworks, compliance roadmaps, data governance and policy advisory.",
    icon: "badge-check",

    capabilities: [
      "Privacy governance frameworks",
      "Cybersecurity governance frameworks",
      "Regulatory compliance advisory",
      "Compliance roadmaps",
      "Data mapping",
      "Data classification",
      "Data retention",
      "Policies and standards development",
      "Third-party compliance",
      "Supplier compliance",
      "Cross-border data transfer advisory",
    ],

    groups: [
      {
        title: "Governance Frameworks",
        items: [
          "Privacy governance",
          "Cybersecurity governance",
          "Roles and responsibilities",
          "Governance operating models",
          "Accountability structures",
        ],
      },
      {
        title: "Regulatory Compliance",
        items: ["Regulatory advisory", "Compliance gap analysis", "Compliance roadmaps", "Implementation planning"],
      },
      {
        title: "Data Governance",
        items: ["Data mapping", "Data classification", "Data retention", "Data lifecycle governance"],
      },
      {
        title: "Policies & Standards",
        items: ["Policy drafting", "Policy review", "Standards development", "Control documentation"],
      },
      {
        title: "Third-Party Governance",
        items: ["Vendor compliance", "Supplier compliance", "Third-party governance"],
      },
      {
        title: "Cross-Border Data",
        items: ["Cross-border transfer advisory", "Transfer governance", "International transfer assessments"],
      },
    ],

    engagementModels: ["Retainer", "Project-Based", "Fractional", "Remote / Hybrid"],
    featured: true,
    seo: {
      title: "Compliance & Governance Advisory | PrivInfosec Consulting",
      description:
        "Privacy and cybersecurity governance, compliance roadmaps, data mapping, retention, policy development and cross-border advisory.",
    },

    headline: "Turn regulatory requirements into practical governance.",
    summary:
      "We help businesses establish privacy and cybersecurity governance, compliance roadmaps, data-management controls, policies, standards and cross-border compliance processes.",
    highlights: [
      "Privacy & Cyber Governance",
      "Regulatory Compliance",
      "Data Mapping & Classification",
      "Data Retention",
      "Policies & Standards",
      "Cross-Border Data Transfers",
    ],
    cta: { label: "Explore Governance Advisory" },
    intro:
      "Compliance / Governance Advisory creates the structures that make compliance repeatable: clear ownership, documented policies and standards, data-governance controls and a prioritised roadmap. PrivInfosec translates regulatory requirements into business processes that legal, technology and operational teams can run and evidence.",
    challenges: [
      "Overlapping privacy, security and sector requirements without a single, prioritised plan.",
      "Unclear accountability between legal, compliance, IT, security and business teams.",
      "Data retained indefinitely because no one owns classification or retention decisions.",
      "Policy libraries that are outdated, inconsistent or disconnected from operations.",
      "International data flows without documented transfer mechanisms or assessments.",
      "Boards and leadership asking for a clear view of compliance status and next steps.",
    ],
    howWeHelp: [
      {
        stage: "Assess",
        description:
          "Compliance gap analysis, stakeholder interviews and data-mapping to establish obligations, ownership and current maturity.",
      },
      {
        stage: "Design",
        description:
          "Governance operating model, accountability structures, policy and standards architecture, data classification and retention schedules.",
      },
      {
        stage: "Implement",
        description:
          "Policy drafting and rollout, control documentation, supplier compliance processes and cross-border transfer governance.",
      },
      {
        stage: "Support",
        description:
          "Ongoing regulatory advisory, roadmap tracking, periodic policy review and leadership reporting.",
      },
    ],
    industries: ["financial-services", "fintech", "professional-services", "market-research", "healthcare", "technology"],
    insightTags: ["Governance", "DPDP", "GDPR"],
    faqs: [
      {
        question: "What is a compliance roadmap?",
        answer:
          "A compliance roadmap is a prioritised, time-bound plan that sets out which requirements apply, where the organisation currently falls short, who owns each action and in what order remediation should happen. It gives leadership a clear basis for decisions and resourcing.",
      },
      {
        question: "Do you provide legal opinions?",
        answer:
          "Our governance advisory focuses on translating requirements into practical processes, policies and controls. Where a formal legal opinion is required, we will tell you and can work alongside your legal counsel.",
      },
      {
        question: "What does data retention governance involve?",
        answer:
          "It involves deciding how long each category of data should be kept and why, documenting that in a retention schedule, and putting processes in place to delete or anonymise data when it is no longer needed.",
      },
      {
        question: "Can you help with cross-border data transfers?",
        answer:
          "Yes. We help organisations map international data flows, assess transfer requirements under applicable laws such as GDPR and the DPDP Act, and document the governance and contractual measures used.",
      },
    ],
  },
  {
    id: "risk-audit-training",
    slug: "risk-audit-training",
    number: "04",
    title: "Risk, Audit & Training",
    shortTitle: "Risk & Audit",
    description:
      "Risk assessments, internal reviews, third-party risk management and practical training designed to strengthen compliance and operational resilience.",
    shortDescription: "Internal audits, third-party risk, by-design reviews, training and remediation.",
    icon: "clipboard-check",

    capabilities: [
      "Internal audits",
      "Control reviews",
      "Third-party risk management",
      "Privacy by Design reviews",
      "Security by Design reviews",
      "Awareness sessions",
      "Stakeholder training",
      "Remediation roadmaps",
      "Ongoing advisory",
      "Retainer support",
      "Project-based support",
      "Fractional support",
    ],

    groups: [
      {
        title: "Audit & Control Assurance",
        items: ["Internal audits", "Control reviews", "Compliance reviews"],
      },
      {
        title: "Third-Party Risk",
        items: ["Third-party risk management", "Supplier risk reviews", "Vendor risk", "Risk remediation"],
      },
      {
        title: "Privacy & Security by Design",
        items: ["Privacy by Design reviews", "Security by Design reviews", "Project-stage advisory"],
      },
      {
        title: "Training & Awareness",
        items: [
          "Employee awareness",
          "Management workshops",
          "Stakeholder training",
          "Role-based training",
          "Privacy awareness",
          "Security awareness",
        ],
      },
      {
        title: "Remediation & Ongoing Support",
        items: [
          "Remediation roadmaps",
          "Ongoing advisory",
          "Retainer support",
          "Project-based support",
          "Fractional support",
        ],
      },
    ],

    engagementModels: ["Retainer", "Fractional / Virtual", "Project-Based", "Remote / Hybrid"],
    featured: true,
    seo: {
      title: "Risk, Audit & Training | PrivInfosec Consulting",
      description:
        "Internal audits, control reviews, third-party risk management, Privacy by Design, Security by Design and privacy and security training.",
    },

    headline: "Identify gaps. Strengthen controls. Build internal capability.",
    summary:
      "Our support includes internal audits, control reviews, third-party risk management, Privacy and Security by Design reviews, training and remediation programmes.",
    highlights: [
      "Internal Audits",
      "Control Reviews",
      "Third-Party Risk",
      "Privacy & Security by Design",
      "Awareness & Training",
      "Remediation & Advisory",
    ],
    cta: { label: "Explore Risk & Audit" },
    intro:
      "Risk, Audit & Training provides independent assurance that privacy and security controls are designed and operating as intended, and builds the internal capability to keep them that way. PrivInfosec conducts internal audits and control reviews, manages third-party risk, reviews projects for Privacy and Security by Design, and delivers role-relevant training.",
    challenges: [
      "Controls that have not been independently tested since they were introduced.",
      "Growing reliance on vendors without a consistent approach to assessing their risk.",
      "New products and systems launched before privacy or security has been considered.",
      "Awareness training that is generic, infrequent or disconnected from real responsibilities.",
      "Audit findings that are recorded but not remediated or tracked to closure.",
      "Leadership wanting objective assurance before a customer audit, funding round or certification.",
    ],
    howWeHelp: [
      {
        stage: "Assess",
        description:
          "Internal audits, control reviews and third-party risk assessments with clear, evidence-based findings and ratings.",
      },
      {
        stage: "Design",
        description:
          "Third-party risk frameworks, by-design review checkpoints for projects, and training plans tailored to roles and risk.",
      },
      {
        stage: "Implement",
        description:
          "Remediation roadmaps, supplier review processes, project-stage reviews and delivery of awareness sessions and workshops.",
      },
      {
        stage: "Support",
        description:
          "Ongoing advisory, follow-up reviews, refresher training and retainer, project-based or fractional support for remediation.",
      },
    ],
    industries: ["financial-services", "fintech", "saas", "professional-services", "healthcare", "ecommerce"],
    insightTags: ["Risk", "Information Security", "Privacy"],
    faqs: [
      {
        question: "Is an internal audit the same as a certification audit?",
        answer:
          "No. An internal audit is an independent review commissioned by the organisation to test whether its controls are designed and operating effectively. It is often a prerequisite to — and good preparation for — an external certification or attestation audit carried out by an accredited body.",
      },
      {
        question: "What is a Privacy by Design or Security by Design review?",
        answer:
          "It is a structured review of a product, system or process at the design stage, identifying privacy and security requirements early — when they are cheaper and easier to address than after launch.",
      },
      {
        question: "What training formats do you offer?",
        answer:
          "Employee awareness sessions, management workshops and role-based training for teams such as engineering, HR, customer support and procurement. Sessions can be delivered remotely or in a hybrid format.",
      },
      {
        question: "How do you approach third-party risk management?",
        answer:
          "We help you tier vendors by risk, define proportionate assessment requirements, review supplier responses and evidence, and track remediation — so effort is focused on the vendors that matter most.",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const getServiceById = (id: string) => services.find((s) => s.id === id);
export const serviceHref = (service: Pick<Service, "slug">) => `/services/${service.slug}`;

/**
 * Virtual / Fractional DPO — a commercial focus WITHIN DPO & Privacy Services.
 * Deliberately not a fifth service.
 */
export const virtualDpo = {
  parentServiceId: "dpo-privacy",
  anchor: "virtual-dpo",
  eyebrow: "DPO & Privacy Services",
  headline: "Senior Privacy Support. Without the Full\u2011Time Overhead.",
  description:
    "PrivInfosec can work as an extension of your internal team, supporting management, legal, technology, HR, procurement, compliance and operational stakeholders.",
  examples: [
    "Virtual DPO",
    "Fractional Privacy Support",
    "Interim Privacy Leadership",
    "Privacy Programme Oversight",
    "DPO Advisory",
    "Privacy Operations Support",
  ],
  stakeholders: ["Management", "Legal", "Technology", "HR", "Procurement", "Compliance", "Operations"],
  primaryCta: { label: "Explore Virtual DPO Support", href: "/services/dpo-privacy#virtual-dpo" },
  secondaryCta: { label: "Discuss a Retainer", href: "/contact?engagement=retainer&service=dpo-privacy" },
} as const;
