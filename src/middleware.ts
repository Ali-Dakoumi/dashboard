import { NextResponse } from 'next/server';
import { auth } from './auth';

// This middleware runs on the edge and should not use headers() directly
export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isAuthRoute =
    nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/signup');

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isAuthRoute && !isApiRoute) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  // If the user is logged in and trying to access an auth route
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // If the user is logged in but doesn't have the right role
  // if (isLoggedIn && session.user.role !== "Super" && nextUrl.pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/dashboard", nextUrl))
  // }

  // Create the response
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // Clean up any existing large headers
  const currentHeaders = response.headers;
  currentHeaders.forEach((value, key) => {
    if (value && value.length > 1024) {
      // If header value is larger than 1KB
      response.headers.delete(key);
    }
  });

  return response;
});

// Optionally configure middleware to match specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)'
  ]
};
