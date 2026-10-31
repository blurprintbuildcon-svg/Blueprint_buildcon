import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

const mainFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: 'swap',
});

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.com'),
  title: "BluePrint Build-Con | Your vision our victory",
  description: "BluePrint Build-Con provides reliable end-to-end residential and commercial construction services with transparent pricing, professional project management and quality-focused execution.",
  icons: {
    icon: '/LOGO%20SVG.svg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: "BluePrint Build-Con | Your vision our victory",
    description: "End-to-end residential and commercial construction services. From blueprint to reality.",
    type: "website",
    images: ['/logo.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mainFont.variable} ${displayFont.variable} scroll-smooth antialiased`}
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
