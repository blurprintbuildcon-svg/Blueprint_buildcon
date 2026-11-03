import ServicesSection from '@/components/ServicesSection';
import PageHero from '@/components/PageHero';
import { getPublicServices } from '@/lib/public-content';

export const metadata = {
  title: 'Construction Services | BluePrint Build-Con',
  description: 'Explore residential, commercial, renovation, interior and project management services by BluePrint Build-Con.',
};

export default async function ServicesPage() {
  const services = await getPublicServices();
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Construction expertise, shaped around your vision."
        description="From residential builds to commercial spaces, our integrated team keeps every detail moving in the right direction."
        image="/Civil%20Construction.jpg"
        imageAlt="Commercial and residential civil construction site with tower crane and architectural blueprints"
      />
      <ServicesSection services={services} />
    </>
  );
}
