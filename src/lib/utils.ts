import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

export const xpProgress = (xp: number, xpToNextLevel: number) => {
  if (xpToNextLevel <= 0) return 0;
  return Math.min(100, Math.max(0, (xp / xpToNextLevel) * 100));
};

export const formatDistanceMeters = (meters: number) => {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
};
