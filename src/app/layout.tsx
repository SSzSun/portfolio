import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import { CRTOverlay } from "@/components/effects/CRTOverlay";
import { site } from "@/lib/site";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} | ${site.role}`,
  description: site.summary,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.summary,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#141a20",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${vt323.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:bg-crt focus:px-3 focus:py-1 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <CRTOverlay />
      </body>
    </html>
  );
}
