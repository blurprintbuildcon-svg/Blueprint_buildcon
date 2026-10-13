import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ServiceEnquiry } from '@/models/ServiceEnquiry';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullname = typeof body.fullname === 'string' ? body.fullname.trim() : '';
    const mobile = typeof body.mobile === 'string' ? body.mobile.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const serviceInterestedIn =
      typeof body.serviceInterestedIn === 'string' ? body.serviceInterestedIn.trim() : '';
    const notes = typeof body.notes === 'string' ? body.notes.trim() : '';

    if (!fullname) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    if (!mobile) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    if (!serviceInterestedIn) {
      return NextResponse.json(
        { error: 'Please select which service you are interested in' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const enquiry = await ServiceEnquiry.create({
      fullname,
      mobile,
      email,
      serviceInterestedIn,
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your service enquiry has been successfully submitted. Our team will contact you shortly.',
        data: enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Service enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Unable to submit your enquiry at this time. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
