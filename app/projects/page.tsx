import ProjectsGallery from '@/components/ProjectsGallery';
import PageHero from '@/components/PageHero';
import { getPublicProjects } from '@/lib/public-content';

export const metadata = {
  title: 'Projects | BluePrint BuildCon',
  description: 'Browse selected residential, commercial and renovation projects by BluePrint BuildCon.',
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Places built with purpose."
        description="Explore a selection of residential, commercial, and renovation projects delivered by BluePrint BuildCon."
        image="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=85&w=2200"
        imageAlt="Award-winning luxury architectural projects by BluePrint BuildCon"
      />
      <ProjectsGallery projects={projects} />
    </>
  );
}