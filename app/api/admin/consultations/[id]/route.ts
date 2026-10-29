import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Consultation } from '@/models/Consultation';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    await connectToDatabase();
    const updated = await Consultation.findByIdAndUpdate(
      id,
      {
        ...(body.status && { status: body.status }),
        ...(typeof body.adminNotes === 'string' && { adminNotes: body.adminNotes }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Consultation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to update consultation' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await connectToDatabase();
    const deleted = await Consultation.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Consultation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to delete consultation' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}

