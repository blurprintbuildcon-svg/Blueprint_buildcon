import QualitySection from '@/components/QualitySection';
import WhyChooseUs from '@/components/WhyChooseUs';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Why Choose Us | Blueprint Build Con',
  description: 'Discover the quality, transparency and support behind Blueprint Build Con projects.',
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Blueprint Build Con"
        title="The difference is in how we show up."
        description="Quality is more than a finish. It is the care, honesty, and ownership we bring to every decision throughout your build."
        image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Construction worker inspecting a project"
      />
      <WhyChooseUs />
      <QualitySection />
    </>
  );
}