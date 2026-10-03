import Link from "next/link";
import { LegalPage } from "@/components/content/legal-page";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms governing use of the PrivInfosec Consulting website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" description="The terms that apply when you use this website." path="/terms" lastUpdated="2026-10-03">
      <h2>About these terms</h2>
      <p>
        These terms govern your use of this website, operated by {siteConfig.legalName}. By using the website you agree to them. They do
        not govern professional engagements, which are subject to a separate written proposal or engagement letter.
      </p>

      <h2>No professional advice</h2>
      <p>
        Content on this website, including Insights, is general information. It is not legal, regulatory or professional advice and should
        not be relied on as such. Requirements depend on your circumstances; please contact us to discuss your specific situation.
      </p>

      <h2>No certification or regulatory status</h2>
      <p>
        References to laws, regulations and standards (such as the DPDP Act, GDPR, ISO/IEC 27001, ISO/IEC 27701 and SOC 2) describe the
        requirements our services may support. They do not indicate that we are a certification body, a licensed auditor or a regulator,
        or that we are endorsed by any standards organisation.
      </p>

      <h2>Pricing</h2>
      <p>
        Prices shown on the website are indicative starting points, exclusive of applicable taxes. Fees and scope are confirmed only in a
        written proposal or engagement letter.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Website content, design and branding belong to {siteConfig.legalName} or its licensors. You may share links and short quotations
        with attribution; other reproduction requires our permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not misuse the website, attempt to gain unauthorised access, submit unlawful or malicious content through our forms, or
        interfere with its operation.
      </p>

      <h2>Liability</h2>
      <p>
        The website is provided “as is”. To the extent permitted by law, we are not liable for loss arising from reliance on website
        content or from temporary unavailability. [Liability wording to be confirmed by counsel.]
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Notice</Link> explains how we handle personal data.
      </p>

      <h2>Governing law</h2>
      <p>[Governing law and jurisdiction to be confirmed.]</p>
    </LegalPage>
  );
}
