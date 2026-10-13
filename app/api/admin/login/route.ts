import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { comparePassword, createSession, sessionCookie } from '@/lib/auth';
import { Admin } from '@/models/Admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!email || !password) return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });

    const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD;
    const envName = process.env.ADMIN_NAME?.trim() || 'Blueprint Admin';

    if (envEmail && envPassword && email === envEmail && password === envPassword) {
      const response = NextResponse.json({ success: true, data: { name: envName, email: envEmail } });
      response.cookies.set(sessionCookie, createSession(envEmail, 'admin'), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 8, path: '/' });
      return response;
    }

    await connectToDatabase();
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await comparePassword(password, admin.password))) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    const response = NextResponse.json({ success: true, data: { name: admin.name, email: admin.email } });
    response.cookies.set(sessionCookie, createSession(admin._id.toString(), admin.role), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 8, path: '/' });
    return response;
  } catch { return NextResponse.json({ success: false, message: 'Unable to sign in right now' }, { status: 500 }); }
}