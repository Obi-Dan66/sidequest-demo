import { type ApiError, normalizeAxiosError } from '@/services/api/errors';
import { handleUnauthorized } from '@/services/api/interceptors/auth.interceptor';

export const normalizeError = (error: unknown): Promise<never> => {
  const normalized: ApiError = normalizeAxiosError(error);
  handleUnauthorized(normalized.status);
  return Promise.reject(normalized);
};
