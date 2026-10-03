# PrivInfosec Consulting — Website

**Your Trusted Arm.** Corporate website for PrivInfosec Consulting: practical advisory and implementation support across data privacy, information security, technology and compliance risk.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Zod 4 · React Hook Form · Lucide · MDX (next-mdx-remote) · pnpm
- **Rendering:** every page is statically generated; only `/api/contact` runs on the server.
- **Design system:** token-driven (`styles/tokens.css`, `config/theme.ts`), dark-only theme, reference page at `/design-system` (development only).

---

## Contents

1. [Setup](#setup)
2. [Project structure](#project-structure)
3. [Theme & design system](#theme--design-system)
4. [Editing content](#editing-content)
5. [Environment variables](#environment-variables)
6. [Contact form & lead delivery](#contact-form--lead-delivery)
7. [Privacy, cookies & analytics](#privacy-cookies--analytics)
8. [Security](#security)
9. [SEO](#seo)
10. [Quality checks](#quality-checks)
11. [Launch checklist](#launch-checklist)

---

## Setup

Requirements: Node.js ≥ 20.9 and pnpm 10.

```bash
pnpm install            # install dependencies
cp .env.example .env.local
pnpm dev                # http://localhost:3000
```

| Task | Command |
| --- | --- |
| Development server | `pnpm dev` |
| Type-check (generates route types first) | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Production build | `pnpm build` |
| Run production build | `pnpm start` |
| Everything above in sequence | `pnpm check` |
| Accessibility / overflow / console / link sweep | `BASE_URL=http://localhost:3000 pnpm qa` (against a running server) |

Deploy on any Node.js host that supports Next.js (Vercel, a container, etc.). Set the environment variables below in the host’s dashboard — never commit them.

---

## Project structure

```
app/                     Routes (App Router). Pages are thin: they compose components with data.
  services/[slug]/       One template for all four service pages (generated from data/services.ts)
  insights/[slug]/       Articles from content/insights/*.mdx
  case-studies/[slug]/   Case studies from content/case-studies/*.mdx
  api/contact/           Contact form endpoint (validation, rate limit, bot checks, delivery)
  design-system/         Development-only design reference
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/
  ui/                    Primitives: Button, Card, Badge, Section, Container, Typography, Form fields,
                         Accordion, Tabs, Modal/Drawer, Breadcrumb, Alert, Reveal, JsonLd
  layout/                SiteHeader, MegaMenu, MobileMenu, SiteFooter, ThemeToggle
  marketing/             Page sections and cards (Hero, ServiceCard, PricingCard, LogoCloud, CTASection …)
  services/              ServicePageTemplate
  forms/                 ContactForm
  content/               MDX renderer, Insights browser, Legal page layout
  privacy/               Consent manager (banner, preferences, consent-gated analytics)
  brand/                 Logo (replaceable), social icons
config/                  site.ts · theme.ts · navigation.ts · analytics.ts
data/                    All editable business content (see below)
content/                 MDX: insights/, case-studies/
lib/                     seo, icons, pricing formatter, content loaders, validation, security, lead providers
styles/                  tokens.css (design tokens) · globals.css (Tailwind bridge, base styles)
public/                  brand/, clients/, icons/, images/
scripts/qa.mjs           Automated QA sweep (Playwright + axe-core)
```

Server Components are the default. Client Components are limited to the header/menus, theme toggle, tabs/filters, scroll reveal, the contact form and the consent manager.

---

## Theme & design system

All visual decisions come from **`styles/tokens.css`**, organised in three layers so the theme can be changed in one place:

1. **Brand** (`--brand-*`) — raw identity values: gold (`--brand-gold #C99A3D`, `--brand-gold-light #E2BE6A` …), the near-black → charcoal ladder, warm whites/greys, muted functional colours, and the metallic `--gradient-gold`.
2. **Semantic** (`--background`, `--foreground`, `--surface-*`, `--border*`, `--accent*`, `--muted-foreground` …) — what components use.
3. **Component** (`--nav-*`, `--button-*`, `--card-*`, `--input-*`, `--badge-*`, `--footer-*`) — per-component decisions.

Components use semantic/component Tailwind utilities (`bg-card`, `border-card-border`, `text-muted-foreground`, `text-accent-text`, `text-h2`, `rounded-lg`, `py-section-md` …) — never raw hex values. The default Tailwind colour palette is deliberately disabled, so an arbitrary colour utility will not compile into the CSS.

**Brand rules.** Roughly 70% black/charcoal, 20% warm white/grey, 10% gold. Gold is for primary CTAs, eyebrow labels, active states, key stats, focus rings and thin rules — never paragraphs, large fills or every border. Metallic gradients (`text-metal`, `--gradient-gold`) are reserved for the hero highlight, headline statistics and the logo. Icons are neutral grey by default and turn gold on hover. Prefer borders and tonal surfaces over shadows; no glows.

| Want to change… | Edit |
| --- | --- |
| **Gold** | `--brand-gold*` in `styles/tokens.css`. `--accent` (fills) is `#C99A3D`; `--accent-text` (gold as small text/icons) is `#E2BE6A` for AA contrast on black. Never use `--brand-gold-dark` for small text. Re-check WCAG AA if you change these. |
| **Backgrounds & surfaces** | `--brand-black-*` and the semantic mapping (`--background #070707`, `--surface-2 #101010`, cards `#171717`, raised `#222222`, footer `#050505`). Alternate sections (`tone="muted"`) fade in/out via `--gradient-section` to avoid stripes; premium bands (`tone="ink"`, hero) use the subtle `--ambient-gold`. |
| **Text colours** | `--foreground` (headings `#F4F2ED`), `--subtle-foreground` (body `#C7C4BD`), `--muted-foreground` (supporting `#918E88`), `--nav-link` (`#B9B6AF`). |
| **Buttons, cards, inputs, nav, badges, footer** | The component layer (`--button-*`, `--card-*`, `--input-*`, `--nav-*`, `--badge-*`, `--footer-*`). |
| **Future light theme** | Re-map the semantic and component layers under `[data-theme="light"]` (a commented starter is in `tokens.css`) and switch the `data-theme` on `<html>` in `app/layout.tsx`. No component changes needed. |
| **Fonts** | `app/fonts.ts` — Rethink Sans (variable) for everything: wordmark, headings, body, nav, buttons, forms, labels. Weights: 400 body, 500 nav/labels, 600 headings/buttons, 700 hero emphasis; avoid 800–900. `--font-display / --font-heading / --font-body` in the `@theme` block point at it; `--font-mono` is a system monospace for code only. |
| **Type scale** | `--text-*` (with default `--text-*--line-height`), `--leading-*`, `--tracking-*` in the `@theme` block. Hero: `text-display` (600, line-height 1.02, −0.04em); sections: `text-h2` (600, 1.1, −0.03em); card titles: `text-h4`; eyebrows: `text-eyebrow` 600 uppercase `tracking-eyebrow` (0.12em). If you add a new size token, also add its name to `extendTailwindMerge` in `lib/utils.ts`. |
| **Radius** | `--radius-*` in the `@theme` block (`md` 9px buttons/inputs, `lg` 14px cards, `xl` 18px panels). |
| **Spacing** | Tailwind’s numeric scale uses a 4px base (`--spacing: 0.25rem`); section rhythm uses `--spacing-section-sm/md/lg` (`py-section-md`). Raw `--space-*` tokens are available for hand-written CSS. |
| **Content width** | `--layout-prose` (68ch, long-form copy) and `--layout-measure` (58ch, section descriptions). |
| **Shadows** | `--elevation-md/lg` — only for floating layers (menus, dialogs, consent banner). |
| **Layout widths, header height** | `--layout-*` tokens. |
| **Motion** | `--duration-*` (180–350ms), `--ease-*`; keyframes at the end of `styles/globals.css`. All motion is disabled under `prefers-reduced-motion`. |

**Bands.** `<Section tone="ink">` (hero-style premium bands, Virtual DPO feature, final CTA) adds the understated gold ambience; `tone="muted"` is the blended alternate surface. The footer uses the deepest tone (`--footer-bg`) with a thin gold top border.

**Dark-only.** There is no theme switcher. `lib/theme.ts` only adds the `js` class before first paint (used by scroll reveals), and `config/theme.ts` holds the browser `theme-color`.

**Logo.** `components/brand/logo.tsx` holds a vector redraw of the black-and-gold "P" monogram plus the Rethink Sans wordmark ("Priv" in ink, "Infosec" in gold via `--gradient-wordmark`). The mark's ink parts use `currentColor`, so it adapts automatically. The header, mobile menu and footer all render `<Logo />`; the hero illustration embeds the same artwork. On dark backgrounds the ink parts render warm white (the light logo version), keeping separation from the black. Static copies of the mark: `app/icon.svg` (favicon), `public/brand/logo-mark.svg` (on a near-black tile), `public/brand/logo-mark-light.svg` (transparent, for dark backgrounds) and `public/brand/logo-mark-transparent.svg` (transparent, charcoal ink, for light backgrounds); `app/opengraph-image.tsx` embeds `logo-mark.svg`.

**Reference page.** Run `pnpm dev` and open `/design-system` (colours, typography, spacing, radius, buttons, forms, cards, badges, icons, tables, alerts, navigation, pricing/service cards, framework badges, dark theme preview). It returns 404 in production unless `ENABLE_DESIGN_SYSTEM=true`, is `noindex`, and is disallowed in `robots.txt`.

---

## Editing content

Business content lives in typed data files — no JSX changes are needed for routine updates.

| Content | File | Notes |
| --- | --- | --- |
| **Company details** (email, phone, location, LinkedIn, booking URL, legal name) | `config/site.ts` | Empty values are hidden automatically. |
| **Navigation** | `config/navigation.ts` | Service links are generated from `data/services.ts`. |
| **Services** | `data/services.ts` | Exactly four approved practices. Each object drives its card, page, menu entry, sitemap URL, form option and structured data. |
| **Virtual / Fractional DPO feature** | `virtualDpo` in `data/services.ts` | Sits within DPO & Privacy Services, not a separate service. |
| **Pricing** | `data/pricing.ts` | The only place monetary values exist. Set `SHOW_PUBLIC_PRICING = false` to show “Custom engagement” instead of figures without changing layout. |
| **Clients / logos** | `data/clients.ts` + `public/clients/` | `visibility`: `public` (name/logo), `anonymous` (shows `anonymousLabel`, e.g. “Financial Services Organisation”), `hidden`. `logoVariant`: `mono` (tinted, adapts to dark mode) or `original`; optional `logoDark` file. Only add organisations with written permission. |
| **Testimonials** | `data/testimonials.ts` | Only `permissionStatus: "approved"` entries are ever rendered as testimonials. |
| **Team / founder** | `data/team.ts` + `public/images/team/` | `name, title, image, shortBio, longBio[], qualifications[], recognitions[], areasOfExpertise[], linkedin, featured`. Leave arrays empty rather than guessing. |
| **Statistics** | `data/companyStats.ts` | Only entries with `verified: true` render. |
| **Industries** | `data/industries.ts` | Title, icon, summary, risk themes, related services. |
| **Frameworks / regulations** | `data/frameworks.ts` | Add an object; set `category` (new categories appear in the filter automatically) and `serviceIds` to show it on relevant service pages. Frameworks are never services. |
| **Engagement models** | `data/engagementModels.ts` | Exactly four. Also feeds contact form options. |
| **Why PrivInfosec pillars** | `data/differentiators.ts` | |
| **Problem framing, approach stages** | `data/problems.ts` | |
| **Values & beliefs (About)** | `data/values.ts` | |
| **Icons** | `lib/icons.tsx` | Data files reference icons by id (e.g. `"shield-user"`); add new Lucide icons to the registry. |

### Adding a service later

Append an object to `services` in `data/services.ts`. `/services/<slug>` is generated by the shared `ServicePageTemplate`, and navigation, footer, sitemap, related links and the contact-form options update automatically. Future categories (e.g. AI Governance) should only be added once approved.

### Insights (knowledge hub)

Create `content/insights/<slug>.mdx`:

```mdx
---
title: "Article title"
excerpt: "One or two sentence summary."
author: "PrivInfosec Consulting"
publicationDate: "2026-10-01"
updatedDate: "2026-10-15"        # optional
category: "DPDP"                 # Privacy | Information Security | Governance | Risk | DPDP | GDPR | ISO 27001 | ISO 27701 | SOC 2
contentType: "Guide"             # Article | Regulatory Update | Guide | Checklist | Whitepaper
tags: ["DPDP", "Privacy"]
featuredImage: "/images/insights/example.jpg"   # optional
featuredImageAlt: "Description"                  # optional
seoTitle: "Optional SEO title"
seoDescription: "Optional SEO description"
draft: false
---

Markdown content. Tables (GFM) and a `<Callout title="…">` component are supported.
```

Front matter is validated with Zod at build time (`lib/content/schema.ts`); invalid files fail the build with a clear message. Reading time is calculated automatically. Files starting with `_` are ignored.

**Moving to a CMS:** replace the functions in `lib/content/insights.ts` and `lib/content/caseStudies.ts` with CMS queries returning the same shapes. Pages do not need to change.

### Case studies

Create `content/case-studies/<slug>.mdx` with front matter: `title, client, anonymisedClient, industry, region, summary, challenge, approach[], implementation[], services[] (service ids), outcomes[], metrics[] ({label, value} — verified only), quote ({text, attribution, permissionStatus}), featured, visibility (public | anonymous | hidden), placeholder`. Pages render Challenge → Approach → Implementation → Outcome. The client name is only shown when `visibility: public`; quotes only when `permissionStatus: approved`.

### Legal pages

`app/privacy`, `app/cookies`, `app/terms` contain structured templates with `[bracketed]` items to confirm. They display a “review required” notice until edited.

---

## Environment variables

See `.env.example` for the full list. Variables prefixed `NEXT_PUBLIC_` are visible in the browser — never put secrets in them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, structured data |
| `NEXT_PUBLIC_DEPLOY_ENV` | `production` allows indexing; anything else disallows all crawlers |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email |
| `NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS` | `false` hides all placeholder content (set before launch) |
| `ENABLE_DESIGN_SYSTEM` | `true` exposes `/design-system` in production |
| `NEXT_PUBLIC_BOOKING_PROVIDER`, `NEXT_PUBLIC_BOOKING_URL` | Calendly / Cal.com booking link on `/contact` |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` + Plausible/Umami vars | Consent-gated, privacy-friendly analytics |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile bot protection |
| `LEAD_PROVIDERS` | Comma-separated lead destinations: `console` (dev only), `email`, `webhook`, `hubspot`, `zoho`, `salesforce` |
| `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` | Email delivery (server-only) |
| `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` | Signed webhook delivery (server-only) |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID` | HubSpot Forms API (server-only) |
| `ZOHO_*`, `SALESFORCE_*` | Reserved for the stubbed CRM adapters |

Analytics and Turnstile origins are added to the Content-Security-Policy automatically when configured (booking links open the provider in a new tab, so no CSP change is needed). Rebuild after changing `NEXT_PUBLIC_*` values (they are inlined at build time).

---

## Contact form & lead delivery

`components/forms/contact-form.tsx` → `POST /api/contact` (`app/api/contact/route.ts`).

Protections, in order:

1. Same-origin check, JSON content-type and 16 KB body limit.
2. Rate limit: 5 submissions per IP per 10 minutes (`lib/security/rate-limit.ts`). The default store is in-memory — on serverless or multi-instance hosting, swap in a shared store (e.g. Upstash Redis) implementing `RateLimitStore`.
3. Authoritative Zod validation (`lib/validation/contact.ts`), shared with the client for instant feedback. Markup characters are rejected outright.
4. Bot checks: honeypot field, minimum fill time (3s), maximum form age, and optional Turnstile. Suspected bots receive a generic success response and nothing is delivered.
5. Sanitisation (`lib/security/sanitize.ts`): control/zero-width/bidi characters stripped, HTML escaped for email, spreadsheet-formula injection neutralised for CRMs.
6. Delivery to every configured provider (`lib/leads/`). The request succeeds if at least one provider accepts the lead; failures are logged without personal data. In production, if no provider is configured the form shows an error rather than silently losing enquiries.

**Adding a CRM:** implement `LeadProvider` (`lib/leads/types.ts`) in `lib/leads/providers.ts`, register it in `lib/leads/index.ts`, and add its id to `LEAD_PROVIDERS`. The form and API route do not change. Zoho CRM and Salesforce adapters are stubbed (they need an OAuth flow) and throw until implemented.

The webhook provider signs bodies with `X-PrivInfosec-Signature: sha256=<HMAC of body>` when `LEAD_WEBHOOK_SECRET` is set.

---

## Privacy, cookies & analytics

- No analytics, advertising or third-party trackers load by default.
- When `NEXT_PUBLIC_ANALYTICS_PROVIDER` is set (Plausible or Umami), a consent banner appears; the script is injected **only after opt-in**, and withdrawing consent reloads the page so it is no longer present (`components/privacy/consent-manager.tsx`).
- With no analytics configured, no banner is shown (nothing optional to consent to). Cookie Preferences remain available from the footer and the Cookie Notice.
- Consent is stored under `pi-consent` (versioned — bump `CONSENT_VERSION` in `lib/consent.ts` to re-ask after material changes). It is listed in the Cookie Notice.
- If Google Analytics is ever added, load it through the same consent-gated path in the consent manager.

---

## Security

- Security headers on every route (`lib/security/headers.ts`, wired in `next.config.ts`): Content-Security-Policy, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`, and HSTS in production. `X-Powered-By` is disabled.
- **CSP note:** pages are statically generated for performance, so the CSP uses `'unsafe-inline'` for scripts (Next.js inlines hydration data). Everything else is locked to `'self'`, with `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'` and `form-action 'self'`. If stricter CSP is required, adopt the nonce-based pattern from the bundled Next.js docs (`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`) using `proxy.ts` — this makes every page dynamically rendered.
- Secrets are only read in server-only modules (`import "server-only"`). Nothing secret is prefixed `NEXT_PUBLIC_`.
- `dangerouslySetInnerHTML` is used in exactly two places, both with trusted static content: the theme bootstrap script (a constant string) and JSON-LD (escaped `JSON.stringify` output from `lib/seo.ts`).
- MDX is rendered with JavaScript expressions blocked (`next-mdx-remote` default).
- Keep dependencies current: `pnpm outdated` and `pnpm audit` regularly.

---

## SEO

- Per-page metadata via `createMetadata()` (`lib/seo.ts`): title, description, canonical, Open Graph and X/Twitter cards. A branded OG image is generated at build time (`app/opengraph-image.tsx`).
- `sitemap.xml` and `robots.txt` generated from data (`app/sitemap.ts`, `app/robots.ts`).
- Schema.org JSON-LD: `Organization` + `ProfessionalService` and `WebSite` (site-wide), `Service` (service pages), `BreadcrumbList` (inner pages), `Article` (insights), and `FAQPage` only where visible FAQ content exists (service and pricing pages).
- Answer-engine friendly structure: each service page opens with a plain-language definition, semantic heading hierarchy, concise FAQs.

---

## Quality checks

```bash
pnpm check                                   # typegen + tsc + ESLint + production build
pnpm build && pnpm start &                   # then, in another terminal:
BASE_URL=http://localhost:3000 pnpm qa       # needs Playwright's Chromium (CHROMIUM_PATH to override)
```

`scripts/qa.mjs` visits every route at 320–1920px (dark theme) and fails on console/page errors, failed requests, horizontal overflow, axe-core WCAG 2.2 AA violations, and broken internal links.

---

## Launch checklist

Content that must be supplied or confirmed before going live:

- [ ] `config/site.ts`: legal entity name, contact email, phone/WhatsApp, location, LinkedIn URL, response commitment.
- [ ] Booking link (`NEXT_PUBLIC_BOOKING_PROVIDER`, `NEXT_PUBLIC_BOOKING_URL`).
- [ ] Final logo SVG (`components/brand/logo.tsx`, `app/icon.svg`, `public/brand/logo-mark.svg`).
- [ ] Approved client logos / anonymised labels in `data/clients.ts` (remove placeholders).
- [ ] Approved testimonials in `data/testimonials.ts`.
- [ ] Founder / leadership profile in `data/team.ts` (verified qualifications and recognition only).
- [ ] Verified statistics, if any, in `data/companyStats.ts`.
- [ ] Approved case studies in `content/case-studies/` (remove or hide the template).
- [ ] Privacy Notice, Cookie Notice and Terms reviewed and completed by counsel.
- [ ] Confirm published prices in `data/pricing.ts` (or set `SHOW_PUBLIC_PRICING = false`).
- [ ] Lead delivery configured (`LEAD_PROVIDERS` + provider variables) and a test enquiry received.
- [ ] `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEPLOY_ENV=production`, `NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS=false`.
- [ ] Optional: analytics provider, Turnstile keys, shared rate-limit store for serverless hosting.
