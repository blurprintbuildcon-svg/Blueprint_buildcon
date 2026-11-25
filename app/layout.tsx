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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BluePrint Build-Con | Residential & Commercial Construction Company in Pune",
    template: "%s | BluePrint Build-Con",
  },
  description: "BluePrint Build-Con is a premier civil construction company in Pune offering end-to-end turnkey residential villa construction, commercial building development, architectural design, and structural renovation with transparent pricing, 15-year warranty, and on-time delivery.",
  keywords: [
    "construction company in pune",
    "residential construction pune",
    "commercial building contractor pune",
    "turnkey civil contractors baner",
    "architectural planning pune",
    "villa construction pune",
    "house construction contractors pune",
    "blueprint buildcon",
    "blueprint buildcon homes",
  ],
  authors: [{ name: "BluePrint Build-Con" }],
  creator: "BluePrint Build-Con",
  publisher: "BluePrint Build-Con",
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/Just%20Logo-01.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "BluePrint Build-Con | Your Vision Our Victory",
  description: "Premier residential villa and commercial construction specialists in Pune. Transparent pricing, 15-year structural warranty, and end-to-end turnkey project delivery.",
  url: siteUrl,
  siteName: "BluePrint Build-Con",
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'BluePrint Build-Con Construction & Architecture in Pune',
    },
  ],
  locale: 'en_IN',
  type: 'website',
},
  twitter: {
    card: 'summary_large_image',
    title: "BluePrint Build-Con | Construction Company in Pune",
    description: "Premier turnkey residential and commercial civil contractors in Pune. Fixed price, 15-year warranty.",
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google9178ae3ea80e92ef',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'GeneralContractor', 'HomeAndConstructionBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: 'BluePrint Build-Con',
      alternateName: 'Blueprint Buildcon',
      url: siteUrl,
      logo: `${siteUrl}/android-chrome-512x512.png`,
      image: `${siteUrl}/og-image.png`,
      description: 'End-to-end residential and commercial civil construction, architectural design, and turnkey contracting in Pune, Maharashtra.',
      telephone: '+919028346900',
      email: 'project@blueprintbuildcon.homes',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Work Flo, Icon Tower, 7th Floor, Office No. 702, Baner Road, Opp. KFC, Baner',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '411045',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '18.5597',
        longitude: '73.7799',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:30',
        },
      ],
      priceRange: '₹₹₹',
      sameAs: [
        'https://wa.me/919028346900',
        'https://wa.me/919028087659',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'BluePrint Build-Con',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
