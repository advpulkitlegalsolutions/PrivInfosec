import { cn } from "@/lib/utils";

/**
 * Typography primitives. All sizes, weights, line-heights and tracking
 * come from tokens (styles/tokens.css → @theme). Use `as` to keep the
 * correct heading level for document outline while choosing a visual size.
 */

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
type Props<T extends HeadingTag = HeadingTag> = React.HTMLAttributes<HTMLElement> & { as?: T };

export const typeStyles = {
  display:
    "font-display text-display font-semibold leading-display tracking-display text-foreground",
  h1: "font-display text-h1 font-semibold leading-tight tracking-tight text-foreground",
  h2: "font-display text-h2 font-semibold leading-tight tracking-tight text-foreground",
  h3: "font-heading text-h3 font-semibold leading-[1.2] tracking-snug text-foreground",
  h4: "font-heading text-h4 font-semibold leading-[1.3] tracking-[-0.01em] text-foreground",
  lead: "text-lead leading-relaxed text-subtle-foreground",
  body: "text-body leading-normal text-subtle-foreground",
  small: "text-small leading-normal text-muted-foreground",
  caption: "text-caption leading-normal text-muted-foreground",
  eyebrow: "text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text",
} as const;

const make = (style: keyof typeof typeStyles, fallback: HeadingTag) =>
  function Typography({ as, className, ...props }: Props) {
    const Tag = (as ?? fallback) as React.ElementType;
    return <Tag className={cn(typeStyles[style], className)} {...props} />;
  };

export const Display = make("display", "h1");
export const H1 = make("h1", "h1");
export const H2 = make("h2", "h2");
export const H3 = make("h3", "h3");
export const H4 = make("h4", "h4");
export const Lead = make("lead", "p");
export const Body = make("body", "p");
export const Small = make("small", "p");
export const Caption = make("caption", "p");

/** Small uppercase gold label with a short gold rule. */
export function Eyebrow({ as, className, children, rule = true, ...props }: Props & { rule?: boolean }) {
  const Tag = (as ?? "p") as React.ElementType;
  return (
    <Tag className={cn(typeStyles.eyebrow, "inline-flex items-center gap-3", className)} {...props}>
      {rule && <span aria-hidden="true" className="h-px w-6 bg-accent" />}
      {children}
    </Tag>
  );
}
