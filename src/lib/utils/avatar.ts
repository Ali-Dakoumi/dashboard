import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Function to generate a deterministic color from a string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// Function to generate a gradient background for avatar
export function generateAvatarGradient(name: string) {
  const color1 = stringToColor(name);
  const color2 = stringToColor(name.split('').reverse().join(''));

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

// Function to get initials from a name
export function getInitials(name: string) {
  if (!name) return 'U';

  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Function to get avatar URL (if using Vercel's avatar service)
export function getAvatarUrl(identifier: string) {
  // You can uncomment this if you want to use Vercel's avatar service
  // return `https://avatar.vercel.sh/${encodeURIComponent(identifier)}`;

  // For now, return null to use our gradient fallback
  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
