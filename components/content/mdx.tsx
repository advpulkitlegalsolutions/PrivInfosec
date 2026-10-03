import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Alert } from "@/components/ui/alert";

/**
 * MDX renderer for trusted, repository-authored content. JavaScript
 * expressions are blocked (next-mdx-remote default `blockJS: true`), so
 * content can use Markdown and the whitelisted components below only.
 */
const components = {
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div role="region" aria-label="Table" tabIndex={0} className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Callout: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <Alert variant="info" title={title} className="not-prose my-8">
      {children}
    </Alert>
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-pi">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
