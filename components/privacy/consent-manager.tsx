"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { analyticsConfig } from "@/config/analytics";
import { CONSENT_EVENT, OPEN_PREFERENCES_EVENT, readConsent, writeConsent, type ConsentState } from "@/lib/consent";

/**
 * Consent manager: banner, preferences dialog and consent-gated analytics.
 * - If no analytics provider is configured, no banner is shown (the site
 *   then uses no non-essential cookies or trackers).
 * - Analytics scripts are injected ONLY after an explicit opt-in.
 * - Withdrawing consent reloads the page so the script is no longer present.
 */
export function ConsentManager() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  useEffect(() => {
    // Read persisted choice after mount (localStorage is client-only).
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from external storage on mount
    setConsent(stored);
    setAnalyticsChoice(stored?.analytics ?? false);
    setReady(true);
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentState>).detail);
    const onOpen = () => {
      setAnalyticsChoice(readConsent()?.analytics ?? false);
      setPrefsOpen(true);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    };
  }, []);

  const save = useCallback(
    (analytics: boolean) => {
      const hadAnalytics = consent?.analytics === true;
      writeConsent(analytics);
      setPrefsOpen(false);
      if (hadAnalytics && !analytics) window.location.reload();
    },
    [consent],
  );

  const showBanner = ready && analyticsConfig.enabled && consent === null && !prefsOpen;
  const loadAnalytics = analyticsConfig.enabled && consent?.analytics === true;

  return (
    <>
      {loadAnalytics && analyticsConfig.provider === "plausible" && analyticsConfig.plausible.domain && (
        <Script defer data-domain={analyticsConfig.plausible.domain} src={analyticsConfig.plausible.src} strategy="afterInteractive" />
      )}
      {loadAnalytics && analyticsConfig.provider === "umami" && analyticsConfig.umami.src && (
        <Script defer data-website-id={analyticsConfig.umami.websiteId} src={analyticsConfig.umami.src} strategy="afterInteractive" />
      )}

      {showBanner && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[var(--z-overlay)] mx-auto max-w-3xl rounded-xl border border-border bg-surface-raised p-5 shadow-lg sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <p className="font-heading text-body font-semibold text-foreground">Your privacy choices</p>
          <p className="mt-2 text-small text-muted-foreground">
            We use privacy-friendly analytics to understand how our website is used — only if you agree. Essential storage (such as your theme
            and consent choice) is always used. See our{" "}
            <Link href="/cookies" className="text-foreground underline decoration-accent underline-offset-4">
              Cookie Notice
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => save(true)}>
              Accept analytics
            </Button>
            <Button size="sm" variant="outline" onClick={() => save(false)}>
              Reject
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setPrefsOpen(true)}>
              Manage preferences
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={prefsOpen}
        onClose={() => setPrefsOpen(false)}
        title="Cookie Preferences"
        description="Choose which optional technologies we may use. You can change this at any time."
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => save(false)}>
              Reject optional
            </Button>
            <Button size="sm" onClick={() => save(analyticsChoice)}>
              Save preferences
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <fieldset className="rounded-lg border border-border p-4">
            <legend className="sr-only">Strictly necessary</legend>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">Strictly necessary</p>
                <p className="mt-1 text-small text-muted-foreground">
                  Stores your theme and consent choices, and protects our contact form from abuse. Always on.
                </p>
              </div>
              <span className="text-caption font-medium text-muted-foreground">Always on</span>
            </div>
          </fieldset>
          <fieldset className="rounded-lg border border-border p-4">
            <legend className="sr-only">Analytics</legend>
            <div className="flex items-start justify-between gap-4">
              <label htmlFor="consent-analytics" className="cursor-pointer">
                <span className="block font-semibold text-foreground">Analytics</span>
                <span className="mt-1 block text-small text-muted-foreground">
                  {analyticsConfig.enabled
                    ? "Privacy-friendly, aggregated usage statistics. No advertising or cross-site tracking."
                    : "No analytics provider is currently enabled on this website."}
                </span>
              </label>
              <input
                id="consent-analytics"
                type="checkbox"
                role="switch"
                disabled={!analyticsConfig.enabled}
                checked={analyticsChoice}
                onChange={(e) => setAnalyticsChoice(e.target.checked)}
                className="mt-1 size-5 shrink-0 cursor-pointer accent-accent disabled:cursor-not-allowed"
              />
            </div>
          </fieldset>
        </div>
      </Modal>
    </>
  );
}
