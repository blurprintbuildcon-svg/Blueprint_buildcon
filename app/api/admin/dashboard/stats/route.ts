import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Project } from '@/models/Project';
import { Service } from '@/models/Service';
import { Contact } from '@/models/Contact';
import { Consultation } from '@/models/Consultation';

export async function GET() { try { await requireAdmin(); await connectToDatabase(); const [projects, services, contacts, consultations] = await Promise.all([Project.countDocuments(), Service.countDocuments(), Contact.countDocuments(), Consultation.countDocuments()]); return NextResponse.json({ success: true, data: { projects, services, projectImages: await Project.aggregate([{ $project: { count: { $size: '$images' } } }, { $group: { _id: null, total: { $sum: '$count' } } }]).then((result) => result[0]?.total ?? 0), serviceImages: await Service.countDocuments({ image: { $exists: true, $ne: null } }), submissions: contacts + consultations, totalRecords: projects + services + contacts + consultations } }); } catch (error) { return NextResponse.json({ success: false, message: error instanceof Error && error.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Unable to load dashboard stats' }, { status: error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500 }); } }