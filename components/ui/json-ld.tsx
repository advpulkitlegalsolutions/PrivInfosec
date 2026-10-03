/**
 * Renders Schema.org JSON-LD. Data is produced by our own builders
 * (lib/seo.ts) — never raw user input — and "<" is escaped so the payload
 * cannot break out of the script element (per Next.js guidance).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
