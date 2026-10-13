import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Contact } from '@/models/Contact';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredFields = ['name', 'phone', 'email', 'city', 'projectType'] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contact = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim().toLowerCase() : '',
      city: typeof body.city === 'string' ? body.city.trim() : '',
      projectType: typeof body.projectType === 'string' ? body.projectType.trim() : '',
      message: typeof body.message === 'string' ? body.message.trim() : '',
    };

    const missingField = requiredFields.find((field) => !contact[field]);
    if (missingField) {
      return NextResponse.json({ error: `${missingField} is required` }, { status: 400 });
    }

    if (!emailPattern.test(contact.email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    await connectToDatabase();
    await Contact.create(contact);

    return NextResponse.json({ message: 'Contact enquiry saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json({ error: 'Unable to save your enquiry right now' }, { status: 500 });
  }
}