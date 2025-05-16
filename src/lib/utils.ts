import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

// ----------------------------------------------------------------------

export const hasParams = (url: string): boolean => {
  const queryString = url.split('?')[1];
  return queryString
    ? new URLSearchParams(queryString).toString().length > 0
    : false;
};

// ----------------------------------------------------------------------

export function removeLastSlash(pathname: string): string {
  /**
   * Remove last slash
   * [1]
   * @input  = '/dashboard/calendar/'
   * @output = '/dashboard/calendar'
   * [2]
   * @input  = '/dashboard/calendar'
   * @output = '/dashboard/calendar'
   */
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

// ----------------------------------------------------------------------

export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);

    return removeLastSlash(urlObj.pathname);
  } catch (error) {
    return url;
  }
}

// ----------------------------------------------------------------------

export function isExternalLink(url: string): boolean {
  return url.startsWith('http');
}

// ----------------------------------------------------------------------

type TokenStatus = {
  isExpired: boolean;
  timeRemaining?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
};

export function getTokenStatus(exp: number): TokenStatus {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds since Unix epoch
  const timeDiff = exp - now;

  if (timeDiff <= 0) {
    // Token is expired
    return {
      isExpired: true
    };
  }

  // Calculate remaining time
  const seconds = timeDiff % 60;
  const minutes = Math.floor(timeDiff / 60) % 60;
  const hours = Math.floor(timeDiff / (60 * 60)) % 24;
  const days = Math.floor(timeDiff / (60 * 60 * 24));

  return {
    isExpired: false,
    timeRemaining: {
      days,
      hours,
      minutes,
      seconds
    }
  };
}

// ----------------------------------------------------------------------

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
