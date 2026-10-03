import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "./json-ld";

export type Crumb = { name: string; path: string };

/** Accessible breadcrumb trail + BreadcrumbList structured data. */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-caption", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {trail.map((item, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-foreground">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="rounded-xs transition-colors hover:text-accent-text">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
