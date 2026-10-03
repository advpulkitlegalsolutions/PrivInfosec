import "server-only";
import {
  consoleProvider,
  emailProvider,
  hubspotProvider,
  salesforceProvider,
  webhookProvider,
  zohoProvider,
} from "./providers";
import type { Lead, LeadProvider } from "./types";

const registry: Record<string, LeadProvider> = Object.fromEntries(
  [consoleProvider, emailProvider, webhookProvider, hubspotProvider, zohoProvider, salesforceProvider].map((p) => [p.id, p]),
);

/** Providers listed in LEAD_PROVIDERS (comma-separated) that are configured. */
export function activeProviders(): LeadProvider[] {
  const requested = (process.env.LEAD_PROVIDERS || "console")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return requested.map((id) => registry[id]).filter((p): p is LeadProvider => Boolean(p?.isConfigured()));
}

/**
 * Deliver a lead to every active provider. Succeeds if at least one
 * provider accepted it; failures are logged without personal data.
 */
export async function deliverLead(lead: Lead) {
  const providers = activeProviders();
  if (!providers.length) {
    console.error("[lead] no configured lead providers — set LEAD_PROVIDERS and provider env vars");
    return { delivered: false };
  }
  const results = await Promise.allSettled(providers.map((p) => p.send(lead)));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] provider "${providers[i].id}" failed`, { id: lead.id, error: String(r.reason) });
  });
  return { delivered: results.some((r) => r.status === "fulfilled") };
}

export type { Lead, LeadProvider };
