/**
 * Security headers + Content-Security-Policy.
 * ------------------------------------------------------------------
 * Applied to every route via next.config.ts. Pages are statically
 * generated, so a static CSP is used ('unsafe-inline' scripts are required
 * for Next.js' inline hydration data without per-request nonces). See
 * README → Security for upgrading to a nonce-based CSP via proxy.ts.
 *
 * Third-party origins are added only when the related feature is
 * configured through environment variables.
 */
function originOf(url?: string) {
  try {
    return url ? new URL(url).origin : null;
  } catch {
    return null;
  }
}

export function buildCsp() {
  const isDev = process.env.NODE_ENV === "development";
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const analyticsSrc =
    provider === "plausible"
      ? process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js"
      : provider === "umami"
        ? process.env.NEXT_PUBLIC_UMAMI_SRC
        : undefined;
  const analytics = originOf(analyticsSrc);
  const turnstile = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "https://challenges.cloudflare.com" : null;

  const src = (...values: (string | null | false | undefined)[]) => values.filter(Boolean).join(" ");

  const directives: Record<string, string> = {
    "default-src": "'self'",
    "script-src": src("'self'", "'unsafe-inline'", isDev && "'unsafe-eval'", analytics, turnstile),
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data: blob:",
    "font-src": "'self'",
    "connect-src": src("'self'", analytics, isDev && "ws:"),
    "frame-src": src(turnstile) || "'none'",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self'",
    "frame-ancestors": "'none'",
    "manifest-src": "'self'",
    "worker-src": "'self' blob:",
  };
  const policy = Object.entries(directives)
    .map(([k, v]) => `${k} ${v}`)
    .join("; ");
  return isDev ? policy : `${policy}; upgrade-insecure-requests`;
}

export function securityHeaders() {
  const headers = [
    { key: "Content-Security-Policy", value: buildCsp() },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
    },
  ];
  if (process.env.NODE_ENV === "production") {
    headers.push({ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" });
  }
  return headers;
}
