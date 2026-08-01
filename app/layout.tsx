import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { OrganizationSchema } from "@/components/StructuredData";
import { ReviewModeBadge } from "@/components/ReviewModeBadge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: "Christian Science Church in Aurora, CO | Christian Science Aurora", template: "%s | Christian Science Aurora" },
  description: "Join Sunday worship, Wednesday testimony meetings, Sunday School, events, and spiritual study at First Church of Christ, Scientist, Aurora.",
  applicationName: "Christian Science Aurora",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Christian Science Aurora",
    title: "Christian Science Church in Aurora, CO",
    description: "A welcoming place for spiritual discovery, healing, and hope.",
    url: site.domain
  },
  robots: { index: true, follow: true },
  icons: { icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2218%22 fill=%22%23167C80%22/><text x=%2250%22 y=%2263%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2244%22 font-weight=%22700%22 fill=%22white%22>CSA</text></svg>" }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FCFBF7", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReviewModeBadge />
        <div className="site-shell">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileActionBar />
        </div>
        <OrganizationSchema />
      </body>
    </html>
  );
}
