'use server';

import { signIn, signOut } from '@/auth';
import { auth } from '@/auth';

interface ErrorCause {
  message: string;
  statusCode: number;
}

type ActionState = {
  error?: string;
  success?: boolean;
  userData?: any; // Using any to allow full response data
};

export async function login(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log('🚀 Starting login process...');
  const email = formData.get('email');
  const password = formData.get('password');

  console.log('📧 Email provided:', email ? 'Yes' : 'No');
  console.log('🔑 Password provided:', password ? 'Yes' : 'No');

  if (!email || !password) {
    console.log('❌ Missing credentials');
    return {
      error: 'Please provide both email and password'
    };
  }

  try {
    console.log('🔄 Attempting signIn with credentials...');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    console.log('📦 Raw auth result:', result);

    // If signIn was successful, result should have a url property
    if (result?.error) {
      console.log('❌ SignIn error:', result.error);
      return {
        error: result.error
      };
    }

    console.log('✅ SignIn successful!');
    console.log('👤 User data:', result);

    // Return success with complete response data
    return {
      success: true,
      userData: result
    };
  } catch (error) {
    console.log('💥 Login error caught:', error);

    if (error instanceof Error) {
      // Extract the original error message from the cause if available
      const errorCause = error.cause as ErrorCause | undefined;

      if (errorCause?.message) {
        console.log('🔍 Error cause found:', errorCause);
        return {
          error: errorCause.message
        };
      }

      // Check for specific messages in the error
      const errorMessage = error.message.toLowerCase();
      console.log('📝 Error message:', errorMessage);

      if (errorMessage.includes('too many') || errorMessage.includes('429')) {
        console.log('🚫 Rate limit exceeded');
        return {
          error: 'Too many login attempts. Please try again later.'
        };
      }

      if (
        errorMessage.includes('timeout') ||
        errorMessage.includes('etimedout')
      ) {
        console.log('⏰ Connection timeout');
        return {
          error: 'Connection timeout. Please try again later.'
        };
      }

      if (errorMessage.includes('invalid') || errorMessage.includes('401')) {
        console.log('🔒 Invalid credentials');
        return {
          error: 'Invalid email or password'
        };
      }

      // Default auth error message
      console.log('❓ Unknown authentication error');
      return {
        error: 'Authentication failed. Please check your credentials.'
      };
    }

    // For any other type of error
    console.log('❗ Unhandled error type');
    return {
      error: 'An unexpected error occurred. Please try again later.'
    };
  }
}

export async function logout() {
  console.log('👋 Starting logout process...');
  try {
    await signOut({ redirectTo: '/' });
    console.log('✅ Logout successful');
  } catch (error) {
    console.error('❌ Logout error:', error);
    throw error;
  }
}
