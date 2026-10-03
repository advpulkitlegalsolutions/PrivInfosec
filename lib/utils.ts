import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom token utilities, otherwise e.g.
 * `text-small` (font size) and `text-accent-foreground` (colour) are seen
 * as conflicting and one is dropped. Keep in sync with styles/tokens.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "h4", "price", "lead", "body", "small", "caption", "eyebrow"],
      radius: ["xs", "pill"],
      tracking: ["eyebrow", "snug"],
      leading: ["snug", "normal", "relaxed"],
      spacing: ["section-sm", "section-md", "section-lg"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  return new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: "UTC" }).format(new Date(iso));
}
