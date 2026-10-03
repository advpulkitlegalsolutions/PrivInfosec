import "server-only";
import { createHmac } from "node:crypto";
import { siteConfig } from "@/config/site";
import { escapeHtml, neutraliseFormula } from "@/lib/security/sanitize";
import type { LeadProvider } from "./types";

const timeout = () => AbortSignal.timeout(8000);

async function assertOk(res: Response, provider: string) {
  if (!res.ok) {
    // Never include response bodies that might echo credentials.
    throw new Error(`${provider} delivery failed with status ${res.status}`);
  }
}

/** Development fallback: logs a redacted summary to the server console. */
export const consoleProvider: LeadProvider = {
  id: "console",
  isConfigured: () => process.env.NODE_ENV !== "production",
  async send(lead) {
    console.info("[lead] received", { id: lead.id, service: lead.service.value, engagement: lead.engagement.value, company: lead.company });
  },
};

/** Email via Resend's HTTP API (no SDK). Env: RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM. */
export const emailProvider: LeadProvider = {
  id: "email",
  isConfigured: () => Boolean(process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO && process.env.LEAD_EMAIL_FROM),
  async send(lead) {
    const rows: [string, string | undefined][] = [
      ["Name", lead.name],
      ["Work email", lead.email],
      ["Phone / WhatsApp", lead.phone],
      ["Company", lead.company],
      ["Job title", lead.jobTitle],
      ["Country", lead.country],
      ["Service", lead.service.label],
      ["Requirement", lead.requirement.label],
      ["Engagement model", lead.engagement.label],
      ["Submitted", lead.submittedAt],
      ["Reference", lead.id],
    ];
    const html = `<h2>New enquiry — ${escapeHtml(siteConfig.name)}</h2><table cellpadding="6">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v!)}</td></tr>`)
      .join("")}</table><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>`;
    const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${lead.message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM,
        to: process.env.LEAD_EMAIL_TO!.split(",").map((s) => s.trim()),
        reply_to: lead.email,
        subject: `New enquiry: ${lead.service.label} — ${lead.company}`,
        html,
        text,
      }),
      signal: timeout(),
    });
    await assertOk(res, "email");
  },
};

/**
 * Generic signed webhook (Zapier, Make, n8n, internal services).
 * Env: LEAD_WEBHOOK_URL, LEAD_WEBHOOK_SECRET (HMAC-SHA256 of the body,
 * sent as `X-PrivInfosec-Signature: sha256=<hex>`).
 */
export const webhookProvider: LeadProvider = {
  id: "webhook",
  isConfigured: () => Boolean(process.env.LEAD_WEBHOOK_URL),
  async send(lead) {
    const body = JSON.stringify({ type: "lead.created", data: lead });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.LEAD_WEBHOOK_SECRET) {
      headers["X-PrivInfosec-Signature"] = `sha256=${createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET).update(body).digest("hex")}`;
    }
    const res = await fetch(process.env.LEAD_WEBHOOK_URL!, { method: "POST", headers, body, signal: timeout() });
    await assertOk(res, "webhook");
  },
};

/**
 * HubSpot Forms Submission API (v3).
 * Env: HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID. Create matching properties in
 * HubSpot (or map them to existing ones below).
 */
export const hubspotProvider: LeadProvider = {
  id: "hubspot",
  isConfigured: () => Boolean(process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID),
  async send(lead) {
    const [firstname, ...rest] = lead.name.split(" ");
    const fields = {
      firstname,
      lastname: rest.join(" "),
      email: lead.email,
      phone: lead.phone ?? "",
      company: lead.company,
      jobtitle: lead.jobTitle,
      country: lead.country,
      service_interest: lead.service.label,
      requirement: lead.requirement.label,
      engagement_model: lead.engagement.label,
      message: lead.message,
    };
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: Object.entries(fields).map(([name, value]) => ({ name, value: neutraliseFormula(value) })),
          context: { pageUri: `${siteConfig.url}${lead.source.path}`, pageName: "Contact" },
          legalConsentOptions: {
            consent: { consentToProcess: true, text: `Agreed to the Privacy Notice (${lead.consent.noticeUrl})` },
          },
        }),
        signal: timeout(),
      },
    );
    await assertOk(res, "hubspot");
  },
};

/**
 * Zoho CRM and Salesforce require OAuth token exchange. These adapters
 * define the integration point; implement `send` with the organisation's
 * chosen auth flow (server-side only) before enabling them.
 *   Zoho:       ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_DOMAIN
 *   Salesforce: SALESFORCE_INSTANCE_URL, SALESFORCE_CLIENT_ID, SALESFORCE_CLIENT_SECRET
 */
export const zohoProvider: LeadProvider = {
  id: "zoho",
  isConfigured: () => Boolean(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_REFRESH_TOKEN),
  async send() {
    throw new Error("zoho provider not implemented — see lib/leads/providers.ts");
  },
};

export const salesforceProvider: LeadProvider = {
  id: "salesforce",
  isConfigured: () => Boolean(process.env.SALESFORCE_INSTANCE_URL && process.env.SALESFORCE_CLIENT_ID),
  async send() {
    throw new Error("salesforce provider not implemented — see lib/leads/providers.ts");
  },
};
