import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion built on native <details>/<summary>: keyboard and screen-reader
 * accessible with zero JavaScript. Use `name` to make items exclusive.
 */
export function Accordion({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("divide-y divide-border border-y border-border", className)}>{children}</div>;
}

export function AccordionItem({
  title,
  children,
  name,
  defaultOpen,
  headingLevel: Heading = "h3",
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  name?: string;
  defaultOpen?: boolean;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  return (
    <details name={name} open={defaultOpen} className="group">
      <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left focus-visible:outline-offset-4">
        <Heading className="font-heading text-body font-semibold text-foreground sm:text-h4">{title}</Heading>
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-pill border border-border text-accent-text transition-transform duration-300 ease-out group-open:rotate-45"
        >
          <Plus className="size-4" />
        </span>
      </summary>
      <div className="max-w-3xl pb-6 pr-12 text-body leading-relaxed text-muted-foreground">{children}</div>
    </details>
  );
}
