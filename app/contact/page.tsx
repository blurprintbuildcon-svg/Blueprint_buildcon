import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Contact Us | Blueprint Build Con',
  description: 'Contact Blueprint Build Con to discuss your residential or commercial construction project.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Let’s talk about what you’re building."
        description="Tell us what you have in mind and our team will help you find the clearest next step for your project."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Construction team discussing a project together"
      />
      <ContactSection />
      <FAQSection />
    </>
  );
}