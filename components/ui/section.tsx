import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "default" | "muted" | "ink";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  spacing?: "sm" | "md" | "lg" | "none";
  container?: "default" | "wide" | "prose" | false;
  /** Faint engineering grid behind the content. */
  grid?: boolean;
};

const spacingMap = {
  none: "",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
};

/**
 * Page section primitive.
 * tone="muted" is the subtle alternate surface; tone="ink" adds the
 * understated gold ambience used for premium bands. Both stay close to
 * the page black so sections flow without obvious stripes.
 */
export function Section({
  tone = "default",
  spacing = "md",
  container = "wide",
  grid,
  className,
  children,
  ...props
}: SectionProps) {
  const inkProps = tone === "ink" ? { "data-theme": "dark", "data-band": "ink" } : {};
  return (
    <section
      {...inkProps}
      className={cn(
        "relative isolate",
        tone === "default" && "bg-background",
        tone === "muted" && "bg-section-muted",
        tone === "ink" && "bg-background bg-ambient-gold text-foreground",
        spacingMap[spacing],
        className,
      )}
      {...props}
    >
      {grid && <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 -z-10" />}
      {container ? <Container size={container}>{children}</Container> : children}
    </section>
  );
}
