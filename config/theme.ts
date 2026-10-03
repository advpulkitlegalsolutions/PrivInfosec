/**
 * Theme configuration (TypeScript side of the design system).
 * ------------------------------------------------------------------
 * Visual values live in styles/tokens.css (the site is dark-only). This
 * file holds the browser theme colour plus a typed index of the token names, so components and
 * the /design-system page can reference tokens without magic strings.
 */

export const themeConfig = {
  /** Browser UI colour (address bar). Mirrors the dark --background. */
  themeColor: "#070707",
} as const;

/** Semantic colour tokens — documented on /design-system. */
export const colorTokens = [
  { token: "--background", usage: "Page background" },
  { token: "--foreground", usage: "Primary text" },
  { token: "--surface-1", usage: "Cards, inputs" },
  { token: "--surface-2", usage: "Alternate section background" },
  { token: "--surface-3", usage: "Wells, pressed states" },
  { token: "--border", usage: "Hairlines, dividers" },
  { token: "--border-strong", usage: "Input borders, emphasised rules" },
  { token: "--border-accent", usage: "Gold hairline accents" },
  { token: "--muted", usage: "Subtle fills, chips" },
  { token: "--muted-foreground", usage: "Secondary text" },
  { token: "--accent", usage: "Gold fills: buttons, markers, rules" },
  { token: "--accent-text", usage: "Gold as text/icon (AA-safe)" },
  { token: "--accent-soft", usage: "Gold tint backgrounds" },
  { token: "--success", usage: "Success state" },
  { token: "--warning", usage: "Warning state" },
  { token: "--danger", usage: "Error state" },
] as const;

export const typeScale = [
  { name: "Display", token: "--text-display" },
  { name: "H1", token: "--text-h1" },
  { name: "H2", token: "--text-h2" },
  { name: "H3", token: "--text-h3" },
  { name: "H4", token: "--text-h4" },
  { name: "Price", token: "--text-price" },
  { name: "Lead", token: "--text-lead" },
  { name: "Body", token: "--text-body" },
  { name: "Small", token: "--text-small" },
  { name: "Caption", token: "--text-caption" },
  { name: "Eyebrow", token: "--text-eyebrow" },
] as const;

export const spacingScale = [
  { name: "2xs", token: "--space-2xs", px: 4, tw: "1" },
  { name: "xs", token: "--space-xs", px: 8, tw: "2" },
  { name: "sm", token: "--space-sm", px: 12, tw: "3" },
  { name: "md", token: "--space-md", px: 16, tw: "4" },
  { name: "lg", token: "--space-lg", px: 24, tw: "6" },
  { name: "xl", token: "--space-xl", px: 32, tw: "8" },
  { name: "2xl", token: "--space-2xl", px: 48, tw: "12" },
  { name: "3xl", token: "--space-3xl", px: 64, tw: "16" },
  { name: "4xl", token: "--space-4xl", px: 96, tw: "24" },
] as const;

export const radiusScale = ["xs", "sm", "md", "lg", "xl", "2xl", "pill"] as const;
