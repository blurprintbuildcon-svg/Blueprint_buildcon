import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import PageHero from '@/components/PageHero';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

  export const metadata: Metadata = {
    title: 'Contact BluePrint Build-Con | Civil Contractors & Project Consultation',
    description:
      'Contact BluePrint Build-Con for residential & commercial construction consultation. Call +91 9028346900 or visit our Pune head office at Baner Road. Fast response within 2 hours.',
    keywords: [
      'contact Blueprint BuildCon',
      'construction consultation',
      'hire building contractor',
      'civil contractor enquiry',
      'construction company office pune',
      'BluePrint BuildCon phone number',
    ],
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
    openGraph: {
      title: 'Contact BluePrint Build-Con | Construction Project Consultation',
      description:
        'Connect directly with our senior civil engineers and architects for site consultations, estimation breakdown, and turnkey project planning.',
      url: `${siteUrl}/contact`,
      siteName: 'BluePrint Build-Con',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact BluePrint Build-Con' }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact BluePrint Build-Con | Civil Contractors',
      description: 'Connect directly with our senior civil engineers and architects for project consultation.',
      images: ['/og-image.png'],
    },
  };

  export default function ContactPage() {
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
          name: 'Contact Us',
          item: `${siteUrl}/contact`,
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
      compact
      eyebrow="Start a conversation"
      title="Let’s talk about what you’re building."
      description="Tell us what you have in mind and our team will help you find the cleanest next step for your project."
      image="/H.jpg"
      imageAlt="BluePrint Build-Con architectural and construction consultation"
    />
    <ContactSection />
  </>
);
}
