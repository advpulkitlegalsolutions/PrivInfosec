/**
 * Fonts — loaded and self-hosted at build time by next/font (no runtime
 * requests to Google). To change a typeface, swap the import here and keep
 * the same `variable` name; styles/tokens.css maps these variables to
 * --font-heading / --font-body / --font-mono.
 */
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";

export const fontHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  // Only used for small labels — don't compete with LCP-critical fonts.
  preload: false,
  weight: ["400", "500"],
});

export const fontVariables = [fontHeading.variable, fontBody.variable, fontMono.variable].join(" ");
