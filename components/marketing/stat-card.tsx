import { cn } from "@/lib/utils";
import type { CompanyStat } from "@/data/companyStats";

/** Displays a single VERIFIED statistic (see data/companyStats.ts). */
export function StatCard({ stat, className }: { stat: CompanyStat; className?: string }) {
  return (
    <div className={cn("border-l border-border-accent pl-5", className)}>
      <p className="font-heading text-h2 font-semibold tracking-tight text-foreground">{stat.value}</p>
      <p className="mt-1 text-small font-medium text-subtle-foreground">{stat.label}</p>
      {stat.description && <p className="mt-1 text-caption text-muted-foreground">{stat.description}</p>}
    </div>
  );
}
