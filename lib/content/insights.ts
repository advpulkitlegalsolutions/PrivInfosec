import "server-only";
import { readMdxDirectory, readingTime } from "./loader";
import { insightFrontmatterSchema, type InsightFrontmatter } from "./schema";

export type Insight = InsightFrontmatter & {
  slug: string;
  readingTime: number;
  body: string;
};

let cache: Insight[] | null = null;

export function getAllInsights(): Insight[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const items = readMdxDirectory("insights")
    .map(({ slug, data, content }) => {
      const parsed = insightFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid front matter in content/insights/${slug}.mdx: ${parsed.error.message}`);
      }
      return { ...parsed.data, slug, body: content, readingTime: readingTime(content) };
    })
    .filter((i) => !i.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  cache = items;
  return items;
}

export function getInsightBySlug(slug: string) {
  return getAllInsights().find((i) => i.slug === slug);
}

/** Related articles by category/tag overlap. */
export function getRelatedInsights(tags: string[], limit = 3, excludeSlug?: string) {
  const wanted = new Set(tags.map((t) => t.toLowerCase()));
  return getAllInsights()
    .filter((i) => i.slug !== excludeSlug)
    .map((i) => ({
      i,
      score:
        (wanted.has(i.category.toLowerCase()) ? 2 : 0) +
        i.tags.filter((t) => wanted.has(t.toLowerCase())).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.i);
}
