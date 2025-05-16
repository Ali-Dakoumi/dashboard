// lib/server/user.ts
'use server';

import { getServerAxios } from '../server-axios';
import { endpoints } from '../constants';

export const getUserStatus = async () => {
  try {
    const axios = await getServerAxios();
    const response = await axios.get(endpoints.user.connectedUserStatus);
    return response.data;
  } catch (error) {
    console.error('Failed to get user status:', error);
    throw error;
  }
};
