import { PageHero } from "@/components/marketing/page-hero";
import { Alert } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/utils";

/** Shared layout for Privacy Notice, Cookie Notice and Terms. */
export function LegalPage({
  title,
  description,
  path,
  lastUpdated,
  children,
}: {
  title: string;
  description: string;
  path: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero tone="default" breadcrumbs={[{ name: title, path }]} eyebrow="Legal" title={title} description={description} />
      <Container size="prose" className="py-14 sm:py-20">
        <Alert variant="warning" title="Template — review required before launch">
          This page is a structured placeholder. It must be reviewed and completed by PrivInfosec Consulting (and its legal advisers)
          before the website is published. Items in [square brackets] require confirmation.
        </Alert>
        <p className="mt-8 text-caption text-muted-foreground">
          Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
        <div className="prose-pi mt-6">{children}</div>
      </Container>
    </>
  );
}
