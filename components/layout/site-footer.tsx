import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LinkedInIcon } from "@/components/brand/social-icons";
import { CookiePreferencesButton } from "@/components/privacy/cookie-preferences-button";
import { Container } from "@/components/ui/container";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">{title}</h2>
      <ul className="mt-5 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex min-h-9 items-center text-small text-subtle-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { email, phone, location, social } = siteConfig;

  return (
    <footer data-theme="dark" data-band="ink" className="relative bg-background text-foreground">
      <div className="rule-gold" aria-hidden="true" />
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 font-heading text-h4 font-semibold text-foreground">{siteConfig.tagline}</p>
            <p className="mt-3 max-w-sm text-small text-muted-foreground">{siteConfig.description}</p>

            <ul className="mt-8 space-y-3 text-small">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-subtle-foreground hover:text-foreground">
                    <Mail aria-hidden="true" className="size-4 text-accent-text" />
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 text-subtle-foreground hover:text-foreground">
                    <Phone aria-hidden="true" className="size-4 text-accent-text" />
                    {phone}
                  </a>
                </li>
              )}
              {location && (
                <li className="inline-flex items-center gap-3 text-subtle-foreground">
                  <MapPin aria-hidden="true" className="size-4 text-accent-text" />
                  {location}
                </li>
              )}
              {!email && !phone && (
                <li>
                  <Link href="/contact" className="text-subtle-foreground underline decoration-accent underline-offset-4 hover:text-foreground">
                    Get in touch via our contact form
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <FooterColumn title="Services" links={footerNav.services} />
            </div>
            <FooterColumn title="Company" links={footerNav.company} />
            <div>
              <FooterColumn title="Legal" links={footerNav.legal} />
              <div className="mt-1">
                <CookiePreferencesButton className="inline-flex min-h-9 items-center text-small text-subtle-foreground transition-colors hover:text-foreground" />
              </div>
              {social.linkedin && (
                <div className="mt-8">
                  <h2 className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">Social</h2>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex size-10 items-center justify-center rounded-md border border-border text-subtle-foreground transition-colors hover:border-border-accent hover:text-foreground"
                    aria-label={`${siteConfig.name} on LinkedIn (opens in a new tab)`}
                  >
                    <LinkedInIcon className="size-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
