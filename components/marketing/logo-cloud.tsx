import Image from "next/image";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { clients, clientSection, type Client } from "@/data/clients";
import { cn } from "@/lib/utils";

/** Clients that may be displayed, honouring visibility rules. */
export function getDisplayClients(featuredOnly = true) {
  return clients.filter(
    (c) =>
      c.visibility !== "hidden" &&
      (!featuredOnly || c.featured) &&
      (!c.placeholder || siteConfig.showContentPlaceholders),
  );
}

function ClientMark({ client, tone }: { client: Client; tone: "light" | "dark" }) {
  if (client.placeholder) {
    return (
      <div className="flex h-12 w-36 items-center justify-center rounded-md border border-dashed border-border-strong bg-surface-2 sm:w-40">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">Logo</span>
      </div>
    );
  }
  if (client.visibility === "anonymous" || !client.logo) {
    return (
      <div className="flex h-12 items-center px-2 text-small font-medium whitespace-nowrap text-muted-foreground">
        {client.visibility === "anonymous" ? client.anonymousLabel : client.name}
      </div>
    );
  }
  const src = tone === "dark" && client.logoDark ? client.logoDark : client.logo;
  const img = (
    <Image
      src={src}
      alt={client.name}
      width={160}
      height={48}
      className={cn(
        "h-10 w-auto object-contain transition duration-300",
        client.logoVariant !== "original" && "opacity-70 grayscale hover:opacity-100 hover:grayscale-0 dark:invert",
      )}
    />
  );
  return client.url ? (
    <a href={client.url} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center">
      {img}
    </a>
  ) : (
    <div className="flex h-12 items-center">{img}</div>
  );
}

/**
 * Editable client logo strip (data/clients.ts). Supports monochrome or
 * original-colour logos on light or dark bands. Renders nothing when there
 * are no approved entries and placeholders are disabled.
 */
export function LogoCloud({
  heading = clientSection.heading,
  tone = "light",
  className,
}: {
  heading?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const items = getDisplayClients();
  if (items.length === 0) return null;
  const hasPlaceholders = items.some((c) => c.placeholder);
  const animate = !hasPlaceholders && items.length >= 6;

  return (
    <section aria-labelledby="clients-heading" className={cn("border-b border-border bg-background py-12 sm:py-14", className)}>
      <Container size="wide">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="clients-heading" className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">
            {heading}
          </h2>
          {hasPlaceholders && <PlaceholderBadge>Placeholder logos — replace with approved clients</PlaceholderBadge>}
        </div>
        {animate ? (
          <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <ul className="animate-marquee flex w-max items-center gap-14">
              {[...items, ...items].map((c, i) => (
                <li key={`${c.name}-${i}`} aria-hidden={i >= items.length ? true : undefined}>
                  <ClientMark client={c} tone={tone} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {items.map((c, i) => (
              <li key={`${c.name}-${i}`}>
                <ClientMark client={c} tone={tone} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
