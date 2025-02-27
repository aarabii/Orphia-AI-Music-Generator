import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { paragraph } from "./fonts";

export const metadata: Metadata = {
  title: "Orphia | AI-Powered Music Generator",
  description:
    "Create unique AI-generated music with Orphia! Inspired by Greek mythology’s Orpheus, Orphia transforms text prompts into original compositions using advanced AI technology.",
  keywords: [
    "AI Music Generator",
    "Music AI",
    "AI-powered music",
    "music generation",
    "Orpheus AI",
    "AI-generated songs",
    "Music composition AI",
  ],
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "Orphia | AI-Powered Music Generator",
    description:
      "Create unique AI-generated music with Orphia! Inspired by Greek mythology’s Orpheus, Orphia transforms text prompts into original compositions using advanced AI technology.",
    url: "https://orphia.vercel.app",
    siteName: "Orphia",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "Orphia AI Music Generator Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orphia | AI-Powered Music Generator",
    description:
      "Generate unique, AI-powered music with Orphia—your go-to tool inspired by Greek mythology’s Orpheus for creating original compositions.",
    images: ["/images/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Orphia",
              description:
                "Orphia is an AI-powered music generator that creates songs from text prompts and melodies, inspired by Greek mythology’s Orpheus.",
              image: "https://orphia.vercel.app/images/logo.svg",
              url: "https://orphia.vercel.app",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              author: {
                "@type": "Person",
                name: "Aarab Nishchal",
              },
            }),
          }}
        />
      </head>
      <body className={`${paragraph.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
