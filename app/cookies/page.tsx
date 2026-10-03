import { LegalPage } from "@/components/content/legal-page";
import { CookiePreferencesButton } from "@/components/privacy/cookie-preferences-button";
import { buttonVariants } from "@/components/ui/button";
import { analyticsConfig } from "@/config/analytics";
import { CONSENT_KEY } from "@/lib/consent";
import { THEME_STORAGE_KEY } from "@/config/theme";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookie Notice",
  description: "The cookies and similar storage technologies used on the PrivInfosec Consulting website, and how to manage your preferences.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Notice"
      description="What we store on your device, why, and how to change your choices."
      path="/cookies"
      lastUpdated="2026-10-03"
    >
      <p>
        We keep the use of cookies and similar technologies to a minimum. Optional technologies are only used after you opt in, and you can
        change your choice at any time.
      </p>
      <p>
        <CookiePreferencesButton className={buttonVariants({ variant: "outline", size: "sm" })}>Open Cookie Preferences</CookiePreferencesButton>
      </p>

      <h2>Strictly necessary</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>{THEME_STORAGE_KEY}</code>
            </td>
            <td>Local storage</td>
            <td>Remembers your light, dark or system theme choice.</td>
            <td>Until cleared</td>
          </tr>
          <tr>
            <td>
              <code>{CONSENT_KEY}</code>
            </td>
            <td>Local storage</td>
            <td>Records your cookie preferences so we do not ask again.</td>
            <td>Until cleared or the notice changes</td>
          </tr>
        </tbody>
      </table>

      <h2>Analytics (optional)</h2>
      {analyticsConfig.enabled ? (
        <p>
          With your consent we use {analyticsConfig.provider === "plausible" ? "Plausible" : "Umami"} Analytics, a privacy-friendly service
          that reports aggregated usage statistics. The analytics script is not loaded unless you opt in.
        </p>
      ) : (
        <p>No analytics or advertising technologies are currently enabled on this website.</p>
      )}

      <h2>Third-party content</h2>
      <p>
        If you choose to book a call through an external scheduling service or follow a link to LinkedIn, that service’s own cookie and
        privacy notices apply.
      </p>
    </LegalPage>
  );
}
