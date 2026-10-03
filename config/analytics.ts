/**
 * Privacy-friendly analytics configuration (public, non-secret values).
 * Supported: Plausible, Umami. Leave NEXT_PUBLIC_ANALYTICS_PROVIDER unset
 * to run with no analytics at all (and no consent banner).
 */
export type AnalyticsProvider = "plausible" | "umami" | "none";

const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "none") as AnalyticsProvider;

export const analyticsConfig = {
  provider,
  enabled: provider === "plausible" || provider === "umami",
  plausible: {
    domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
    src: process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js",
  },
  umami: {
    websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
    src: process.env.NEXT_PUBLIC_UMAMI_SRC || "",
  },
} as const;

/** Origin of the analytics script — used to extend the CSP. */
export function analyticsOrigin(): string | null {
  const src =
    analyticsConfig.provider === "plausible"
      ? analyticsConfig.plausible.src
      : analyticsConfig.provider === "umami"
        ? analyticsConfig.umami.src
        : "";
  try {
    return src ? new URL(src).origin : null;
  } catch {
    return null;
  }
}
