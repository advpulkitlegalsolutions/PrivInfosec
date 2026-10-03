import { notFound } from "next/navigation";
import { Mdx } from "@/components/content/mdx";
import { CTASection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getServiceById } from "@/data/services";
import { caseStudyClientLabel, getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content/caseStudies";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const items = getAllCaseStudies();
  // Next.js requires at least one param for static export of a dynamic route.
  return items.length ? items.map((c) => ({ slug: c.slug })) : [{ slug: "__none" }];
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return createMetadata({ title: cs.title, description: cs.summary, path: `/case-studies/${cs.slug}`, noIndex: cs.placeholder });
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 border-t border-border py-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="font-medium tabular-nums text-caption text-accent-text">{index}</p>
        <h2 className="mt-2 font-heading text-h3 font-semibold text-foreground">{title}</h2>
      </div>
      <div className="text-body leading-relaxed text-subtle-foreground lg:col-span-8">{children}</div>
    </div>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((i) => (
      <li key={i} className="flex gap-3">
        <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent" />
        {i}
      </li>
    ))}
  </ul>
);

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();
  const serviceNames = cs.services.map((id) => getServiceById(id)?.title ?? id);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Case Studies", path: "/case-studies" },
          { name: cs.title, path: `/case-studies/${cs.slug}` },
        ]}
        eyebrow={cs.industry}
        title={cs.title}
        description={cs.summary}
        aside={
          <Card className="p-6">
            {cs.placeholder && <PlaceholderBadge className="mb-4">Illustrative template — not a client engagement</PlaceholderBadge>}
            <dl className="grid gap-4 text-small">
              <div>
                <dt className="text-caption text-muted-foreground">Client</dt>
                <dd className="font-medium text-foreground">{caseStudyClientLabel(cs)}</dd>
              </div>
              {cs.region && (
                <div>
                  <dt className="text-caption text-muted-foreground">Region</dt>
                  <dd className="font-medium text-foreground">{cs.region}</dd>
                </div>
              )}
              <div>
                <dt className="text-caption text-muted-foreground">Services</dt>
                <dd className="font-medium text-foreground">{serviceNames.join(", ")}</dd>
              </div>
            </dl>
          </Card>
        }
      />
      <Section spacing="sm" aria-label="Case study detail">
        <Block index="01" title="Challenge">
          <p>{cs.challenge}</p>
        </Block>
        <Block index="02" title="Approach">
          <List items={cs.approach} />
        </Block>
        <Block index="03" title="Implementation">
          <List items={cs.implementation} />
        </Block>
        <Block index="04" title="Outcome">
          <List items={cs.outcomes} />
          {cs.metrics.length > 0 && (
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {cs.metrics.map((m) => (
                <div key={m.label} className="border-l border-border-accent pl-4">
                  <dt className="text-caption text-muted-foreground">{m.label}</dt>
                  <dd className="font-heading text-h3 font-semibold text-foreground">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {cs.quote?.permissionStatus === "approved" && (
            <blockquote className="mt-8 border-l-2 border-accent pl-5 font-heading text-h4 text-foreground">
              <p>“{cs.quote.text}”</p>
              <footer className="mt-3 text-small text-muted-foreground">— {cs.quote.attribution}</footer>
            </blockquote>
          )}
        </Block>
        {cs.body.trim() && (
          <div className="border-t border-border pt-10">
            <Mdx source={cs.body} />
          </div>
        )}
      </Section>
      <CTASection />
    </>
  );
}
