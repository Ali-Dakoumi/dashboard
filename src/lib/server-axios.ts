import axios from 'axios';
import { redirect } from 'next/navigation';
import { envConfig } from './config';
import { auth } from '@/auth';

// Singleton axios instance
class ServerAxios {
  private static instance: ServerAxios;
  private axiosInstance;
  private redirectPath = '/';

  private constructor() {
    // Create the axios instance
    this.axiosInstance = axios.create({
      baseURL: envConfig.NEXT_PUBLIC_DATABASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Set up response interceptor for 401 errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log('Authentication failed, redirecting to login');
          redirect(this.redirectPath);
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ServerAxios {
    if (!ServerAxios.instance) {
      ServerAxios.instance = new ServerAxios();
    }
    return ServerAxios.instance;
  }

  // Update auth token before making requests
  public async setAuthToken(): Promise<void> {
    const session = await auth();
    const token = session?.user?.token;

    if (token) {
      this.axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.Authorization;
    }
  }

  // Set custom redirect path if needed
  public setRedirectPath(path: string): void {
    this.redirectPath = path;
  }

  // Get the axios instance
  public getAxios() {
    return this.axiosInstance;
  }
}

// Helper function to get the axios instance with auth token set
export async function getServerAxios(redirectPath?: string) {
  const serverAxios = ServerAxios.getInstance();

  // Set custom redirect path if provided
  if (redirectPath) {
    serverAxios.setRedirectPath(redirectPath);
  }

  // Update the auth token
  await serverAxios.setAuthToken();

  // Return the configured axios instance
  return serverAxios.getAxios();
}
