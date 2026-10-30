import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Consultation } from '@/models/Consultation';
import { sendConsultationEmail } from '@/lib/mailer';

const requiredFields = ['name', 'phone'] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const consultation = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim() : '',
      projectType: typeof body.projectType === 'string' ? body.projectType.trim() : '',
      company: typeof body.company === 'string' ? body.company.trim() : '',
      location: typeof body.location === 'string' ? body.location.trim() : '',
      propertyStatus: typeof body.propertyStatus === 'string' ? body.propertyStatus.trim() : '',
      budget: typeof body.budget === 'string' ? body.budget.trim() : '',
      service: typeof body.service === 'string' ? body.service.trim() : '',
      message: typeof body.message === 'string' ? body.message.trim() : '',
      joinReferralProgram: typeof body.joinReferralProgram === 'string' ? body.joinReferralProgram.trim() : 'No',
      website: typeof body.website === 'string' ? body.website.trim() : '',
    };

    const missingField = requiredFields.find((field) => !consultation[field]);
    if (missingField) {
      return NextResponse.json({ error: `${missingField} is required` }, { status: 400 });
    }

    await connectToDatabase();
    const created = await Consultation.create(consultation);

    // Send email notification to project@blueprintbuildcon.homes
    try {
      await sendConsultationEmail({
        name: consultation.name,
        phone: consultation.phone,
        email: consultation.email,
        projectType: consultation.projectType,
        location: consultation.location,
        propertyStatus: consultation.propertyStatus,
        budget: consultation.budget,
        service: consultation.service,
        message: consultation.message,
        joinReferralProgram: consultation.joinReferralProgram,
      });
    } catch (mailErr) {
      console.error('Failed sending consultation email:', mailErr);
    }

    return NextResponse.json(
      {
        message: 'Consultation enquiry saved successfully',
        data: { id: created._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Consultation form submission failed:', error);
    return NextResponse.json({ error: 'Unable to save your consultation right now' }, { status: 500 });
  }
}
