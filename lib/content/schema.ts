import { z } from "zod";

export const insightCategories = [
  "Privacy",
  "Information Security",
  "Governance",
  "Risk",
  "DPDP",
  "GDPR",
  "ISO 27001",
  "ISO 27701",
  "SOC 2",
] as const;

export const insightContentTypes = [
  "Article",
  "Regulatory Update",
  "Guide",
  "Checklist",
  "Whitepaper",
] as const;

const isoDate = z.union([z.string(), z.date()]).transform((v) => new Date(v).toISOString());

export const insightFrontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  author: z.string().default("PrivInfosec Consulting"),
  publicationDate: isoDate,
  updatedDate: isoDate.optional(),
  category: z.enum(insightCategories),
  contentType: z.enum(insightContentTypes).default("Article"),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type InsightFrontmatter = z.infer<typeof insightFrontmatterSchema>;

export const caseStudyVisibility = ["public", "anonymous", "hidden"] as const;

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  client: z.string().optional(),
  anonymisedClient: z.string(),
  industry: z.string(),
  region: z.string().optional(),
  summary: z.string(),
  challenge: z.string(),
  approach: z.array(z.string()).default([]),
  implementation: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  outcomes: z.array(z.string()).default([]),
  /** Only verified, client-approved quantitative results. */
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  quote: z
    .object({ text: z.string(), attribution: z.string(), permissionStatus: z.enum(["approved", "pending"]) })
    .optional(),
  featured: z.boolean().default(false),
  visibility: z.enum(caseStudyVisibility).default("anonymous"),
  placeholder: z.boolean().default(false),
  publicationDate: isoDate.optional(),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
