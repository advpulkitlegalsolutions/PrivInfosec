import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  variant?: "default" | "muted" | "outline" | "accent";
  as?: "div" | "article" | "li";
};

/**
 * Base card surface (component tokens --card-*). `interactive` adds the
 * hover treatment used for linked cards: gold hairline, slight lift and
 * surface change — no shadow. Pair with a stretched link inside.
 */
export function Card({ className, interactive, variant = "default", as = "div", ...props }: CardProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(
        "relative rounded-lg border",
        variant === "default" && "border-card-border bg-card",
        variant === "muted" && "border-card-border bg-surface-2",
        variant === "outline" && "border-card-border bg-transparent",
        variant === "accent" && "border-border-accent bg-card",
        interactive &&
          "transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-card-border-hover hover:bg-card-hover focus-within:border-card-border-hover",
        className,
      )}
      {...props}
    />
  );
}
