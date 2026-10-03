import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ConsentManager } from "@/components/privacy/consent-manager";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/config/site";
import { themeConfig } from "@/config/theme";
import { createMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { jsFlagScript } from "@/lib/theme";
import { fontVariables } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  ...createMetadata({ path: "/" }),
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: themeConfig.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint (static, trusted string). */}
        <script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <ConsentManager />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
