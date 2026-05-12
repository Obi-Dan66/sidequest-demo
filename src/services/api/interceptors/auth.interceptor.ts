import { type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth.store';

/**
 * Auth-ready request interceptor.
 *
 * Today: attaches `Authorization: Bearer <token>` from the auth store when present.
 * Tomorrow: swap or extend with refresh-token flow / silent re-auth without
 * touching the client wiring.
 */
export const attachAuthHeader = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = useAuthStore.getState().session?.accessToken;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

/**
 * Reaction to 401 responses. Kept tiny on purpose — the full refresh flow
 * (queue requests, attempt /auth/refresh, retry) will live here later.
 */
export const handleUnauthorized = (status: number): void => {
  if (status === 401) {
    useAuthStore.getState().clear();
  }
};
