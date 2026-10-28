import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import { personJsonLd } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/site-url";
import { profile } from "@/content/profile";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · Software Developer Portfolio`,
    template: `%s · ${profile.shortName}`,
  },
  description:
    "Portfolio of Gurmeetsingh Relusinghani — Computer Engineering student at VIT Pune building full-stack applications, AI products, and developer tools.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} · Software Developer Portfolio`,
    description:
      "Full-stack and AI-powered projects, competitive programming, and engineering leadership.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · Software Developer Portfolio`,
    description:
      "Computer Engineering @ VIT Pune · ChatterMind, RozgarSetu, DermScan",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = personJsonLd();

  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link sr-only">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
