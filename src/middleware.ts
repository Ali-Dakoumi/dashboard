import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // This uses Auth.js's built-in token verification
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check if token is expired (Auth.js handles this internally)
  // But you can add additional checks if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
};
