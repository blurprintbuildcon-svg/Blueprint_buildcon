import type { Metadata } from 'next';
import PackagesSection from '@/components/PackagesSection';
import PageHero from '@/components/PageHero';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

export const metadata: Metadata = {
  title: 'Construction Packages & Pricing | Turnkey House Building Cost | BluePrint Build-Con',
  description:
    'Compare transparent house construction packages: Classic, Premium, and Royale Luxury. Fixed-price contracts, detailed BOQ, 10 to 15-year structural warranty, and zero cost escalations.',
  keywords: [
    'construction packages',
    'house construction cost',
    'turnkey construction pricing',
    'building cost per sq ft',
    'villa construction packages',
    'transparent construction pricing',
    'fixed price civil contractor',
  ],
  alternates: {
    canonical: `${siteUrl}/packages`,
  },
  openGraph: {
    title: 'Construction Packages & Pricing | BluePrint Build-Con',
    description:
      'Compare transparent house construction packages with detailed itemized BOQ, high-grade materials, and fixed-price contracts.',
    url: `${siteUrl}/packages`,
    siteName: 'BluePrint Build-Con',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BluePrint Build-Con Packages' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Packages & Pricing | BluePrint Build-Con',
    description: 'Compare transparent house construction packages with zero cost escalation.',
    images: ['/og-image.png'],
  },
};

export default function PackagesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Packages & Pricing',
        item: `${siteUrl}/packages`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        eyebrow="Build with confidence"
        title="A package that fits the way you want to build."
        description="Straightforward construction packages give you a clear starting point, transparent scope, and room to make the project yours."
        image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Civil construction engineer inspecting structural specifications and materials"
      />
      <PackagesSection />
    </>
  );
}
