import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { ctas } from "@/config/site";

export default function NotFound() {
  return (
    <section data-theme="dark" data-band="ink" className="relative isolate bg-background text-foreground">
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 -z-10" />
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <Eyebrow>404 · Page not found</Eyebrow>
        <h1 className="mt-6 font-heading text-h1 font-semibold tracking-tight text-foreground">This page could not be found.</h1>
        <Lead className="mt-5 max-w-xl">The page may have moved, or the link may be incorrect.</Lead>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href={ctas.secondary.href} variant="outline">
            {ctas.secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
