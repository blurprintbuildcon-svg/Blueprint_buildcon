import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessTimeline from '@/components/ProcessTimeline';
import ProjectsGallery from '@/components/ProjectsGallery';
import QualitySection from '@/components/QualitySection';
import PackagesSection from '@/components/PackagesSection';
import EstimateCTA from '@/components/EstimateCTA';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessTimeline />
      <ProjectsGallery />
      <QualitySection />
      <PackagesSection />
      <EstimateCTA />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
