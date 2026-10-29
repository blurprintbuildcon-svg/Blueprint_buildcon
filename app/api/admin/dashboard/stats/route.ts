import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { Project } from '@/models/Project';
import { Service } from '@/models/Service';
import { Contact } from '@/models/Contact';
import { Consultation } from '@/models/Consultation';
import { ServiceEnquiry } from '@/models/ServiceEnquiry';
import { Referral } from '@/models/Referral';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const [projects, services, contacts, serviceEnquiries, consultations, referrals] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
      ServiceEnquiry.countDocuments(),
      Consultation.countDocuments(),
      Referral.countDocuments(),
    ]);

    const projectImages = await Project.aggregate([
      { $project: { count: { $size: { $ifNull: ['$images', []] } } } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]).then((result) => result[0]?.total ?? 0);

    const serviceImages = await Service.countDocuments({ image: { $exists: true, $ne: null } });

    return NextResponse.json({
      success: true,
      data: {
        projects,
        services,
        contacts,
        serviceEnquiries,
        consultations,
        referrals,
        projectImages,
        serviceImages,
        submissions: contacts + serviceEnquiries + consultations + referrals,
        totalRecords: projects + services + contacts + serviceEnquiries + consultations + referrals,
      },
    });
  } catch (error) {
    const isUnauthorized = error instanceof Error && error.message === 'UNAUTHORIZED';
    return NextResponse.json(
      { success: false, message: isUnauthorized ? 'Unauthorized' : 'Unable to load dashboard stats' },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}
