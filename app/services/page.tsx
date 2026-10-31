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
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Contemporary luxury estate and modern architectural construction"
      />
      <ServicesSection services={services} />
    </>
  );
}