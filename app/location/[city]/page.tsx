import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES_DATA, getCityBySlug } from '@/data/cityData';
import CityLandingView from '@/components/CityLandingView';

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  return {
    title: `Construction Company in ${cityData.name} | BluePrint Build-Con`,
    description: `Top tech-driven construction company in ${cityData.name}, ${cityData.state}. 10,000+ homes built across India with 10-year structural warranty, transparent pricing & live mobile app tracking.`,
    openGraph: {
      title: `Construction Company in ${cityData.name} | BluePrint Build-Con`,
      description: `Turnkey house & commercial construction in ${cityData.name}. 430+ quality audits and zero cost escalation.`,
      images: [cityData.heroImage],
    },
  };
}

export default async function CityLocationPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  return <CityLandingView city={cityData} />;
}

