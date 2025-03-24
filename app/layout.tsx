import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { ConvexClientProvider } from "@/components/provider/convex-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orphia - AI Music Generator",
  description:
    "Generate unique music with just a prompt using AI powered by neural networks",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <LayoutWrapper>
            {children}
            <Toaster className="z-100" position="bottom-right" closeButton />
          </LayoutWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
