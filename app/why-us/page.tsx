import type { Metadata } from 'next';
import QualitySection from '@/components/QualitySection';
import WhyChooseUs from '@/components/WhyChooseUs';
import PageHero from '@/components/PageHero';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

  export const metadata: Metadata = {
    title: 'Why Choose BluePrint Build-Con | 15-Year Warranty & Fixed Pricing',
    description:
      'Discover why homeowners and developers trust BluePrint Build-Con: zero cost escalations, 15-year structural warranty, 430+ rigorous QA checks, and mobile-tracked milestone deliveries.',
    keywords: [
      'why choose Blueprint BuildCon',
      'reliable construction company',
      '15 year structural warranty',
      'zero cost escalation contractor',
      'quality construction standards',
      'transparent civil contractor',
    ],
    alternates: {
      canonical: `${siteUrl}/why-us`,
    },
    openGraph: {
      title: 'Why Choose BluePrint Build-Con | Engineering Integrity',
      description:
        'Zero cost escalations, 15-year structural warranty, 430+ QA inspections, and in-house civil engineering teams.',
      url: `${siteUrl}/why-us`,
      siteName: 'BluePrint Build-Con',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Why Choose BluePrint Build-Con' }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Why Choose BluePrint Build-Con | Guaranteed Timelines & Quality',
      description: 'Zero cost escalations, 15-year structural warranty, 430+ QA checks.',
      images: ['/og-image.png'],
    },
  };

  export default function WhyUsPage() {
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
          name: 'Why Us',
          item: `${siteUrl}/why-us`,
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
      eyebrow="Why BluePrint Build-Con"
      title="The difference is in how we show up."
      description="Quality is more than a finish. It is the care, honesty, and ownership we bring to every decision throughout your build."
      image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=2200"
      imageAlt="Luxury architectural residence engineered by BluePrint BuildCon"
      fullHeight={true}
      ctaText="Explore Why BluePrint"
      ctaHref="#why-us"
    />
    <WhyChooseUs />
    <QualitySection />
  </>
);
}
