import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "text-button font-semibold tracking-nav select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Flat gold, gentle lift on hover. No shadow or glow.
        primary:
          "border border-accent bg-accent text-accent-foreground hover:-translate-y-0.5 hover:border-accent-hover hover:bg-accent-hover active:translate-y-0",
        secondary:
          "border border-foreground bg-foreground text-background hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0",
        // Secondary CTA: transparent with gold text and hairline.
        outline:
          "border border-button-secondary-border bg-transparent text-button-secondary hover:border-accent hover:bg-accent-soft",
        ghost: "text-foreground hover:bg-muted hover:text-accent-text",
        link: "h-auto px-0 text-foreground underline-offset-4 decoration-border-accent hover:text-accent-text hover:underline hover:decoration-accent-text",
      },
      size: {
        sm: "h-10 rounded-md px-4",
        md: "h-11 rounded-md px-5",
        lg: "h-12 rounded-md px-6",
      },
    },
    compoundVariants: [{ variant: "link", class: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Link styled as a button. External URLs open safely in a new tab. */
export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & Variants & { href: string; external?: boolean }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const isExternal = external ?? /^https?:\/\//.test(href);
  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props} />;
  }
  return <Link href={href} className={classes} {...props} />;
}

export function IconButton({
  className,
  label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors duration-200",
        "hover:bg-muted hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "[&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}
