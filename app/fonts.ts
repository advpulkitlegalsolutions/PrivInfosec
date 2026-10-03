/**
 * Fonts — loaded and self-hosted at build time by next/font (no runtime
 * requests to Google). Rethink Sans is the single brand typeface, loaded
 * as a variable font (weights set in CSS: 400 body, 500 nav/labels,
 * 600 headings/buttons, 700 hero emphasis). To change it, swap the import
 * and keep the `variable` name; styles/tokens.css maps it to
 * --font-display / --font-heading / --font-body.
 */
import { Rethink_Sans } from "next/font/google";

export const fontSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink",
  display: "swap",
});

export const fontVariables = fontSans.variable;
