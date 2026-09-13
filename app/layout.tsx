import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { bookNav, hero, isProduction, primaryNav, siteConfig } from "@/content/site";
import { asset, basePath } from "@/lib/paths";
import "./globals.css";
import "./visuals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const socialImage = {
  url: siteConfig.socialImage,
  width: 1200,
  height: 630,
  alt: `NoahArk: ${hero.headline}`,
};

// Only the production build on the site's own domain is indexed; the
// github.io preview (served under a base path) stays out of search results.
const allowIndexing = isProduction && !basePath;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | NoahArk",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [socialImage],
  },
  icons: {
    icon: asset("/favicon.svg"),
    apple: asset("/apple-touch-icon.png"),
  },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  colorScheme: "dark",
};

// GitHub Pages cannot send security headers, so production builds carry a
// Content-Security-Policy meta tag. Next's static export needs inline scripts and
// styles; everything else is limited to this site plus the Calendly frame.
// (Not applied in development, where Next needs eval for hot reloading.)
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://calendly.com https://*.calendly.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Browser extensions (Grammarly, password managers, dark-mode tools) add
    // attributes to <html>/<body> before React loads; ignore only those two.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {isProduction && (
          <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader items={primaryNav} cta={bookNav} />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
