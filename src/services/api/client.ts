import axios, { type AxiosInstance } from 'axios';
import { env } from '@/config/env';
import { attachAuthHeader } from '@/services/api/interceptors/auth.interceptor';
import { normalizeError } from '@/services/api/interceptors/error.interceptor';

export interface ApiClientOptions {
  baseURL?: string;
  timeoutMs?: number;
  withCredentials?: boolean;
}

/**
 * Creates an Axios instance pre-wired with:
 *  - baseURL pulled from env (single switch for local/staging/prod)
 *  - JSON headers
 *  - withCredentials (cookies) controlled by env
 *  - request interceptor that attaches the bearer token if available
 *  - response interceptor that normalizes errors into `ApiError`
 *    and reacts to 401 by clearing the auth session
 */
export const createApiClient = (options: ApiClientOptions = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: options.baseURL ?? env.api.baseUrl,
    timeout: options.timeoutMs ?? env.api.timeoutMs,
    withCredentials: options.withCredentials ?? env.api.withCredentials,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(attachAuthHeader);
  instance.interceptors.response.use((response) => response, normalizeError);

  return instance;
};

export const api = createApiClient();
