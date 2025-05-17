import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export default async function middleware(req: NextRequest) {
  // check if the user is authenticated
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // check if the user is authorized to access the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*']
};
