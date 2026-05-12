import { useQuery } from '@tanstack/react-query';
import { healthApi, type HealthResponse } from '@/features/health/api/health.api';
import { queryKeys } from '@/lib/queryClient';

export interface UseHealthOptions {
  /** Poll the backend at this interval (ms). Defaults to 30s. Set `false` to disable polling. */
  refetchIntervalMs?: number | false;
  /** Disable the query entirely. */
  enabled?: boolean;
}

const DEFAULT_REFETCH_MS = 30_000;

/**
 * TanStack Query hook around `GET /health`.
 *
 * Returns a derived `isOnline` flag so consumers don't have to inspect both
 * `isError` and `data.status` themselves.
 */
export const useHealth = (options: UseHealthOptions = {}) => {
  const refetchInterval = options.refetchIntervalMs ?? DEFAULT_REFETCH_MS;

  const query = useQuery<HealthResponse>({
    queryKey: queryKeys.health.check,
    queryFn: ({ signal }) => healthApi.check(signal),
    enabled: options.enabled ?? true,
    refetchInterval,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 0,
    gcTime: 60_000,
  });

  const isOnline = query.isSuccess && query.data.status === 'ok';

  return {
    ...query,
    isOnline,
  };
};
