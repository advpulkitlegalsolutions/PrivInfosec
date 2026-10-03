import { cn } from "@/lib/utils";
import type { Framework } from "@/data/frameworks";

/** Compact framework label. Never implies certification. */
export function FrameworkBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-badge-border bg-badge px-3 py-1 text-caption font-medium text-foreground",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {name}
    </span>
  );
}

export function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-card-border bg-card p-6 transition-colors duration-300 hover:border-card-border-hover">
      <span className="self-start rounded-pill bg-muted px-2.5 py-0.5 text-caption text-muted-foreground">{framework.kind}</span>
      <p className="mt-4 font-heading text-h3 font-semibold whitespace-nowrap tracking-snug text-foreground">{framework.name}</p>
      <p className="mt-1 text-caption text-muted-foreground">
        {framework.fullName}
        {framework.jurisdiction && ` · ${framework.jurisdiction}`}
      </p>
      <p className="mt-4 text-small leading-relaxed text-muted-foreground">{framework.shortDescription}</p>
    </div>
  );
}
