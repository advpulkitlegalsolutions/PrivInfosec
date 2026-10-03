import Link from "next/link";
import { LegalPage } from "@/components/content/legal-page";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Notice",
  description: "How PrivInfosec Consulting collects, uses and protects personal data through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const contact = siteConfig.email || "[privacy contact email]";
  return (
    <LegalPage
      title="Privacy Notice"
      description="How we collect, use and protect personal data when you use this website or contact us."
      path="/privacy"
      lastUpdated="2026-10-03"
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by {siteConfig.legalName} (“we”, “us”). [Registered address and entity details.] For any question about
        this notice or your personal data, contact us at {contact}.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiry information</strong> you submit through our contact form: name, work email, optional phone/WhatsApp number,
          company, job title, country, the service and engagement model you are interested in, and your message.
        </li>
        <li>
          <strong>Technical information</strong> needed to deliver and secure the website, such as IP address, browser type and request
          logs. IP addresses are used transiently to rate-limit form submissions and prevent abuse.
        </li>
        <li>
          <strong>Analytics information</strong>, only if you opt in, collected through a privacy-friendly analytics provider in
          aggregated form. [Name the provider once enabled.]
        </li>
      </ul>

      <h2>How and why we use it</h2>
      <ul>
        <li>To respond to your enquiry and discuss a potential engagement — on the basis of your consent and our steps at your request prior to entering a contract.</li>
        <li>To secure the website and prevent spam or abuse — on the basis of our legitimate interests / legitimate uses permitted by law.</li>
        <li>To understand how the website is used, where you have consented to analytics.</li>
      </ul>
      <p>We do not sell personal data and we do not use it for advertising profiling.</p>

      <h2>Sharing</h2>
      <p>
        We share personal data only with service providers that help us operate the website and handle enquiries (for example hosting,
        email delivery and, if used, CRM providers), under contracts requiring appropriate protection. [List categories of processors.]
        Where data is processed outside your country, we apply safeguards required by applicable law.
      </p>

      <h2>Retention</h2>
      <p>
        Enquiry information is kept for [retention period] after our last interaction unless an engagement follows, in which case it is
        retained in line with our engagement records policy. Security logs are kept for [period].
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on the law that applies to you — including India’s Digital Personal Data Protection Act, 2023 and the EU GDPR — you may
        have rights to access, correct, update or erase your personal data, to withdraw consent, to nominate another person to exercise
        your rights, to object to or restrict certain processing, and to raise a grievance. To exercise these rights, contact {contact}.
        You may also complain to the relevant data protection authority.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        See our <Link href="/cookies">Cookie Notice</Link> for the storage technologies this website uses and how to manage your
        preferences.
      </p>

      <h2>Changes</h2>
      <p>We will update this notice when our practices change and revise the date at the top of this page.</p>
    </LegalPage>
  );
}
