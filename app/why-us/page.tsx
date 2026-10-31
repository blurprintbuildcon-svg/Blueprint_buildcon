import QualitySection from '@/components/QualitySection';
import WhyChooseUs from '@/components/WhyChooseUs';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Why Choose Us | BluePrint Build-Con',
  description: 'Discover the quality, transparency and support behind BluePrint Build-Con projects.',
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why BluePrint Build-Con"
        title="The difference is in how we show up."
        description="Quality is more than a finish. It is the care, honesty, and ownership we bring to every decision throughout your build."
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Luxury architectural residence engineered by BluePrint BuildCon"
      />
      <WhyChooseUs />
      <QualitySection />
    </>
  );
}