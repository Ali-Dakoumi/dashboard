// lib/api/axios-client.ts
'use client';

import axios from 'axios';
import { getSession } from 'next-auth/react';
import { envConfig } from './config';

const axiosClient = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_DATABASE_URL
});

let interceptorInitialized = false;

async function setupInterceptor() {
  if (interceptorInitialized) return;

  axiosClient.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = session?.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  interceptorInitialized = true;
}

// Immediately set up the interceptor
setupInterceptor();

export default axiosClient;
