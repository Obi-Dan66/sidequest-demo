import { useQuery } from '@tanstack/react-query';
import { mockQuestsService, type QuestListFilters } from '@/services/mock/quests.service';
import { queryKeys } from '@/lib/queryClient';

export const useMockQuests = (filters: QuestListFilters = {}) => {
  return useQuery({
    queryKey: queryKeys.quests.list(filters),
    queryFn: () => mockQuestsService.list(filters),
  });
};

export const useMockQuest = (id: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.quests.detail(id ?? ''),
    queryFn: () => mockQuestsService.detail(id ?? ''),
    enabled: Boolean(id),
  });
};

export const useMockNearbyQuests = () => {
  return useQuery({
    queryKey: ['quests', 'nearby'],
    queryFn: () => mockQuestsService.nearby(),
  });
};
