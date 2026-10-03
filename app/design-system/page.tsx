import { notFound } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { FrameworkBadge, FrameworkCard } from "@/components/marketing/framework-badge";
import { IndustryCard } from "@/components/marketing/industry-card";
import { PricingCard } from "@/components/marketing/pricing-card";
import { ServiceCard } from "@/components/marketing/service-card";
import { TestimonialCard } from "@/components/marketing/testimonials";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Badge, PlaceholderBadge } from "@/components/ui/badge";
import { Button, ButtonLink, IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/form";
import { Body, Caption, Display, Eyebrow, H1, H2, H3, H4, Lead, Small } from "@/components/ui/typography";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { colorTokens, radiusScale, spacingScale, typeScale } from "@/config/theme";
import { frameworks } from "@/data/frameworks";
import { industries } from "@/data/industries";
import { pricingTiers } from "@/data/pricing";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { icons } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";
import { DesignSystemTabsDemo } from "./tabs-demo";

/**
 * Development-only design-system reference. Hidden in production unless
 * ENABLE_DESIGN_SYSTEM=true, never linked from navigation, and noindex.
 */
export const metadata = createMetadata({ title: "Design System", path: "/design-system", noIndex: true });

const enabled = process.env.NODE_ENV !== "production" || process.env.ENABLE_DESIGN_SYSTEM === "true";

function Block({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-border py-14">
      <h2 id={`${id}-h`} className="font-mono text-eyebrow uppercase tracking-eyebrow text-accent-text">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Swatches() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {colorTokens.map((c) => (
        <li key={c.token} className="overflow-hidden rounded-md border border-border bg-surface-1">
          <div className="h-14 border-b border-border" style={{ background: `var(${c.token})` }} />
          <div className="p-3">
            <p className="font-mono text-caption text-foreground">{c.token}</p>
            <p className="text-caption text-muted-foreground">{c.usage}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ThemePreview({ theme }: { theme: "light" | "dark" }) {
  return (
    <div data-theme={theme} className="rounded-xl border border-border bg-background p-6 text-foreground">
      <p className="font-mono text-caption uppercase tracking-eyebrow text-muted-foreground">{theme} theme</p>
      <H3 className="mt-4">Practical governance for real businesses.</H3>
      <Body className="mt-2">Body copy on the page background uses foreground and muted-foreground tokens.</Body>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Badge variant="accent">Accent badge</Badge>
      </div>
      <div className="mt-5">
        <Swatches />
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  if (!enabled) notFound();
  const nav = ["colours", "themes", "typography", "spacing", "radius", "buttons", "forms", "cards", "badges", "icons", "tables", "alerts", "navigation", "pricing", "services", "frameworks"];

  return (
    <Container size="wide" className="py-14">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>Development only</Eyebrow>
          <H1 className="mt-4">Design System</H1>
          <Lead className="mt-3 max-w-2xl">
            Tokens live in <code className="font-mono text-foreground">styles/tokens.css</code>; theme behaviour and token indexes in{" "}
            <code className="font-mono text-foreground">config/theme.ts</code>. Every component below uses semantic tokens only.
          </Lead>
        </div>
        <ThemeToggle />
      </div>

      <nav aria-label="Design system sections" className="mt-10 flex flex-wrap gap-2">
        {nav.map((n) => (
          <a key={n} href={`#${n}`} className="rounded-pill border border-border px-3 py-1 text-caption capitalize text-muted-foreground hover:text-foreground">
            {n}
          </a>
        ))}
      </nav>

      <Block title="Colours (current theme)" id="colours">
        <Swatches />
      </Block>

      <Block title="Light & dark themes" id="themes">
        <div className="grid gap-6 lg:grid-cols-2">
          <ThemePreview theme="light" />
          <ThemePreview theme="dark" />
        </div>
      </Block>

      <Block title="Typography" id="typography">
        <div className="space-y-6">
          <Display as="p">Display — Your Trusted Arm.</Display>
          <H1 as="p">H1 — From obligation to operation.</H1>
          <H2 as="p">H2 — Practical governance for real businesses.</H2>
          <H3 as="p">H3 — Expertise when you need it.</H3>
          <H4 as="p">H4 — Implementation where it matters.</H4>
          <Lead>Lead — Practical advisory and implementation support across privacy, security and compliance risk.</Lead>
          <Body>Body — Requirements must become real processes, controls, systems and evidence.</Body>
          <Small>Small — Supporting text and metadata.</Small>
          <Caption>Caption — Footnotes and fine print.</Caption>
          <Eyebrow>Eyebrow label</Eyebrow>
        </div>
        <table className="mt-10 w-full text-left text-small">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 font-medium">Style</th>
              <th className="py-2 font-medium">Token</th>
            </tr>
          </thead>
          <tbody>
            {typeScale.map((t) => (
              <tr key={t.token} className="border-b border-border">
                <td className="py-2 text-foreground">{t.name}</td>
                <td className="py-2 font-mono text-caption text-muted-foreground">{t.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      <Block title="Spacing (4px base)" id="spacing">
        <ul className="space-y-3">
          {spacingScale.map((s) => (
            <li key={s.name} className="flex items-center gap-4">
              <span className="w-12 font-mono text-caption text-muted-foreground">{s.name}</span>
              <span className="h-3 rounded-xs bg-accent" style={{ width: `var(${s.token})` }} />
              <span className="font-mono text-caption text-muted-foreground">
                {s.px}px · {s.token} · tw “{s.tw}”
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Radius" id="radius">
        <ul className="flex flex-wrap gap-4">
          {radiusScale.map((r) => (
            <li key={r} className="text-center">
              <div className="size-20 border border-border-accent bg-accent-soft" style={{ borderRadius: `var(--radius-${r})` }} />
              <p className="mt-2 font-mono text-caption text-muted-foreground">{r}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Buttons" id="buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
          <ButtonLink href="/contact">
            With icon <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <IconButton label="Email">
            <Mail aria-hidden="true" />
          </IconButton>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Block>

      <Block title="Forms & inputs" id="forms">
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <Field id="ds-name" label="Name" required>
            <Input id="ds-name" placeholder="Jane Doe" />
          </Field>
          <Field id="ds-error" label="Work email" required error="Please enter a valid work email address.">
            <Input id="ds-error" aria-invalid aria-describedby="ds-error-error" defaultValue="not-an-email" />
          </Field>
          <Field id="ds-select" label="Service" required>
            <Select id="ds-select" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.id}>{s.title}</option>
              ))}
            </Select>
          </Field>
          <Field id="ds-phone" label="Phone" hint="Optional helper text.">
            <Input id="ds-phone" aria-describedby="ds-phone-hint" />
          </Field>
          <Field id="ds-msg" label="Message" required className="sm:col-span-2">
            <Textarea id="ds-msg" />
          </Field>
          <label className="flex items-start gap-3 text-small text-subtle-foreground sm:col-span-2">
            <Checkbox /> Consent checkbox label
          </label>
        </div>
      </Block>

      <Block title="Cards" id="cards">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <H4>Default card</H4>
            <Small className="mt-2">surface-1 + border</Small>
          </Card>
          <Card variant="muted" className="p-6">
            <H4>Muted card</H4>
            <Small className="mt-2">surface-2</Small>
          </Card>
          <Card interactive variant="accent" className="p-6">
            <H4>Interactive / accent</H4>
            <Small className="mt-2">Hover for lift</Small>
          </Card>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <IndustryCard industry={industries[0]} />
          <TestimonialCard testimonial={testimonials[0]} />
        </div>
      </Block>

      <Block title="Badges" id="badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="muted">Muted</Badge>
          <Badge variant="outline">Outline</Badge>
          <PlaceholderBadge />
        </div>
      </Block>

      <Block title="Icons (registry: lib/icons.tsx)" id="icons">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-10">
          {Object.entries(icons).map(([name, Cmp]) => (
            <li key={name} className="flex flex-col items-center gap-2 rounded-md border border-border p-3">
              <Cmp aria-hidden="true" className="size-5 text-accent-text" strokeWidth={1.5} />
              <span className="text-center font-mono text-[0.625rem] text-muted-foreground">{name}</span>
            </li>
          ))}
          <li className="flex flex-col items-center gap-2 rounded-md border border-border p-3">
            <LogoMark className="size-6 text-foreground" />
            <span className="font-mono text-[0.625rem] text-muted-foreground">logo-mark</span>
          </li>
        </ul>
      </Block>

      <Block title="Tables" id="tables">
        <div role="region" aria-label="Example table" tabIndex={0} className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[560px] text-left text-small">
            <thead className="bg-surface-2">
              <tr>
                <th className="p-4 font-medium text-foreground">Framework</th>
                <th className="p-4 font-medium text-foreground">Category</th>
                <th className="p-4 font-medium text-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f) => (
                <tr key={f.id} className="border-t border-border">
                  <td className="p-4 text-foreground">{f.name}</td>
                  <td className="p-4 text-muted-foreground">{f.category}</td>
                  <td className="p-4 text-muted-foreground">{f.kind}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Alerts" id="alerts">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert title="Information">Neutral informational message.</Alert>
          <Alert variant="success" title="Success">Your message has been received.</Alert>
          <Alert variant="warning" title="Warning">Placeholder content requires review.</Alert>
          <Alert variant="danger" title="Error">Your message was not sent.</Alert>
        </div>
      </Block>

      <Block title="Navigation patterns" id="navigation">
        <DesignSystemTabsDemo />
        <div className="mt-8 max-w-2xl">
          <Accordion>
            <AccordionItem title="Accordion item (native details/summary)">Zero-JS, keyboard accessible disclosure.</AccordionItem>
            <AccordionItem title="Second item">Use for FAQs and nested mobile navigation.</AccordionItem>
          </Accordion>
        </div>
      </Block>

      <Block title="Pricing cards" id="pricing">
        <ul className="grid gap-5 pt-3 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((t) => (
            <li key={t.id}>
              <PricingCard tier={t} compact />
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Service cards" id="services">
        <div className="grid gap-5 md:grid-cols-2">
          <ServiceCard service={services[0]} />
          <div className="grid gap-4">
            {services.slice(1).map((s) => (
              <ServiceCard key={s.id} service={s} variant="compact" />
            ))}
          </div>
        </div>
      </Block>

      <Block title="Framework badges" id="frameworks">
        <div className="flex flex-wrap gap-2">
          {frameworks.map((f) => (
            <FrameworkBadge key={f.id} name={f.name} />
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {frameworks.slice(0, 3).map((f) => (
            <FrameworkCard key={f.id} framework={f} />
          ))}
        </div>
      </Block>
    </Container>
  );
}
