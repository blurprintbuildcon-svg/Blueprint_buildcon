import PackagesSection from '@/components/PackagesSection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Construction Packages | Blueprint Build Con',
  description: 'Compare construction packages and request a tailored quote for your project.',
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Build with confidence"
        title="A package that fits the way you want to build."
        description="Straightforward construction packages give you a clear starting point, transparent scope, and room to make the project yours."
        image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Construction professional working with tools"
      />
      <PackagesSection />
    </>
  );
}