import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  LOCAL_BUSINESS_SCHEMA,
  SITE_NAME,
} from "@/lib/seo";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.taqueriaibarrakc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/brand/open-graph.webp", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/brand/open-graph.webp"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const schema = {
    ...LOCAL_BUSINESS_SCHEMA,
    image: `${siteUrl}/images/brand/open-graph.webp`,
    url: siteUrl,
    sameAs: [siteUrl],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
