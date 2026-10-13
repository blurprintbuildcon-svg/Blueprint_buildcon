import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'blueprint_admin_session';
const getSecret = () => process.env.JWT_SECRET ?? 'development-only-change-me';

export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function comparePassword(password: string, hash: string) { return bcrypt.compare(password, hash); }
export function createSession(adminId: string, role: string) { return jwt.sign({ sub: adminId, role }, getSecret(), { expiresIn: '8h' }); }
export async function getSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try { return jwt.verify(token, getSecret()) as { sub: string; role: string }; } catch { return null; }
}
export async function requireAdmin() { const session = await getSession(); if (!session || session.role !== 'admin') throw new Error('UNAUTHORIZED'); return session; }
export const sessionCookie = COOKIE_NAME;