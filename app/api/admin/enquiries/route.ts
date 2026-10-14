import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { ServiceEnquiry } from '@/models/ServiceEnquiry';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const enquiries = await ServiceEnquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to fetch service enquiries' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}
