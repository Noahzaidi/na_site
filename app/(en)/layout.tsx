import { siteMetadata } from "@/lib/metadata";
import { SiteDocument, siteViewport } from "../document";
import "../globals.css";
import "../visuals.css";

// Root layout for the English site at the unprefixed URLs (/, /about/, …).
// Spanish and French have their own root layout in app/[lang], so each page
// is built with the right <html lang>.
export const metadata = siteMetadata("en");
export const viewport = siteViewport;

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
