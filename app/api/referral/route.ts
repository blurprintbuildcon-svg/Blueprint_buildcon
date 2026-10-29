import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Referral } from '@/models/Referral';

// POST: Public submission of a new referral
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      referrerName,
      referrerPhone,
      referrerEmail,
      referrerUpi,
      referrerRelation,
      clientName,
      clientPhone,
      clientEmail,
      clientCity,
      serviceRequired,
      propertyStatus,
      estimatedArea,
      projectBudget,
      timeline,
      requirements,
      consentContact,
      consentClientPermission,
    } = body;

    // Required Field Validations
    if (!referrerName?.trim() || !referrerPhone?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Referrer Name and Contact Number are required.' },
        { status: 400 }
      );
    }

    if (!clientName?.trim() || !clientPhone?.trim() || !clientCity?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Referred Client Name, Contact Number, and City are required.' },
        { status: 400 }
      );
    }

    if (!serviceRequired?.trim() || !projectBudget?.trim() || !requirements?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Service required, estimated budget, and project requirements are required.' },
        { status: 400 }
      );
    }

    if (consentClientPermission !== true) {
      return NextResponse.json(
        { success: false, error: 'Client consent and permission confirmation is required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const referral = await Referral.create({
      referrerName: referrerName.trim(),
      referrerPhone: referrerPhone.trim(),
      referrerEmail: referrerEmail?.trim() || '',
      referrerUpi: referrerUpi?.trim() || '',
      referrerRelation: referrerRelation?.trim() || 'Friend / Relative',
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail?.trim() || '',
      clientCity: clientCity.trim(),
      serviceRequired: serviceRequired.trim(),
      propertyStatus: propertyStatus?.trim() || 'Plot owned & ready to build',
      estimatedArea: estimatedArea?.trim() || '',
      projectBudget: projectBudget.trim(),
      timeline: timeline?.trim() || 'Immediate (Within 30 Days)',
      requirements: requirements.trim(),
      consentContact: consentContact ?? true,
      consentClientPermission: true,
      status: 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Referral submitted successfully! Our engineering team will review and contact the client.',
        data: {
          id: referral._id,
          refCode: `BP-${referral._id.toString().slice(-6).toUpperCase()}`,
          clientName: referral.clientName,
          serviceRequired: referral.serviceRequired,
          status: referral.status,
          createdAt: referral.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting referral:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit referral. Please try again or reach out on WhatsApp.',
      },
      { status: 500 }
    );
  }
}

// GET: Look up referral status by referrer's phone or referral ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone')?.trim();
    const id = searchParams.get('id')?.trim();

    if (!phone && !id) {
      return NextResponse.json(
        { success: false, error: 'Provide phone number or referral ID to look up status.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let query: any = {};
    if (id) {
      // Allow searching by MongoDB _id
      query._id = id;
    } else if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const last10Digits = cleanPhone.slice(-10);
      query.referrerPhone = { $regex: last10Digits, $options: 'i' };
    }

    const referrals = await Referral.find(query).sort({ createdAt: -1 }).limit(20);

    const safeResults = referrals.map((r) => {
      // Mask client name for privacy (e.g. "Rajesh D.")
      const nameParts = (r.clientName || '').split(' ');
      const maskedName =
        nameParts.length > 1
          ? `${nameParts[0]} ${nameParts[1][0]}.`
          : nameParts[0] || 'Client';

      return {
        id: r._id,
        refCode: `BP-${r._id.toString().slice(-6).toUpperCase()}`,
        clientMasked: maskedName,
        serviceRequired: r.serviceRequired,
        clientCity: r.clientCity,
        projectBudget: r.projectBudget,
        status: r.status,
        rewardAmount: r.rewardAmount || 0,
        createdAt: r.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      count: safeResults.length,
      data: safeResults,
    });
  } catch (error: any) {
    console.error('Error fetching referral status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to look up referral status' },
      { status: 500 }
    );
  }
}
