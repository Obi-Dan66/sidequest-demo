import { useQuery } from '@tanstack/react-query';
import { questsApi, type QuestFilters } from '@/features/quests/api/quests.api';
import { queryKeys } from '@/lib/queryClient';

export const useQuests = (filters: QuestFilters = {}) => {
  return useQuery({
    queryKey: queryKeys.quests.list(filters),
    queryFn: () => questsApi.list(filters),
  });
};

export const useQuest = (id: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.quests.detail(id ?? ''),
    queryFn: () => questsApi.detail(id ?? ''),
    enabled: Boolean(id),
  });
};
