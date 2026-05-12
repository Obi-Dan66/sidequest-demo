import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { useAuthStore } from '@/store/auth.store';
import { type ApiError, normalizeAxiosError } from '@/services/api/errors';

const attachAuth = (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().session?.accessToken;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

const handleUnauthorized = (status: number) => {
  if (status === 401) {
    useAuthStore.getState().clear();
  }
};

export const createApiClient = (baseURL: string = env.api.baseUrl): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: env.api.timeoutMs,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(attachAuth);

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const normalized: ApiError = normalizeAxiosError(error);
      handleUnauthorized(normalized.status);
      return Promise.reject(normalized);
    },
  );

  return instance;
};

export const api = createApiClient();
