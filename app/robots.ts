import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Block indexing on non-production deployments (previews, staging).
  const isProduction = process.env.NEXT_PUBLIC_DEPLOY_ENV ? process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" : true;
  return {
    rules: isProduction
      ? [{ userAgent: "*", allow: "/", disallow: ["/api/", "/design-system"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
