import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getCloudinarySignature } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json().catch(() => ({}));
    const folder = body.folder === 'services' ? 'blueprint-buildcon/services' : 'blueprint-buildcon/projects';
    return NextResponse.json({ success: true, data: { ...getCloudinarySignature(folder), cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY } });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error && error.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Unable to prepare image upload' }, { status: error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500 });
  }
}