import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  let session = null;

  if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) {
    console.error('❌ Missing NEXTAUTH_SECRET or NEXTAUTH_URL');
    return NextResponse.next(); // Prevent crash
  }

  try {
    session = await auth();
  } catch (error) {
    console.error('🚀 ~ middleware ~ error:', error);
  }
  // This uses Auth.js's built-in token verification
  // const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check if token is expired (Auth.js handles this internally)
  // But you can add additional checks if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
};
