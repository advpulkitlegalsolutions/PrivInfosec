import { Suspense } from "react";
import { CalendarDays, Clock, Mail, ShieldCheck } from "lucide-react";
import { LinkedInIcon } from "@/components/brand/social-icons";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation with PrivInfosec Consulting about privacy, information security, governance or risk support — including Virtual DPO and retainer arrangements.",
  path: "/contact",
});

const bookingLabel: Record<string, string> = { calendly: "Calendly", cal: "Cal.com", other: "our booking page" };

export default function ContactPage() {
  const { email, social, booking } = siteConfig;
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Let’s solve your privacy, security or governance challenge."
        description="Share a little about your organisation and what you need. We will come back to you to discuss next steps."
      />
      <Section aria-label="Contact form and details">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="min-h-[40rem]" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:col-span-5" aria-label="Other ways to reach us">
            <Card className="p-6 sm:p-7">
              <CalendarDays aria-hidden="true" className="size-6 text-accent-text" strokeWidth={1.5} />
              <h2 className="mt-5 font-heading text-h4 font-semibold text-foreground">Book a consultation</h2>
              <p className="mt-2 text-small text-muted-foreground">
                Prefer to talk first? Choose a time for an introductory call.
              </p>
              {booking.url && booking.provider !== "none" ? (
                <ButtonLink href={booking.url} className="mt-5 w-full sm:w-auto" external>
                  Schedule via {bookingLabel[booking.provider] ?? "booking page"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </ButtonLink>
              ) : (
                <p className="mt-5 rounded-md border border-dashed border-border-strong p-3 text-caption text-muted-foreground">
                  Online booking will be available here soon. In the meantime, use the form and we will propose times.
                </p>
              )}
            </Card>
            <Card className="p-6 sm:p-7">
              <h2 className="font-heading text-h4 font-semibold text-foreground">Direct contact</h2>
              <ul className="mt-5 space-y-4 text-small">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-subtle-foreground hover:text-foreground">
                      <Mail aria-hidden="true" className="size-4 text-accent-text" /> {email}
                    </a>
                  </li>
                )}
                {social.linkedin && (
                  <li>
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-subtle-foreground hover:text-foreground">
                      <LinkedInIcon className="size-4 text-accent-text" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                {!email && !social.linkedin && <li className="text-muted-foreground">Email and LinkedIn details will be published here.</li>}
              </ul>
            </Card>
            <Card variant="muted" className="space-y-4 p-6 sm:p-7">
              {siteConfig.responseCommitment && (
                <p className="flex items-start gap-3 text-small text-subtle-foreground">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" />
                  {siteConfig.responseCommitment}
                </p>
              )}
              <p className="flex items-start gap-3 text-small text-subtle-foreground">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" />
                Your details are used only to respond to your enquiry. Please do not include confidential or personal data about others in
                your message.
              </p>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
