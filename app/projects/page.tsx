import type { Metadata } from 'next';
import ProjectsGallery from '@/components/ProjectsGallery';
import PageHero from '@/components/PageHero';
import { getPublicProjects } from '@/lib/public-content';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

  export const metadata: Metadata = {
    title: 'Completed & Ongoing Construction Projects | BluePrint Build-Con',
    description:
      'Explore completed residential luxury villas, commercial buildings, corporate facilities, and structural renovations engineered and delivered by BluePrint Build-Con.',
    keywords: [
      'construction projects',
      'completed residential projects',
      'commercial construction portfolio',
      'luxury villa projects',
      'turnkey civil construction portfolio',
      'Blueprint BuildCon projects',
    ],
    alternates: {
      canonical: `${siteUrl}/projects`,
    },
    openGraph: {
      title: 'Completed & Ongoing Construction Projects | BluePrint Build-Con',
      description:
        'Explore residential villas, modern apartments, and commercial projects constructed by BluePrint Build-Con.',
      url: `${siteUrl}/projects`,
      siteName: 'BluePrint Build-Con',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BluePrint Build-Con Projects Gallery' }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Completed & Ongoing Construction Projects | BluePrint Build-Con',
      description: 'Explore residential luxury villas and commercial structures delivered by BluePrint Build-Con.',
      images: ['/og-image.png'],
    },
  };

  export default async function ProjectsPage() {
    const projects = await getPublicProjects();

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
      name: 'Projects',
      item: `${siteUrl}/projects`,
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
      eyebrow="Our work"
      title="Places built with purpose."
      description="Explore a selection of residential, commercial, and renovation projects delivered by BluePrint BuildCon."
      image="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=85&w=2200"
      imageAlt="Award-winning luxury architectural projects by BluePrint BuildCon"
    />
    <ProjectsGallery projects={projects} />
  </>
);
}
