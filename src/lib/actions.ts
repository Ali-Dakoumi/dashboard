'use server';

import { signIn, signOut } from '@/auth';

type ActionState = {
  error?: string;
  success?: boolean;
  userData?: {
    ok?: boolean;
    url?: string;
  };
};

export async function login(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Please provide both email and password'
    };
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      return {
        error: result.error
      };
    }

    // Only return safe, serializable data
    return {
      success: true,
      userData: {
        ok: result?.ok,
        url: result?.url
      }
    };
  } catch (error) {
    return {
      error: 'An unexpected error occurred during login'
    };
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: '/' });
  } catch (error) {
    console.error('❌ Logout error:', error);
    throw error;
  }
}
