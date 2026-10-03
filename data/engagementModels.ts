/**
 * Engagement models — exactly four. Used on the homepage, the
 * /engagement-models page, service pages and the contact form.
 */

export type EngagementModel = {
  id: string;
  title: string;
  description: string;
  icon: string;
  useCases: string[];
  /** Short label used in chips and form options. */
  label: string;
};

export const engagementModels: EngagementModel[] = [
  {
    id: "retainer",
    title: "Retainer",
    label: "Retainer",
    icon: "repeat",
    description:
      "Ongoing access to PrivInfosec professionals for recurring advisory, review, compliance and implementation requirements.",
    useCases: [
      "Privacy advisory",
      "Security governance",
      "Policy review",
      "Regulatory support",
      "Compliance operations",
      "Ongoing implementation support",
    ],
  },
  {
    id: "fractional",
    title: "Fractional / Virtual Support",
    label: "Fractional / Virtual",
    icon: "user-check",
    description:
      "Experienced professionals working as an extension of the client’s internal team without the overhead of maintaining equivalent full-time internal capability.",
    useCases: [
      "Virtual DPO",
      "Fractional privacy support",
      "Interim programme leadership",
      "Embedded privacy support",
      "Governance advisory",
      "Ongoing programme oversight",
    ],
  },
  {
    id: "project",
    title: "Project-Based",
    label: "Project-Based",
    icon: "milestone",
    description: "Defined engagements with agreed objectives, deliverables, milestones and timelines.",
    useCases: [
      "Privacy implementation",
      "Gap assessments",
      "ISO readiness",
      "Compliance programmes",
      "Policy frameworks",
      "Risk reviews",
      "Remediation programmes",
    ],
  },
  {
    id: "remote-hybrid",
    title: "Remote / Hybrid",
    label: "Remote / Hybrid",
    icon: "globe",
    description: "Delivery models structured around business, operational and project requirements.",
    useCases: [
      "Remote advisory and reviews",
      "Workshops and training sessions",
      "Embedded support alongside internal teams",
      "On-site sessions where the engagement requires and it is agreed",
    ],
  },
];

export const engagementSection = {
  heading: "Flexible Support. Built Around Your Requirements.",
  description:
    "Every engagement is structured around what your organisation actually needs — the level of support, the pace and the way your teams prefer to work.",
};
