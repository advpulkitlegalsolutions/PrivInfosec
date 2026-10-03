/**
 * QA sweep: every route × viewports × themes.
 *   - console errors / page errors / failed requests
 *   - horizontal overflow
 *   - axe-core WCAG 2.2 AA scan
 *   - broken internal links
 * Usage: BASE_URL=http://localhost:3000 node scripts/qa.mjs [--screens=dir]
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const screensArg = process.argv.find((a) => a.startsWith("--screens="));
const SCREENS = screensArg ? screensArg.split("=")[1] : null;

const routes = [
  "/", "/services", "/services/dpo-privacy", "/services/information-security", "/services/compliance-governance",
  "/services/risk-audit-training", "/industries", "/engagement-models", "/about", "/insights",
  "/insights/what-does-a-virtual-dpo-do", "/insights/iso-27001-vs-soc-2", "/case-studies",
  "/case-studies/privacy-programme-template", "/pricing", "/contact", "/privacy", "/cookies", "/terms",
];
const widths = [320, 375, 768, 1024, 1280, 1440, 1920];
const themes = ["light", "dark"];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const problems = [];
const seenLinks = new Set();

for (const theme of themes) {
  const context = await browser.newContext({ colorScheme: theme });
  await context.addInitScript((t) => localStorage.setItem("pi-theme", t), theme);
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("requestfailed", (r) => {
    // Aborted prefetches during navigation are expected, not failures.
    if (r.failure()?.errorText === "net::ERR_ABORTED") return;
    errors.push(`request failed: ${r.url()} ${r.failure()?.errorText}`);
  });

  for (const route of routes) {
    for (const width of widths) {
      errors.length = 0;
      await page.setViewportSize({ width, height: 900 });
      const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
      if (!res || res.status() >= 400) problems.push(`${route} → HTTP ${res?.status()}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) problems.push(`[${theme} ${width}] ${route} horizontal overflow ${overflow}px`);
      if (errors.length) problems.push(`[${theme} ${width}] ${route} console: ${[...new Set(errors)].join(" | ")}`);

      if (width === 375 || width === 1440) {
        // Reveal all animated content before scanning.
        await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => (el.dataset.revealed = "true")));
        await page.waitForTimeout(900);
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        for (const v of axe.violations) {
          problems.push(`[${theme} ${width}] ${route} axe ${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(", ")}`);
        }
        if (SCREENS && (route === "/" || route.startsWith("/services/dpo") || route === "/pricing" || route === "/contact")) {
          await page.screenshot({ path: `${SCREENS}/${theme}-${width}${route.replace(/\//g, "_") || "_home"}.png`, fullPage: true });
        }
      }
      if (theme === "light" && width === 1440) {
        const links = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")));
        links.forEach((l) => seenLinks.add(l.split("#")[0].split("?")[0]));
      }
    }
  }
  await context.close();
}

// Broken internal link check
const ctx = await browser.newContext();
for (const link of seenLinks) {
  const r = await ctx.request.get(BASE + link);
  if (r.status() >= 400) problems.push(`broken link ${link} → ${r.status()}`);
}
await browser.close();

console.log(problems.length ? problems.join("\n") : "QA: no problems found");
console.log(`checked ${routes.length} routes × ${widths.length} widths × ${themes.length} themes; ${seenLinks.size} internal links`);
process.exit(problems.length ? 1 : 0);
