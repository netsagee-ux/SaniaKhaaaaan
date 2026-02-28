import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TrackView from "@/components/TrackView";

/* ---- Optimized Font Loading ---- */
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

/* ---- Enhanced Metadata (SEO Optimized) ---- */
export const metadata: Metadata = {
  title: {
    default: "Sania",
    template: "%s | Sania",
  },
  description: "Experienced Graphic Designer specializing in modern and high-quality visual design.",
  metadataBase: new URL("https://yourdomain.com"), // Replace with real domain
  openGraph: {
    title: "Sania",
    description: "Experienced Graphic Designer specializing in modern and high-quality visual design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased"
      >
        {/* Global Navigation */}
        <Navbar />

        {/* Global Tracking */}
        <TrackView type="site" />

        {children}
      </body>
    </html>
  );
}