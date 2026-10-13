import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Project } from '@/models/Project';

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const projectInput = (body: Record<string, unknown>) => ({
  title: text(body.title), location: text(body.location), description: text(body.description), category: text(body.category),
  type: text(body.type), status: ['draft', 'published', 'archived'].includes(text(body.status)) ? text(body.status) : 'published',
  client: text(body.client), area: text(body.area), duration: text(body.duration), completion: text(body.completion),
  year: typeof body.year === 'number' ? body.year : undefined, scope: Array.isArray(body.scope) ? body.scope.filter((value): value is string => typeof value === 'string').map((value) => value.trim()) : [],
  additionalDetails: text(body.additionalDetails), images: Array.isArray(body.images) ? body.images : [],
});

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const page = Math.max(Number(params.get('page') ?? 1), 1); const limit = Math.min(Math.max(Number(params.get('limit') ?? 10), 1), 50);
    const query = text(params.get('search')); const category = text(params.get('category')); const status = text(params.get('status'));
    await connectToDatabase();
    const filter: Record<string, unknown> = {}; if (query) filter.$or = [{ title: new RegExp(query, 'i') }, { location: new RegExp(query, 'i') }]; if (category) filter.category = category; if (status) filter.status = status;
    const [data, total] = await Promise.all([Project.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Project.countDocuments(filter)]);
    return NextResponse.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch { return NextResponse.json({ success: false, message: 'Unable to load projects' }, { status: 500 }); }
}

export async function POST(request: Request) {
  try { await requireAdmin(); const input = projectInput(await request.json()); if (!input.title || !input.location || !input.description || !input.category) return NextResponse.json({ success: false, message: 'Title, location, description, and category are required' }, { status: 400 }); await connectToDatabase(); const project = await Project.create(input); return NextResponse.json({ success: true, message: 'Project created successfully', data: project }, { status: 201 }); }
  catch (error) { return NextResponse.json({ success: false, message: error instanceof Error && error.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Unable to create project' }, { status: error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500 }); }
}