import { Oswald, Lato, Inter, Space_Mono } from "next/font/google";

const heading = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "700",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  preload: true,
  style: "normal",
});

const subheading = Lato({
  variable: "--font-sub",
  subsets: ["latin"],
  weight: "400",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  preload: true,
  style: "normal",
});

const paragraph = Inter({
  variable: "--font-para",
  subsets: ["latin"],
  weight: "400",
  fallback: ["Roboto", "Helvetica", "sans-serif"],
  preload: true,
  style: "normal",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
  fallback: ["Menlo", "Consolas", "monospace"],
  preload: true,
  style: "normal",
});

export { heading, subheading, paragraph, mono };
