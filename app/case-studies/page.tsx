import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { CTASection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/ui/section";
import { caseStudyClientLabel, getAllCaseStudies } from "@/lib/content/caseStudies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Case Studies",
  description: "Anonymised examples of how PrivInfosec Consulting supports organisations with privacy, security, governance and risk programmes.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const items = getAllCaseStudies();
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Case Studies", path: "/case-studies" }]}
        eyebrow="Experience"
        title="Case studies"
        description="Client confidentiality comes first. Case studies are published only with permission and are anonymised unless a client has agreed to be named."
      />
      <Section aria-label="Case studies">
        {items.length ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <li key={c.slug}>
                <CaseStudyCard caseStudy={{ ...c, clientLabel: caseStudyClientLabel(c) }} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-2xl text-muted-foreground">
            Approved case studies are being prepared. To discuss relevant experience for your requirement, please get in touch.
          </p>
        )}
      </Section>
      <CTASection />
    </>
  );
}
