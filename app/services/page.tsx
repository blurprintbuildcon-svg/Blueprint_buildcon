import ServicesSection from '@/components/ServicesSection';
import PageHero from '@/components/PageHero';
import { getPublicServices } from '@/lib/public-content';

export const metadata = {
  title: 'Construction Services | Blueprint Build Con',
  description: 'Explore residential, commercial, renovation, interior and project management services.',
};

export default async function ServicesPage() {
  const services = await getPublicServices();
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Construction expertise, shaped around your vision."
        description="From residential builds to commercial spaces, our integrated team keeps every detail moving in the right direction."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Construction workers on a building site"
      />
      <ServicesSection services={services} />
    </>
  );
}