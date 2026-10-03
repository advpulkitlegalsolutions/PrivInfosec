import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type InsightSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  contentType: string;
  publicationDate: string;
  readingTime: number;
};

export function InsightCard({ insight, headingLevel = "h3" }: { insight: InsightSummary; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Card as="article" interactive className="group flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center gap-2 text-caption">
        <span className="font-mono uppercase tracking-[0.12em] text-accent-text">{insight.category}</span>
        <span aria-hidden="true" className="text-border-strong">/</span>
        <span className="text-muted-foreground">{insight.contentType}</span>
      </div>
      <Heading className="mt-5 font-heading text-h4 leading-snug font-semibold text-foreground">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
          {insight.title}
        </Link>
      </Heading>
      <p className="mt-3 line-clamp-3 text-small leading-relaxed text-muted-foreground">{insight.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-7 text-caption text-muted-foreground">
        <span>
          <time dateTime={insight.publicationDate}>{formatDate(insight.publicationDate, { dateStyle: "medium" })}</time>
          {" · "}
          {insight.readingTime} min read
        </span>
        <ArrowUpRight aria-hidden="true" className="size-4 text-accent-text transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Card>
  );
}
