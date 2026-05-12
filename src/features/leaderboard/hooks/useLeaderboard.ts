import { useQuery } from '@tanstack/react-query';
import { leaderboardApi, type LeaderboardQuery } from '@/features/leaderboard/api/leaderboard.api';
import { queryKeys } from '@/lib/queryClient';
import { type ApiError } from '@/services/api/errors';
import { type LeaderboardResponseDto } from '@/types';

export const useLeaderboard = (query: LeaderboardQuery = {}) =>
  useQuery<LeaderboardResponseDto, ApiError>({
    queryKey: queryKeys.leaderboard.list(query),
    queryFn: () => leaderboardApi.fetch(query),
    retry: false,
  });
