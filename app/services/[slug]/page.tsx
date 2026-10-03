import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getServiceBySlug, services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

/** Every service in data/services.ts gets a statically generated page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.seo.title,
    absoluteTitle: true,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
