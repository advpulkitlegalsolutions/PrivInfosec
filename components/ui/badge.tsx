import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border px-2.5 py-0.5 text-caption font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-3 text-subtle-foreground",
        accent: "border-badge-border bg-badge text-badge-foreground",
        solid: "border-transparent bg-accent text-accent-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
        warning: "border-transparent bg-warning-soft text-warning",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** Visible marker for development placeholders (never ship silently). */
export function PlaceholderBadge({ className, children = "Placeholder" }: { className?: string; children?: React.ReactNode }) {
  return (
    <Badge variant="warning" className={cn("whitespace-normal text-[0.6875rem] font-semibold uppercase tracking-eyebrow", className)}>
      {children}
    </Badge>
  );
}
