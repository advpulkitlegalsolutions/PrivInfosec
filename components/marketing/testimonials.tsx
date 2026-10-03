import Image from "next/image";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/config/site";
import { approvedTestimonials, placeholderTestimonials, type Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isPlaceholder = testimonial.permissionStatus !== "approved";
  return (
    <Card as="article" className="flex h-full flex-col p-7 sm:p-8">
      <div className="flex items-center justify-between">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {isPlaceholder && <PlaceholderBadge>Development placeholder</PlaceholderBadge>}
      </div>
      <blockquote className="mt-6 flex-1 font-heading text-h4 leading-[1.45] font-normal text-foreground">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <footer className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        {testimonial.photo && (
          <Image src={testimonial.photo} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
        )}
        <div>
          <p className="text-small font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-caption text-muted-foreground">
            {testimonial.designation}
            {testimonial.showCompany !== false && `, ${testimonial.company}`}
          </p>
        </div>
      </footer>
    </Card>
  );
}

/**
 * Renders ONLY approved testimonials. While none exist, clearly labelled
 * development placeholders appear if placeholders are enabled; otherwise
 * the section is omitted entirely.
 */
export function TestimonialsSection() {
  const approved = approvedTestimonials().filter((t) => t.featured);
  const items = approved.length ? approved : siteConfig.showContentPlaceholders ? placeholderTestimonials() : [];
  if (!items.length) return null;
  return (
    <Section aria-labelledby="testimonials-heading">
      <SectionHeader eyebrow="Client perspectives" id="testimonials-heading" title="In our clients’ words" />
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((t, i) => (
          <li key={i}>
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
