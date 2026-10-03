import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  variant?: "default" | "muted" | "outline" | "accent";
  as?: "div" | "article" | "li";
};

/**
 * Base card surface. `interactive` adds the hover treatment used for
 * linked cards (gold hairline + lift); pair with a stretched link inside.
 */
export function Card({ className, interactive, variant = "default", as = "div", ...props }: CardProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(
        "relative rounded-lg border",
        variant === "default" && "border-border bg-surface-1",
        variant === "muted" && "border-border bg-surface-2",
        variant === "outline" && "border-border bg-transparent",
        variant === "accent" && "border-border-accent bg-surface-1",
        interactive &&
          "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-border-accent hover:shadow-md focus-within:border-border-accent",
        className,
      )}
      {...props}
    />
  );
}
