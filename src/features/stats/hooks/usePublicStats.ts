import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/features/stats/api/stats.api';
import { queryKeys } from '@/lib/queryClient';
import { type ApiError } from '@/services/api/errors';
import { type PublicStatsDto } from '@/types';

export const usePublicStats = () =>
  useQuery<PublicStatsDto, ApiError>({
    queryKey: queryKeys.stats.public,
    queryFn: () => statsApi.publicStats(),
    staleTime: 5 * 60_000,
    retry: false,
  });
