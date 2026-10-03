import "server-only";
import { siteConfig } from "@/config/site";
import { readMdxDirectory } from "./loader";
import { caseStudyFrontmatterSchema, type CaseStudyFrontmatter } from "./schema";

export type CaseStudy = CaseStudyFrontmatter & { slug: string; body: string };

/** Display name honouring visibility rules — never reveals an anonymised client. */
export const caseStudyClientLabel = (c: CaseStudy) =>
  c.visibility === "public" && c.client ? c.client : c.anonymisedClient;

export function getAllCaseStudies(): CaseStudy[] {
  return readMdxDirectory("case-studies")
    .map(({ slug, data, content }) => {
      const parsed = caseStudyFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid front matter in content/case-studies/${slug}.mdx: ${parsed.error.message}`);
      }
      return { ...parsed.data, slug, body: content };
    })
    .filter((c) => c.visibility !== "hidden")
    .filter((c) => !c.placeholder || siteConfig.showContentPlaceholders);
}

export function getCaseStudyBySlug(slug: string) {
  return getAllCaseStudies().find((c) => c.slug === slug);
}
