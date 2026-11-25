import ContactSection from '@/components/ContactSection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Contact Us | BluePrint Build-Con',
  description: 'Contact BluePrint Build-Con to discuss your residential or commercial construction project.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        fullHeight={true}
        eyebrow="Start a conversation"
        title="Let’s talk about what you’re building."
        description="Tell us what you have in mind and our team will help you find the cleanest next step for your project."
        image="/contact_us.jpg"
        imageAlt="BluePrint Build-Con architectural planning, blueprints and construction consultation"
        ctaText="Send Us a Message"
        ctaHref="#contact"
      />
      <ContactSection />
    </>
  );
}
