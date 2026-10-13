import EditProjectForm from '@/components/admin/EditProjectForm';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditProjectForm id={(await params).id} />;
}