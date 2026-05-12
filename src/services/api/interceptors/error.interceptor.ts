import { type ApiError, normalizeAxiosError } from '@/services/api/errors';

export const normalizeError = (error: unknown): Promise<never> => {
  const normalized: ApiError = normalizeAxiosError(error);
  return Promise.reject(normalized);
};
