import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

  export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const status = searchParams.get('status');
      await connectToDatabase();
      const query = status && status !== 'all' ? { status } : {};
      const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: testimonials });
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      await connectToDatabase();

      if (body.action === 'seed_samples') {
        const { testimonials: samples } = await import('@/data/testimonials');
        const docs = samples.map((s) => ({
          fullname: s.name,
          email: `${s.name.toLowerCase().replace(/\s+/g, '.')}@client.example`,
          feedback: s.text,
          rating: s.rating,
          status: 'pending',
        }));
        await Testimonial.insertMany(docs);
        const all = await Testimonial.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, message: 'Sample testimonials imported as Pending', data: all });
      }

      const { fullname, email, feedback, rating, status = 'approved' } = body;
      const testimonial = await Testimonial.create({ fullname, email, feedback, rating, status });
      return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Failed to process admin request' }, { status: 500 });
    }
  }
