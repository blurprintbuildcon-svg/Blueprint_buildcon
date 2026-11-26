import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES_DATA, getCityBySlug } from '@/data/cityData';
import CityLandingView from '@/components/CityLandingView';

interface PageProps {
  params: Promise<{ city: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

export function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: 'City Location | BluePrint Build-Con',
    };
  }

  const isPatna = cityData.slug === 'patna';

  const title = isPatna
    ? 'Construction Company in Patna, Bihar | Building Contractor | BluePrint Build-Con'
    : `Construction Company in ${cityData.name}, ${cityData.state} | BluePrint Build-Con`;

  const description = isPatna
    ? 'Top civil construction company & building contractor in Patna, Bihar. Turnkey residential house construction, commercial building & civil engineering services across Bailey Road, Boring Road, Kankarbagh & Danapur with transparent pricing and 10-year warranty.'
    : `Premier building contractor & civil construction company in ${cityData.name}, ${cityData.state}. Turnkey residential house and commercial building construction with 430+ quality checks, 10-year structural warranty & transparent pricing.`;

  const keywords = isPatna
    ? [
      'Construction company in Patna',
      'Building contractor in Patna',
      'Civil construction company in Patna',
      'House construction in Patna',
      'Residential construction company in Patna',
      'Commercial construction in Patna',
      'Construction services in Bihar',
      'Turnkey civil contractor Patna',
      'Boring Road house construction',
      'Bailey Road builder Patna',
      'Danapur civil contractor',
    ]
    : [
      `Construction company in ${cityData.name}`,
      `Building contractor in ${cityData.name}`,
      `Civil construction company in ${cityData.name}`,
      `House construction in ${cityData.name}`,
      `Residential construction in ${cityData.name}`,
      `Commercial construction in ${cityData.name}`,
      `Turnkey builder ${cityData.name}`,
      ...cityData.localities.slice(0, 5).map((loc) => `${loc} construction contractor`),
    ];

  const canonicalUrl = `${siteUrl}/location/${cityData.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'BluePrint Build-Con',
      images: [
        {
          url: cityData.heroImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${cityData.heroHeadline} - BluePrint Build-Con`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cityData.heroImage || '/og-image.png'],
    },
  };
}

export default async function CityLocationPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const pageCanonical = `${siteUrl}/location/${cityData.slug}`;

  // Structured Data (JSON-LD) for LocalBusiness + Breadcrumbs
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['GeneralContractor', 'HomeAndConstructionBusiness'],
    '@id': `${pageCanonical}/#business`,
    name: `BluePrint Build-Con - ${cityData.heroHeadline}`,
    alternateName: `Blueprint Buildcon ${cityData.name}`,
    url: pageCanonical,
    image: cityData.heroImage || `${siteUrl}/og-image.png`,
    description: cityData.tagline,
    telephone: '+919028346900',
    email: 'project@blueprintbuildcon.homes',
    priceRange: '₹₹₹',
    areaServed: {
      '@type': 'City',
      name: cityData.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: cityData.state,
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityData.name,
      addressRegion: cityData.state,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:30',
      },
    ],
  };

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
        name: 'Locations',
        item: `${siteUrl}/#cities`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cityData.name}, ${cityData.state}`,
        item: pageCanonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CityLandingView city={cityData} />
    </>
  );
}
