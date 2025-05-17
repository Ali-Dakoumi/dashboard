import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Add debug logging in production
  console.log(`🔒 Middleware checking path: ${path}`);

  // This uses Auth.js's built-in token verification
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  console.log(`🔑 Token exists: ${!!token}`);

  // Define public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/api/auth'
  ];

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith('/api/auth/')
  );

  // If no token and trying to access a protected route
  if (!token && !isPublicPath) {
    console.log(`🚫 No token, redirecting to login from: ${path}`);

    // Store the original URL to redirect back after login
    const url = new URL('/', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));

    return NextResponse.redirect(url);
  }

  // If token exists and trying to access login page, redirect to dashboard
  if (token && (path === '/' || path === '/login')) {
    console.log(`✅ Token exists, redirecting to dashboard from: ${path}`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes that don't need auth
    // - Static files (images, fonts, etc)
    // - Favicon
    '/((?!_next/static|_next/image|favicon.ico|images|fonts).*)'
  ]
};
