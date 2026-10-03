import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { serviceHref, type Service } from "@/data/services";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Service card — full (homepage/services overview) or compact (related lists).
 * The whole card is clickable via a stretched link on the CTA.
 */
export function ServiceCard({ service, variant = "full", className }: { service: Service; variant?: "full" | "compact"; className?: string }) {
  const href = serviceHref(service);
  if (variant === "compact") {
    return (
      <Card interactive className={cn("group flex h-full flex-col p-6", className)}>
        <div className="flex items-center gap-3">
          <span className="font-medium tabular-nums text-caption text-accent-text">{service.number}</span>
          <span className="h-px flex-1 bg-border" />
          <Icon name={service.icon} className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-accent-text" />
        </div>
        <h3 className="mt-5 font-heading text-h4 font-semibold text-foreground">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-lg">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-small text-muted-foreground">{service.shortDescription}</p>
      </Card>
    );
  }

  return (
    <Card as="article" interactive className={cn("group flex h-full flex-col p-7 sm:p-9", className)}>
      <div className="flex items-start justify-between gap-6">
        <span className="flex size-12 items-center justify-center rounded-md border border-border bg-surface-3 text-muted-foreground transition-colors duration-300 group-hover:border-border-accent group-hover:text-accent-text">
          <Icon name={service.icon} className="size-6" />
        </span>
        <span className="font-medium tabular-nums text-h4 text-muted-foreground transition-colors duration-300 group-hover:text-accent-text">{service.number}</span>
      </div>
      <p className="mt-8 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">{service.title}</p>
      <h3 className="mt-3 font-heading text-h4 leading-[1.3] font-semibold tracking-snug text-foreground sm:text-[1.5rem]">{service.headline}</h3>
      <p className="mt-4 text-small leading-relaxed text-muted-foreground sm:text-body">{service.summary}</p>
      <ul className="mt-7 grid gap-x-6 gap-y-2.5 border-t border-border pt-6 sm:grid-cols-2">
        {service.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-small text-subtle-foreground">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" strokeWidth={2} />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-small font-semibold text-foreground after:absolute after:inset-0 after:rounded-lg"
        >
          {service.cta.label}
          <ArrowRight aria-hidden="true" className="size-4 text-accent-text transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
}
