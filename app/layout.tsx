import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iTech Evolution | Innovative IT Solutions for Growth & Success",
  description:
    "iTech Evolution is a professional UK-based IT solutions firm providing website development, digital marketing, software development, personal assistance, and enterprise IT services.",
  keywords: [
    "IT solutions",
    "web development",
    "digital marketing",
    "software development",
    "personal assistance",
    "UK IT company",
    "cloud services",
    "app development",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://itechevolution.co.uk",
    siteName: "iTech Evolution",
    title: "iTech Evolution | Innovative IT Solutions",
    description:
      "Professional UK-based IT solutions firm delivering bespoke web development, digital marketing, software development, and enterprise services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "iTech Evolution | Innovative IT Solutions",
    description:
      "Professional UK-based IT solutions firm delivering bespoke web development, digital marketing, software development, and enterprise services.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body bg-ink text-white/70 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
