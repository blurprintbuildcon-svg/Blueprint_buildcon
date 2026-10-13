import ProcessTimeline from '@/components/ProcessTimeline';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Our Process | Blueprint Build Con',
  description: 'See how Blueprint Build Con takes projects from consultation to handover.',
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A clear process from first idea to final handover."
        description="Strong communication, careful planning, and accountable delivery keep your project clear at every stage."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Architectural plans and construction drawings"
      />
      <ProcessTimeline />
    </>
  );
}