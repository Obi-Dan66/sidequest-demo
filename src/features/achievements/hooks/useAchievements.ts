import { useQuery } from '@tanstack/react-query';
import { achievementsApi } from '@/features/achievements/api/achievements.api';
import { queryKeys } from '@/lib/queryClient';
import { toAchievement } from '@/lib/adapters';
import { type Achievement } from '@/types/achievement';
import { type ApiError } from '@/services/api/errors';

export const useAchievements = () =>
  useQuery<Achievement[], ApiError>({
    queryKey: queryKeys.achievements.all,
    queryFn: async () => (await achievementsApi.listAll()).map(toAchievement),
  });

export const useMyAchievements = () =>
  useQuery<Achievement[], ApiError>({
    queryKey: queryKeys.achievements.mine,
    queryFn: async () => (await achievementsApi.listMine()).map(toAchievement),
  });
