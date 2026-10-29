import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Consultation } from '@/models/Consultation';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: consultations });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to fetch consultations' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}

