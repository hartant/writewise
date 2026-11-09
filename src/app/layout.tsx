import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Courier_Prime, Literata } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConsentManager } from "@/components/consent";
import { themeInitScript } from "@/components/theme-toggle";

// Fonts are self-hosted by next/font at build time: no runtime requests to Google.
// Literata: a book face for headings. Atkinson Hyperlegible: body text built for legibility.
// Courier Prime: the manuscript face, used for text being written and for numbers.
const literata = Literata({ subsets: ["latin"], variable: "--font-literata", display: "swap", axes: ["opsz"] });
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-atkinson", display: "swap" });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-courier", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Free Word Counter & Writing Tools`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  ...(site.gscVerification ? { verification: { google: site.gscVerification } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1129" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${literata.variable} ${atkinson.variable} ${courier.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {site.gaId && <ConsentManager gaId={site.gaId} />}
      </body>
    </html>
  );
}
