import { useQuery } from '@tanstack/react-query';
import { achievementsApi } from '@/features/achievements/api/achievements.api';
import { queryKeys } from '@/lib/queryClient';
import { toAchievement } from '@/lib/adapters';
import { type Achievement } from '@/types/achievement';
import { type ApiError } from '@/services/api/errors';

export const useAchievements = (enabled = true) =>
  useQuery<Achievement[], ApiError>({
    queryKey: queryKeys.achievements.all,
    queryFn: async () => (await achievementsApi.listAll()).map(toAchievement),
    enabled,
    retry: false,
  });

export const useMyAchievements = (enabled = true) =>
  useQuery<Achievement[], ApiError>({
    queryKey: queryKeys.achievements.mine,
    queryFn: async () => (await achievementsApi.listMine()).map(toAchievement),
    enabled,
    retry: false,
  });
