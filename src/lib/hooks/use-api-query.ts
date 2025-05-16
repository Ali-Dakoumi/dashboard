// lib/hooks/use-api-query.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosClient from '../client-axios';

export const useApiQuery = <T = unknown>(
  key: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const res = await axiosClient.get(endpoint);
      return res.data;
    },
    ...options
  });
};
