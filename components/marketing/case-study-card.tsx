import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function CaseStudyCard({
  caseStudy,
}: {
  caseStudy: { slug: string; title: string; summary: string; industry: string; clientLabel: string; placeholder?: boolean };
}) {
  return (
    <Card as="article" interactive className="group flex h-full flex-col p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">{caseStudy.industry}</span>
        {caseStudy.placeholder && <PlaceholderBadge>Illustrative template</PlaceholderBadge>}
      </div>
      <h3 className="mt-5 font-heading text-h4 leading-snug font-semibold text-foreground">
        <Link href={`/case-studies/${caseStudy.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
          {caseStudy.title}
        </Link>
      </h3>
      <p className="mt-2 text-caption text-muted-foreground">{caseStudy.clientLabel}</p>
      <p className="mt-4 text-small leading-relaxed text-muted-foreground">{caseStudy.summary}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-small font-semibold text-foreground">
        Read case study
        <ArrowRight aria-hidden="true" className="size-4 text-accent-text transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Card>
  );
}
