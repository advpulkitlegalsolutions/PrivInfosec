import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/** Inner-page header: breadcrumb, eyebrow, H1, lead, optional actions/aside. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  tone = "ink",
  number,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs: Crumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: "ink" | "default";
  number?: string;
}) {
  const ink = tone === "ink";
  return (
    <section
      {...(ink ? { "data-theme": "dark", "data-band": "ink" } : {})}
      className={cn("relative isolate overflow-hidden bg-background text-foreground", !ink && "border-b border-border")}
    >
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 -z-10" />
      <Container size="wide" className="py-12 sm:py-16 lg:py-20">
        <Breadcrumb items={breadcrumbs} />
        <div className={cn("mt-10 grid gap-10", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(aside && "lg:col-span-7")}>
            <div className="flex items-center gap-4">
              {number && <span className="font-mono text-small text-accent-text">{number}</span>}
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            </div>
            <h1 className="mt-5 max-w-[22ch] font-heading text-h1 leading-tight font-semibold tracking-tight text-foreground">{title}</h1>
            {description && <Lead className="mt-6 max-w-2xl">{description}</Lead>}
            {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </Container>
      {ink && <div className="rule-gold" aria-hidden="true" />}
    </section>
  );
}
