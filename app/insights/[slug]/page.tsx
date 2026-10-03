import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Mdx } from "@/components/content/mdx";
import { CTASection } from "@/components/marketing/cta-section";
import { InsightCard } from "@/components/marketing/insight-card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { getAllInsights, getInsightBySlug, getRelatedInsights } from "@/lib/content/insights";
import { articleSchema, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seoTitle ?? insight.title,
    description: insight.seoDescription ?? insight.excerpt,
    path: `/insights/${insight.slug}`,
    type: "article",
    image: insight.featuredImage,
    publishedTime: insight.publicationDate,
    modifiedTime: insight.updatedDate,
    authors: [insight.author],
    tags: insight.tags,
  });
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();
  const path = `/insights/${insight.slug}`;
  const related = getRelatedInsights([insight.category, ...insight.tags], 3, insight.slug);

  return (
    <>
      <article>
        <header className="border-b border-border bg-surface-2">
          <Container size="default" className="py-12 sm:py-16">
            <Breadcrumb
              items={[
                { name: "Insights", path: "/insights" },
                { name: insight.title, path },
              ]}
            />
            <div className="mt-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{insight.category}</Badge>
                <Badge variant="muted">{insight.contentType}</Badge>
              </div>
              <h1 className="mt-6 font-heading text-h1 leading-tight font-semibold tracking-tight text-foreground">{insight.title}</h1>
              <p className="mt-5 text-lead leading-relaxed text-muted-foreground">{insight.excerpt}</p>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-small">
                <div>
                  <dt className="text-caption text-muted-foreground">Author</dt>
                  <dd className="font-medium text-foreground">{insight.author}</dd>
                </div>
                <div>
                  <dt className="text-caption text-muted-foreground">Published</dt>
                  <dd className="font-medium text-foreground">
                    <time dateTime={insight.publicationDate}>{formatDate(insight.publicationDate)}</time>
                  </dd>
                </div>
                {insight.updatedDate && (
                  <div>
                    <dt className="text-caption text-muted-foreground">Updated</dt>
                    <dd className="font-medium text-foreground">
                      <time dateTime={insight.updatedDate}>{formatDate(insight.updatedDate)}</time>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-caption text-muted-foreground">Reading time</dt>
                  <dd className="font-medium text-foreground">{insight.readingTime} min</dd>
                </div>
              </dl>
            </div>
          </Container>
        </header>

        {insight.featuredImage && (
          <Container size="default" className="pt-12">
            <Image
              src={insight.featuredImage}
              alt={insight.featuredImageAlt ?? ""}
              width={1600}
              height={900}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="aspect-[16/9] w-full rounded-xl border border-border object-cover"
              priority
            />
          </Container>
        )}

        <Container size="prose" className="py-14 sm:py-20">
          <Mdx source={insight.body} />
          {insight.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-border pt-8" aria-label="Tags">
              {insight.tags.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 text-caption leading-relaxed text-muted-foreground">
            This article provides general information and does not constitute legal advice. Requirements depend on your circumstances and
            may change; please seek advice on your specific situation.
          </p>
          <Link href="/insights" className="mt-8 inline-flex items-center gap-2 text-small font-medium text-foreground hover:text-accent-text">
            <ArrowLeft aria-hidden="true" className="size-4" /> All insights
          </Link>
        </Container>
      </article>

      {related.length > 0 && (
        <Section tone="muted" aria-labelledby="related-heading" spacing="sm">
          <h2 id="related-heading" className="font-heading text-h3 font-semibold text-foreground">
            Related insights
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <InsightCard insight={r} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection />
      <JsonLd
        data={articleSchema({
          title: insight.title,
          description: insight.excerpt,
          path,
          datePublished: insight.publicationDate,
          dateModified: insight.updatedDate,
          author: insight.author,
          image: insight.featuredImage,
        })}
      />
    </>
  );
}
