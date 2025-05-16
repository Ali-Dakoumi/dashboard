'use client';

import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { envConfig } from './config';

const axiosClient = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_DATABASE_URL
});

let interceptorInitialized = false;
let isLoggingOut = false;

async function setupInterceptor() {
  if (interceptorInitialized) return;

  // Request interceptor - adds auth token
  axiosClient.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = session?.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Response interceptor - handles 401 errors
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Check if error is 401 and we're not already logging out
      if (error.response?.status === 401 && !isLoggingOut) {
        isLoggingOut = true;
        console.log('Session expired - logging out user');

        try {
          // Sign out the user and redirect to login
          await signOut({
            redirect: true,
            callbackUrl: '/'
          });
        } catch (logoutError) {
          console.error('Error during logout:', logoutError);
          // Reset flag in case of error
          isLoggingOut = false;

          // Force redirect as fallback
          window.location.href = '/';
        }
      }

      return Promise.reject(error);
    }
  );

  interceptorInitialized = true;
}

// Immediately set up the interceptor
setupInterceptor();

export default axiosClient;
