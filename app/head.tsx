import { getSiteUrl } from "@/lib/env";

export default function Head() {
  const siteUrl = getSiteUrl();

  return (
    <>
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Manifest for PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Color scheme */}
      <meta name="color-scheme" content="light dark" />
      <meta name="theme-color" content="#6366f1" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      
      {/* Apple specific */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="LinkSnip" />
      
      {/* Microsoft specific */}
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      
      {/* Additional SEO */}
      <link rel="canonical" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={siteUrl} />
    </>
  );
}
