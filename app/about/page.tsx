import AboutSection from '@/components/AboutSection';
import AboutHero from '@/components/AboutHero';
import AboutProjectsShowcase from '@/components/AboutProjectsShowcase';
import StatsSection from '@/components/StatsSection';

export const metadata = {
  title: 'About Us | Blueprint Build Con',
  description: 'Learn about Blueprint Build Con and our end-to-end construction approach.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSection />
      <StatsSection />
      <AboutProjectsShowcase />
    </>
  );
}