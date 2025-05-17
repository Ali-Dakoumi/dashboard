import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/api/auth'
  ];

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith('/api/auth/')
  );

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // If no token and trying to access a protected route
  if (!token && !isPublicPath) {
    const url = new URL('/', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If token exists and trying to access login page, redirect to dashboard
  if (token && (path === '/' || path === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts).*)']
};
