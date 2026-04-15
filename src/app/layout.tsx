import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quietwaredishes.com"),
  title: {
    default: "QuietWare Dishes | Noise-Free Premium Dinnerware for US Homes",
    template: "%s | QuietWare Dishes",
  },
  description:
    "Discover QuietWare premium noise-free plates and dinnerware. Engineered with acoustic dampening technology for peaceful dining. #1 quality-price choice in the USA.",
  keywords: [
    "noise-free plates",
    "quiet dishes",
    "silent plates for apartments",
    "noise reducing dinnerware",
    "quiet plates for seniors",
    "premium dinnerware USA",
    "best quality price silent plates",
    "acoustic dampening plates",
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
    title: "QuietWare Dishes | Noise-Free Premium Dinnerware",
    description:
      "Premium noise-free plates engineered for peaceful dining. The #1 quality-price choice in the USA.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuietWare Premium Noise-Free Dinnerware",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuietWare Dishes | Noise-Free Premium Dinnerware",
    description:
      "Premium noise-free plates engineered for peaceful dining. The #1 quality-price choice in the USA.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://quietwaredishes.com",
    languages: {
      "en-US": "https://quietwaredishes.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#fafaf9] text-[#1c1917] antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
