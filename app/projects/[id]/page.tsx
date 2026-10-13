import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPublicProjectById, getRelatedProjects } from '@/lib/public-content';
import ProjectDetailsView from '@/components/ProjectDetailsView';
import EstimateCTA from '@/components/EstimateCTA';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getPublicProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found | Blueprint Build Con',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | ${project.category} Construction | Blueprint Build Con`,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.title} - Blueprint Build Con`,
      description: project.description.slice(0, 160),
      images: [{ url: project.image }],
    },
  };
}

export default async function SingleProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getPublicProjectById(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.id, project.category, 3);

  return (
    <>
      <ProjectDetailsView project={project} relatedProjects={relatedProjects} />
      <EstimateCTA />
    </>
  );
}
