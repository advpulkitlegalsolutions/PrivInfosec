import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getAllCaseStudies } from "@/lib/content/caseStudies";
import { getAllInsights } from "@/lib/content/insights";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.7 },
    { path: "/engagement-models", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/insights", priority: 0.7 },
    { path: "/case-studies", priority: 0.5 },
    { path: "/pricing", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), changeFrequency: "monthly" as const, priority: r.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...getAllInsights().map((i) => ({
      url: absoluteUrl(`/insights/${i.slug}`),
      lastModified: i.updatedDate ?? i.publicationDate,
      priority: 0.6,
    })),
    ...getAllCaseStudies()
      .filter((c) => !c.placeholder)
      .map((c) => ({ url: absoluteUrl(`/case-studies/${c.slug}`), priority: 0.5 })),
  ];
}
