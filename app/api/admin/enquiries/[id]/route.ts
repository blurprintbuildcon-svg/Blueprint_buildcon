import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { ServiceEnquiry } from '@/models/ServiceEnquiry';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await connectToDatabase();
    const deleted = await ServiceEnquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to delete service enquiry' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}
