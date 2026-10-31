import ProcessTimeline from '@/components/ProcessTimeline';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Our Process | BluePrint Build-Con',
  description: 'See how BluePrint Build-Con takes projects from consultation to handover.',
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A clear process from first idea to final handover."
        description="Strong communication, careful planning, and accountable delivery keep your project clear at every stage."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Contemporary architectural villa construction and planning"
      />
      <ProcessTimeline />
    </>
  );
}