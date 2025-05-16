// lib/api/axios-server.ts
import axios from 'axios';
import { envConfig } from './config';
import { auth } from '@/auth';

export const getServerAxios = async () => {
  const session = await auth();
  const token = session?.user?.token;

  return axios.create({
    baseURL: envConfig.NEXT_PUBLIC_DATABASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  });
};
