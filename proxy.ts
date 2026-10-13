import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const cookieName = 'blueprint_admin_session';
const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'development-only-change-me');

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') return NextResponse.next();
  const token = request.cookies.get(cookieName)?.value;
  if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin') throw new Error('Invalid role');
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete(cookieName);
    return response;
  }
}

export const config = { matcher: ['/admin/:path*'] };
