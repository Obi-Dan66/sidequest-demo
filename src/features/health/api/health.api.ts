import { api } from '@/services/api';

/**
 * Shape returned by a NestJS Terminus `/health` endpoint.
 * All inner fields are optional so we also accept simpler payloads
 * like `{ status: 'ok' }`.
 */
export interface HealthIndicator {
  status: 'up' | 'down';
  [key: string]: unknown;
}

export interface HealthResponse {
  status: 'ok' | 'error' | 'shutting_down';
  info?: Record<string, HealthIndicator>;
  error?: Record<string, HealthIndicator>;
  details?: Record<string, HealthIndicator>;
}

export const healthApi = {
  async check(signal?: AbortSignal): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/health', { signal });
    return response.data;
  },
};
