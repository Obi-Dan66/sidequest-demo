import { http } from '@/services/api';
import { type PaginatedResponse, type QuestHistoryItemDto, type UserQuestStatus } from '@/types';

export interface QuestHistoryQuery {
  page?: number;
  limit?: number;
  status?: UserQuestStatus;
}

/** Planned — see FEATURES.md §2. */
export const questHistoryApi = {
  myHistory(query: QuestHistoryQuery = {}): Promise<PaginatedResponse<QuestHistoryItemDto>> {
    return http.getPaginated<QuestHistoryItemDto>('/users/me/quests/history', { params: query });
  },

  userHistory(
    userId: string,
    query: QuestHistoryQuery = {},
  ): Promise<PaginatedResponse<QuestHistoryItemDto>> {
    return http.getPaginated<QuestHistoryItemDto>(`/users/${userId}/quests/history`, {
      params: query,
    });
  },
};
