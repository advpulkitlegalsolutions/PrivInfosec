import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-system content source. Reads MDX files with YAML front matter.
 * To move to a headless CMS later, replace these functions with API
 * calls that return the same shapes — pages will not need to change.
 */
export function readMdxDirectory(collection: "insights" | "case-studies") {
  const abs = path.join(process.cwd(), "content", collection);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(abs, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
