import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import AboutHero from '@/components/AboutHero';
import AboutProjectsShowcase from '@/components/AboutProjectsShowcase';
import StatsSection from '@/components/StatsSection';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

  export const metadata: Metadata = {
    title: 'About BluePrint Build-Con | Visionary Civil Construction & Engineering',
    description:
      'Discover BluePrint Build-Con: leading turnkey construction company with professional civil engineers, architects, 15-year structural warranty, and customer-first project management.',
    keywords: [
      'about Blueprint BuildCon',
      'Blueprint BuildCon construction',
      'civil construction company',
      'building contractor team',
      'turnkey civil engineers',
      'construction project management',
    ],
    alternates: {
      canonical: `${siteUrl}/about`,
    },
    openGraph: {
      title: 'About BluePrint Build-Con | Visionary Civil Construction',
      description:
        'Learn about our engineering philosophy, architectural design standards, transparent pricing, and 15-year structural warranty.',
      url: `${siteUrl}/about`,
      siteName: 'BluePrint Build-Con',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About BluePrint Build-Con' }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About BluePrint Build-Con | Civil Construction Company',
      description: 'Learn about our engineering philosophy, quality standards, and 15-year structural warranty.',
      images: ['/og-image.png'],
    },
  };

  export default function AboutPage() {
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
          name: 'About Us',
          item: `${siteUrl}/about`,
        },
      ],
    };

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
    <AboutHero />
    <AboutSection isAboutPage={true} />
    <StatsSection />
    <AboutProjectsShowcase />
  </>
);
}
