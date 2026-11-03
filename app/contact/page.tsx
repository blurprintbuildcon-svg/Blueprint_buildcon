import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Contact Us | BluePrint Build-Con',
  description: 'Contact BluePrint Build-Con to discuss your residential or commercial construction project.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Let’s talk about what you’re building."
        description="Tell us what you have in mind and our team will help you find the clearest next step for your project."
        image="/H.jpg"
        imageAlt="BluePrint Build-Con architectural and construction consultation"
      />
      <ContactSection />
      <FAQSection />
    </>
  );
}
