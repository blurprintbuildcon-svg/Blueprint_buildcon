import ProjectsGallery from '@/components/ProjectsGallery';
import PageHero from '@/components/PageHero';
import { getPublicProjects } from '@/lib/public-content';

export const metadata = {
  title: 'Projects | Blueprint Build Con',
  description: 'Browse selected residential, commercial and renovation projects by Blueprint Build Con.',
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Places built with purpose."
        description="Explore a selection of residential, commercial, and renovation projects delivered by Blueprint Build Con."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Modern office building exterior"
      />
      <ProjectsGallery projects={projects} />
    </>
  );
}