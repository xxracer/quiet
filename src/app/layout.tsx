import type { Metadata } from "next";
import { Outfit, Bodoni_Moda } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { StructuredData } from "@/components/seo/structured-data";
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/seo-schema";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quietwaredishes.com"),
  title: {
    default: "QuietWare Dishes | Premium Noise-Free Dinnerware Made in USA",
    template: "%s | QuietWare Dishes",
  },
  description:
    "Shop QuietWare premium noise-free plates, bowls, and dinnerware sets. Engineered in Ohio with acoustic dampening technology for peaceful dining. Free US shipping over $50.",
  keywords: [
    "noise-free plates",
    "quiet dishes",
    "silent plates",
    "noise reducing dinnerware",
    "quiet plates for seniors",
    "premium dinnerware USA",
    "acoustic dampening plates",
    "made in USA dinnerware",
    "dishwasher safe quiet plates",
  ],
  authors: [{ name: "QuietWare" }],
  creator: "QuietWare",
  publisher: "QuietWare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quietwaredishes.com",
    siteName: "QuietWare Dishes",
    title: "QuietWare Dishes | Premium Noise-Free Dinnerware Made in USA",
    description:
      "Premium noise-free plates and dinnerware engineered in Ohio. The quietest way to dine, backed by a 5-year warranty and 30-day guarantee.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuietWare Premium Noise-Free Dinnerware on a beautifully set table",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuietWare Dishes | Premium Noise-Free Dinnerware Made in USA",
    description:
      "Premium noise-free plates and dinnerware engineered in Ohio. The quietest way to dine.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://quietwaredishes.com",
    languages: {
      "en-US": "https://quietwaredishes.com",
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "Shopping",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const homePageSchemas = [
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateLocalBusinessSchema(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${outfit.variable} ${bodoni.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AuthProvider>
          {children}
        </AuthProvider>
        <div className="grain-overlay" aria-hidden="true" />
        <StructuredData data={homePageSchemas} />
      </body>
    </html>
  );
}
