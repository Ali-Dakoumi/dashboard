import { AxiosError } from 'axios';

/**
 * Extract a user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}

/**
 * Format API errors for display
 */
export function formatApiError(error: unknown): {
  message: string;
  status?: number;
  details?: string[];
} {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      details: error.response?.data?.details
    };
  }

  return {
    message:
      error instanceof Error ? error.message : 'An unknown error occurred'
  };
}
