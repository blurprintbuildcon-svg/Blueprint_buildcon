import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Contact } from '@/models/Contact';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to fetch contact submissions' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}
