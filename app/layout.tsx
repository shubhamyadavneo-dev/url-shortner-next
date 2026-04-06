import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LinkSnip - Modern URL Shortener",
    template: "%s | LinkSnip",
  },
  description:
    "Shorten your URLs with style. A modern, fast, and reliable URL shortener with beautiful design, QR codes, and advanced analytics. Built with Next.js and MongoDB.",
  keywords: [
    "url shortener",
    "short links",
    "link management",
    "qr codes",
    "link tracking",
    "analytics",
    "url shortening service",
  ],
  authors: [{ name: "LinkSnip", url: process.env.NEXT_PUBLIC_APP_URL }],
  creator: "LinkSnip Team",
  publisher: "LinkSnip",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "LinkSnip",
    title: "LinkSnip - Modern URL Shortener",
    description:
      "Shorten your URLs with style. Fast, reliable, and beautiful URL shortening service with analytics and QR codes.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LinkSnip - URL Shortener",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkSnip - Modern URL Shortener",
    description:
      "Shorten your URLs with style. Fast, reliable, and beautiful URL shortening service.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
    creator: "@linksnip",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appLinks: {
    ios: {
      app_store_id: "your-app-id",
      app_name: "LinkSnip",
    },
  },
  category: "productivity",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    telephone: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
