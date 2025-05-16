import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    email: string;
    role: string;
    status: string;
    token: string;
    id: string;
    name: string;
  }
  interface Session {
    user: User;
    expires: string;
    token: string;
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
