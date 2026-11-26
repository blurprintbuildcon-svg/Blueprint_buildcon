import type { Metadata } from 'next';
import ServicesSection from '@/components/ServicesSection';
import PageHero from '@/components/PageHero';
import { getPublicServices } from '@/lib/public-content';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

  export const metadata: Metadata = {
    title: 'Building Construction Services | Turnkey Civil Contractors | BluePrint Build-Con',
    description:
      'Comprehensive construction services: residential villa construction, commercial building development, architectural design, 3D elevation, structural renovation, and turnkey civil contracting.',
    keywords: [
      'building construction services',
      'civil construction company',
      'residential construction',
      'commercial construction',
      'house construction company',
      'building contractor',
      'civil contractor',
      'turnkey construction services',
      'real estate construction services',
    ],
    alternates: {
      canonical: `${siteUrl}/services`,
    },
    openGraph: {
      title: 'Building Construction Services | BluePrint Build-Con',
      description:
        'From custom residential villas to commercial corporate towers: end-to-end turnkey construction, architectural design, and civil engineering.',
      url: `${siteUrl}/services`,
      siteName: 'BluePrint Build-Con',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BluePrint Build-Con Services' }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Building Construction Services | BluePrint Build-Con',
      description: 'Turnkey residential villas, commercial building, structural planning & civil contracting.',
      images: ['/og-image.png'],
    },
  };

  export default async function ServicesPage() {
    const services = await getPublicServices();

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
      name: 'Services',
      item: `${siteUrl}/services`,
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
      eyebrow="What we do"
      title="Construction expertise, shaped around your vision."
      description="From residential builds to commercial spaces, our integrated team keeps every detail moving in the right direction."
      image="/services_blueprint.jpg"
      imageAlt="Commercial and residential civil construction site with tower crane and architectural blueprints"
      fullHeight={true}
      ctaText="Explore Our Services"
      ctaHref="#services"
    />
    <ServicesSection services={services} />
  </>
);
}
