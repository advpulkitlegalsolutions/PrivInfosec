import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { deliverLead } from "@/lib/leads";
import { rateLimit } from "@/lib/security/rate-limit";
import { sanitizeText } from "@/lib/security/sanitize";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { contactSchema, engagementOptions, requirementOptions, serviceOptions } from "@/lib/validation/contact";

const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24; // 24h
const MAX_BODY_BYTES = 16 * 1024;

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // 1. CSRF-style origin check + content type + size guard.
  if (!sameOrigin(req)) return json({ ok: false, error: "Invalid request origin." }, 403);
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Unsupported content type." }, 415);
  }
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

  // 2. Rate limit per IP: 5 submissions / 10 minutes.
  const ip = clientIp(req);
  const limit = await rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.success) {
    return json(
      { ok: false, error: "Too many submissions. Please try again later." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  // 3. Parse + validate (authoritative).
  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ ok: false, error: "Please correct the highlighted fields.", fieldErrors }, 422);
  }
  const data = parsed.data;

  // 4. Bot checks: honeypot, timing, optional Turnstile.
  const elapsed = Date.now() - data.startedAt;
  const looksAutomated = Boolean(data.website) || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS;
  if (looksAutomated) {
    // Respond as success so bots learn nothing; do not deliver.
    return json({ ok: true });
  }
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json({ ok: false, error: "We could not verify this submission. Please try again." }, 400);
  }

  // 5. Normalise + sanitise.
  const label = <T extends { value: string; label: string }>(opts: readonly T[], value: string) =>
    ({ value, label: opts.find((o) => o.value === value)?.label ?? value });
  const now = new Date().toISOString();
  const lead = {
    id: randomUUID(),
    submittedAt: now,
    name: sanitizeText(data.name),
    email: sanitizeText(data.email),
    phone: data.phone ? sanitizeText(data.phone) : undefined,
    company: sanitizeText(data.company),
    jobTitle: sanitizeText(data.jobTitle),
    country: sanitizeText(data.country),
    service: label(serviceOptions, data.service),
    requirement: label(requirementOptions, data.requirement),
    engagement: label(engagementOptions, data.engagement),
    message: sanitizeText(data.message, { multiline: true }),
    consent: { given: true as const, noticeUrl: `${siteConfig.url}/privacy`, timestamp: now },
    source: { path: "/contact", userAgent: req.headers.get("user-agent")?.slice(0, 256) ?? undefined },
  };

  // 6. Deliver.
  const { delivered } = await deliverLead(lead);
  if (!delivered) {
    return json({ ok: false, error: "We could not send your message right now. Please email us directly or try again shortly." }, 502);
  }
  return json({ ok: true, reference: lead.id.slice(0, 8) });
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
