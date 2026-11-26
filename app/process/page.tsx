import type { Metadata } from 'next';
import ProcessTimeline from '@/components/ProcessTimeline';
import PageHero from '@/components/PageHero';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

  export const metadata: Metadata = {
    title: 'Our Construction Process & Quality Control | BluePrint Build-Con',
    description:
      'Learn about our 6-stage construction process: architectural planning, soil testing, 430+ QA quality checks, escrow-safe milestone billing, and on-time handover with 15-year warranty.',
    keywords: [
      'construction process',
      'construction project management',
      'quality checks in construction',
      'soil testing building',
      'architectural blueprint planning',
      'milestone based construction',
      'turnkey handover process',
    ],
    alternates: {
      canonical: `${siteUrl}/process`,
    },
    openGraph: {
      title: 'Our Construction Process & Quality Control | BluePrint Build-Con',
      description:
        'From soil testing & 3D blueprints to 430+ quality audits and on-time handover: discover how we engineer excellence.',
      url: `${siteUrl}/process`,
      siteName: 'BluePrint Build-Con',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BluePrint Build-Con Construction Process' }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Construction Process & Quality Control | BluePrint Build-Con',
      description: 'Soil testing, 3D architecture, 430+ quality audits, and guaranteed milestones.',
      images: ['/og-image.png'],
    },
  };

  export default function ProcessPage() {
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
          name: 'Process & Quality',
          item: `${siteUrl}/process`,
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
      eyebrow="How we work"
      title="A clear process from first idea to final handover."
      description="Strong communication, careful planning, and accountable delivery keep your project clear at every stage."
      image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=2200"
      imageAlt="Contemporary architectural villa construction and planning"
    />
    <ProcessTimeline />
  </>
);
}
