import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  questsApi,
  type QuestListQuery,
  type QuestNearbyQuery,
} from '@/features/quests/api/quests.api';
import { queryKeys } from '@/lib/queryClient';
import { toQuest } from '@/lib/adapters';
import { type Quest } from '@/types/quest';
import { type ApiError } from '@/services/api/errors';
import { type PaginationMeta } from '@/types/api';

export interface UseQuestsResult {
  quests: Quest[];
  pagination?: PaginationMeta;
}

export const useQuests = (query: QuestListQuery = {}) =>
  useQuery<UseQuestsResult, ApiError>({
    queryKey: queryKeys.quests.list(query),
    queryFn: async () => {
      const { data, pagination } = await questsApi.list(query);
      return { quests: data.map(toQuest), pagination };
    },
  });

export const useQuest = (id: string | undefined) =>
  useQuery<Quest, ApiError>({
    queryKey: queryKeys.quests.detail(id ?? ''),
    queryFn: async () => toQuest(await questsApi.getById(id ?? '')),
    enabled: Boolean(id),
  });

export const useNearbyQuests = (query: QuestNearbyQuery = {}) =>
  useQuery<Quest[], ApiError>({
    queryKey: queryKeys.quests.nearby(query),
    queryFn: async () => (await questsApi.listNearby(query)).map(toQuest),
  });

export const useStartQuest = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => questsApi.start(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quests.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.quests.all });
    },
  });
};

export const useCompleteQuest = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => questsApi.complete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quests.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.quests.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.myStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.achievements.mine });
    },
  });
};
