"use client";

import { openCookiePreferences } from "@/lib/consent";

export function CookiePreferencesButton({ className, children = "Cookie Preferences" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {children}
    </button>
  );
}
