import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: 'swap',
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.com'),
  title: "BluePrint-BuildCon | Ideas • Structures • Reality",
  description: "BluePrint-BuildCon provides reliable end-to-end residential and commercial construction services with transparent pricing, professional project management and quality-focused execution.",
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: "BluePrint-BuildCon | Ideas • Structures • Reality",
    description: "End-to-end residential and commercial construction services. From blueprint to reality.",
    type: "website",
    images: ['/logo.jpeg'],
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
      className={`${bodyFont.variable} ${displayFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
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
