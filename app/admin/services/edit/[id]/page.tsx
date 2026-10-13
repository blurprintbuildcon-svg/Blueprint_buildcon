import EditServiceForm from '@/components/admin/EditServiceForm';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  return <EditServiceForm id={(await params).id} />;
}