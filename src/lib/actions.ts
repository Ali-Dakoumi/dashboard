'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

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

    // If there's an error in the result, map it to a user-friendly message
    if (result?.error) {
      // Map Auth.js error types to user-friendly messages
      switch (result.error) {
        case 'CredentialsSignin':
          return {
            error: 'The email or password you entered is incorrect.'
          };
        case 'AccessDenied':
          return {
            error:
              "You don't have permission to access this resource. Please contact your administrator."
          };
        case 'AccountNotLinked':
          return {
            error:
              'Your account is not linked. Please sign in using the method you used previously.'
          };
        case 'CallbackRouteError':
          // Extract the cause message if available
          if (result.error === 'CallbackRouteError') {
            // The error details might be in the cause
            return {
              error:
                'Invalid email or password. Please check your credentials and try again.'
            };
          }
          return {
            error: result.error
          };
        case 'Default':
        default:
          return {
            error: 'An authentication error occurred. Please try again.'
          };
      }
    }

    // Success case
    return {
      success: true
    };
  } catch (error) {
    // Handle specific AuthError types
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'The email or password you entered is incorrect.'
          };
        case 'AccessDenied':
          return {
            error: "You don't have permission to access this resource."
          };
        case 'CallbackRouteError':
          // Try to extract more specific error from the cause
          if (error.cause) {
            const cause = error.cause.err as { message?: string };
            if (cause.message?.includes('Invalid email or password')) {
              return {
                error: 'The email or password you entered is incorrect.'
              };
            }
            if (cause.message?.includes('Too many')) {
              return {
                error: 'Too many login attempts. Please try again later.'
              };
            }
            if (cause.message) {
              return {
                error: cause.message
              };
            }
          }
          return {
            error: 'Authentication failed. Please try again.'
          };
        default:
          return {
            error: error.message || 'Authentication failed'
          };
      }
    }

    // Default error message
    return {
      error: 'An unexpected error occurred. Please try again.'
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
