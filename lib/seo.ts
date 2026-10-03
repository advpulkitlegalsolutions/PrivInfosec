import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path === "/" ? "" : path}`;

type MetaInput = {
  title?: string;
  description?: string;
  path: string;
  /** Use the title verbatim (no " | PrivInfosec Consulting" suffix). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

/** Builds consistent page metadata: title, description, canonical, OG and X/Twitter. */
export function createMetadata({
  title,
  description = siteConfig.description,
  path,
  absoluteTitle,
  type = "website",
  image,
  noIndex,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: MetaInput): Metadata {
  const fullTitle = !title
    ? `${siteConfig.name} | ${siteConfig.tagline}`
    : absoluteTitle
      ? title
      : `${title} | ${siteConfig.name}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: fullTitle }] : undefined;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(images && { images }),
      ...(type === "article" && { publishedTime, modifiedTime, authors, tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/* ------------------------------------------------------------------ */
/* Schema.org builders                                                  */
/* ------------------------------------------------------------------ */

const orgId = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  const sameAs = [siteConfig.social.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/brand/logo-mark.svg"),
    knowsAbout: [
      "Data privacy",
      "Information security",
      "Governance",
      "Risk management",
      "Digital Personal Data Protection Act",
      "GDPR",
      "ISO/IEC 27001",
      "ISO/IEC 27701",
      "SOC 2",
    ],
    ...(siteConfig.email && { email: siteConfig.email }),
    ...(siteConfig.phone && { telephone: siteConfig.phone }),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function serviceSchema(input: { name: string; description: string; path: string; serviceTypes: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": orgId },
    serviceType: input.serviceTypes,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Only call with real FAQ content that is visible on the page. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@type": "Organization", name: input.author, url: siteConfig.url },
    publisher: { "@id": orgId },
    ...(input.image && { image: absoluteUrl(input.image) }),
  };
}
