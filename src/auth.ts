import axios, { type AxiosError } from 'axios';
import NextAuth, { type DefaultSession, type User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { envConfig } from './lib/config';
import { endpoints } from './lib/constants';
import { signInSchema } from './lib/zod';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      name?: string | null;
      token: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    email: string;
    name?: string | null;
  }
}

// Define custom user type
interface CustomUser extends User {
  token: string;
  status: string;
  message?: string;
}

interface SignInResponse {
  message: string;
  token: string;
  userid: string;
  email: string;
  username: string;
  user_type: string;
  status: string;
}

interface UserStatusResponse {
  user_type: string;
  status: string;
}

interface ErrorCause {
  message: string;
  statusCode: number;
}

class AuthenticationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = statusCode;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          const validationError = new Error('Invalid email or password format');
          validationError.cause = {
            message: 'Invalid email or password format',
            statusCode: 400
          } as ErrorCause;
          throw validationError;
        }

        try {
          const signInUrl = `${envConfig.NEXT_PUBLIC_DATABASE_URL}${endpoints.auth.signIn}`;
          const response = await axios.post<SignInResponse>(
            signInUrl,
            credentials,
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );

          const { message, token, ...rest } = response.data;

          if (message === 'success' && token) {
            return {
              id: rest.userid,
              email: rest.email,
              name: rest.username,
              role: rest.user_type,
              type: rest.user_type,
              status: rest.status,
              token: token
            };
          } else {
            const authError = new Error('Authentication failed');
            authError.cause = {
              message: 'Authentication failed',
              statusCode: 401
            } as ErrorCause;
            throw authError;
          }
        } catch (error) {
          const axiosError = error as AxiosError;

          if (error instanceof Error && error.cause) {
            throw error;
          }

          if (axiosError.message.includes('ETIMEDOUT')) {
            const timeoutError = new Error(
              'Connection timeout. Please try again later.'
            );
            timeoutError.cause = {
              message: 'Connection timeout. Please try again later.',
              statusCode: 408
            } as ErrorCause;
            throw timeoutError;
          }

          if (axiosError.message.includes('401')) {
            const credentialsError = new Error('Invalid email or password');
            credentialsError.cause = {
              message: 'Invalid email or password',
              statusCode: 401
            } as ErrorCause;
            throw credentialsError;
          }

          if (axiosError.message.includes('429')) {
            const rateLimitError = new Error(
              'Too many login attempts. Please try again later.'
            );
            rateLimitError.cause = {
              message: 'Too many login attempts. Please try again later.',
              statusCode: 429
            } as ErrorCause;
            throw rateLimitError;
          }

          const genericError = new Error('Authentication failed');
          genericError.cause = {
            message: 'Authentication failed',
            statusCode: axiosError.response?.status || 500
          } as ErrorCause;
          throw genericError;
        }
      }
    })
  ],
  callbacks: {
    async jwt(props) {
      const { token, user } = props;
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.token = token.token as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/'
  },
  secret: process.env.NEXTAUTH_SECRET
});
