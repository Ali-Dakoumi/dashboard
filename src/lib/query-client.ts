import { QueryClient } from '@tanstack/react-query';

// Singleton instance
let queryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
          retry: 1
        }
      }
    });
  }
  return queryClient;
}
