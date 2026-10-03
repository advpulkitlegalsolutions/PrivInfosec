"use client";

import { useState } from "react";
import { InsightCard } from "@/components/marketing/insight-card";
import { cn } from "@/lib/utils";

type Summary = Parameters<typeof InsightCard>[0]["insight"] & { tags: string[] };

/** Client-side category filter over pre-rendered insight summaries. */
export function InsightsBrowser({ insights, categories }: { insights: Summary[]; categories: readonly string[] }) {
  const [active, setActive] = useState<string>("All");
  const available = categories.filter((c) => insights.some((i) => i.category === c || i.tags.includes(c)));
  const shown = active === "All" ? insights : insights.filter((i) => i.category === active || i.tags.includes(active));

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["All", ...available].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "min-h-10 rounded-pill border px-4 text-small font-medium transition-colors",
              active === c
                ? "border-badge-border bg-badge text-accent-text"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "insight" : "insights"}
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((i) => (
          <li key={i.slug}>
            <InsightCard insight={i} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
