import { useQuery } from '@tanstack/react-query';
import { questHistoryApi, type QuestHistoryQuery } from '@/features/users/api/quest-history.api';
import { queryKeys } from '@/lib/queryClient';
import { type ApiError } from '@/services/api/errors';
import { type PaginationMeta, type PaginatedResponse, type QuestHistoryItemDto } from '@/types';

export interface UseQuestHistoryResult {
  items: QuestHistoryItemDto[];
  pagination: PaginationMeta;
}

const toResult = (page: PaginatedResponse<QuestHistoryItemDto>): UseQuestHistoryResult => ({
  items: page.data,
  pagination: page.pagination,
});

export const useMyQuestHistory = (query: QuestHistoryQuery = { limit: 10 }) =>
  useQuery<UseQuestHistoryResult, ApiError>({
    queryKey: queryKeys.users.myHistory(query),
    queryFn: async () => toResult(await questHistoryApi.myHistory(query)),
    retry: false,
  });

export const useUserQuestHistory = (
  userId: string | undefined,
  query: QuestHistoryQuery = { limit: 10 },
) =>
  useQuery<UseQuestHistoryResult, ApiError>({
    queryKey: queryKeys.users.history(userId ?? '', query),
    queryFn: async () => toResult(await questHistoryApi.userHistory(userId ?? '', query)),
    enabled: Boolean(userId),
    retry: false,
  });
