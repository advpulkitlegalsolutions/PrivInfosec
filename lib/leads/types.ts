/**
 * Lead delivery abstraction.
 * ------------------------------------------------------------------
 * The contact form produces a normalised `Lead`. One or more providers
 * deliver it (email, webhook, CRM). Add a CRM by implementing
 * `LeadProvider` and registering it in lib/leads/index.ts — the form and
 * API route do not change.
 */
export type Lead = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle: string;
  country: string;
  service: { value: string; label: string };
  requirement: { value: string; label: string };
  engagement: { value: string; label: string };
  message: string;
  consent: { given: true; noticeUrl: string; timestamp: string };
  source: { path: string; userAgent?: string };
};

export interface LeadProvider {
  /** Identifier used in LEAD_PROVIDERS, e.g. "email". */
  readonly id: string;
  /** True when required environment variables are present. */
  isConfigured(): boolean;
  send(lead: Lead): Promise<void>;
}
