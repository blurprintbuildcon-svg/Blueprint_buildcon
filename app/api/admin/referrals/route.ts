import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Referral } from '@/models/Referral';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const referrals = await Referral.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: referrals });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, error: isUnauthorized ? 'Unauthorized' : 'Failed to fetch referrals' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}

