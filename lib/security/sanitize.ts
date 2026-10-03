/**
 * Defence-in-depth sanitisation for untrusted text. Input is already
 * validated by Zod (which rejects markup); this strips control characters
 * and normalises whitespace before data leaves the server.
 */
export function sanitizeText(value: string, { multiline = false } = {}) {
  let out = value.normalize("NFKC");
  // Remove C0/C1 control chars except tab/newline (multiline only).
  out = out.replace(multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g : /[\u0000-\u001F\u007F-\u009F]/g, "");
  // Strip zero-width and bidi override characters used for spoofing.
  out = out.replace(/[​-‏‪-‮⁦-⁩﻿]/g, "");
  out = multiline ? out.replace(/\n{3,}/g, "\n\n") : out.replace(/\s+/g, " ");
  return out.trim();
}

/** Escape for safe inclusion in HTML email bodies. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Neutralise spreadsheet formula injection for CRM/CSV exports. */
export function neutraliseFormula(value: string) {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}
