import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Consultation } from '@/models/Consultation';

const requiredFields = ['name', 'phone'] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const consultation = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      company: typeof body.company === 'string' ? body.company.trim() : '',
      message: typeof body.message === 'string' ? body.message.trim() : '',
    };

    const missingField = requiredFields.find((field) => !consultation[field]);
    if (missingField) {
      return NextResponse.json({ error: `${missingField} is required` }, { status: 400 });
    }

    await connectToDatabase();
    await Consultation.create(consultation);

    return NextResponse.json({ message: 'Consultation saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Consultation form submission failed:', error);
    return NextResponse.json({ error: 'Unable to save your consultation right now' }, { status: 500 });
  }
}