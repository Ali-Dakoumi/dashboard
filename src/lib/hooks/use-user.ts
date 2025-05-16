'use client';

import { useApiQuery } from './use-api-query';
import { endpoints } from '../constants';

export const useUser = () => {
  return useApiQuery(['user'], endpoints.user.connectedUserStatus);
};
