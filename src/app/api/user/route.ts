import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Get the session using NextAuth
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(null, { status: 401 });
    }

    // Return the user data from the session
    return NextResponse.json({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      avatar: session.user.image
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
