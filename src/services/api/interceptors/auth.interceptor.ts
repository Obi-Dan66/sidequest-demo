import {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { useAuthStore } from '@/store/auth.store';

const REFRESH_URL = '/auth/refresh';

interface RefreshTokenResponseEnvelope {
  data: { accessToken: string; refreshToken?: string };
}

const isRefreshUrl = (url: string): boolean => url.includes(REFRESH_URL);

export const attachAuthHeader = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = useAuthStore.getState().session?.accessToken;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

type WaiterFn = (token: string | null) => void;

/**
 * Install a response interceptor that, on the FIRST 401 from a non-refresh
 * request, calls `/auth/refresh` exactly once, then retries that request
 * with the new access token. Any other 401s arriving while the refresh is
 * in flight are queued and resolved with the same new token (or fail
 * together if refresh fails).
 *
 * On refresh failure: clears the auth session so the app drops back to the
 * signed-out state.
 */
export const installRefreshTokenInterceptor = (client: AxiosInstance): void => {
  let isRefreshing = false;
  let waiters: WaiterFn[] = [];

  const drain = (token: string | null): void => {
    const pending = waiters;
    waiters = [];
    for (const waiter of pending) waiter(token);
  };

  const enqueue = (): Promise<string | null> =>
    new Promise((resolve) => {
      waiters.push(resolve);
    });

  const callRefresh = async (): Promise<string | null> => {
    const store = useAuthStore.getState();
    const refreshToken = store.session?.refreshToken;
    if (!refreshToken) return null;

    try {
      const response = await client.post<RefreshTokenResponseEnvelope>(
        REFRESH_URL,
        { refreshToken },
        { headers: { Authorization: '' } },
      );
      const newAccess = response.data?.data?.accessToken;
      const newRefresh = response.data?.data?.refreshToken;
      if (!newAccess) return null;

      const next = store.session
        ? {
            ...store.session,
            accessToken: newAccess,
            refreshToken: newRefresh ?? store.session.refreshToken,
          }
        : { accessToken: newAccess, refreshToken: newRefresh };
      store.setSession(next);
      return newAccess;
    } catch {
      return null;
    }
  };

  client.interceptors.response.use(
    (response) => response,
    async (error: unknown): Promise<AxiosResponse> => {
      if (!isAxiosError(error) || !error.response || !error.config) throw error;

      const status = error.response.status;
      const original: RetryableConfig = error.config;
      const url = original.url ?? '';

      if (status !== 401 || original._retried || isRefreshUrl(url)) {
        throw error;
      }

      original._retried = true;

      if (isRefreshing) {
        const token = await enqueue();
        if (!token) throw error;
        original.headers.set('Authorization', `Bearer ${token}`);
        return client.request(original);
      }

      isRefreshing = true;
      const newToken = await callRefresh();
      isRefreshing = false;
      drain(newToken);

      if (!newToken) {
        useAuthStore.getState().clear();
        throw error;
      }

      original.headers.set('Authorization', `Bearer ${newToken}`);
      return client.request(original);
    },
  );
};
