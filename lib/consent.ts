/**
 * Consent state (client-side).
 * ------------------------------------------------------------------
 * Stored in localStorage under CONSENT_KEY. Bump CONSENT_VERSION when the
 * categories or providers change materially — visitors are asked again.
 * Analytics scripts are ONLY loaded when `analytics === true`.
 */
export const CONSENT_KEY = "pi-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "pi-consent-change";
export const OPEN_PREFERENCES_EVENT = "pi-open-cookie-preferences";

export type ConsentState = {
  version: number;
  analytics: boolean;
  updatedAt: string;
};

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean) {
  const state: ConsentState = { version: CONSENT_VERSION, analytics, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable: choice applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
