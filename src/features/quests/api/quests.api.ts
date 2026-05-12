import { api } from '@/services/api/client';
import { type Quest } from '@/types/quest';
import { type Paginated } from '@/types/api';

export interface QuestFilters {
  difficulty?: Quest['difficulty'];
  status?: Quest['status'];
  page?: number;
  pageSize?: number;
}

export const questsApi = {
  async list(filters: QuestFilters = {}): Promise<Paginated<Quest>> {
    const response = await api.get<Paginated<Quest>>('/quests', { params: filters });
    return response.data;
  },

  async detail(id: string): Promise<Quest> {
    const response = await api.get<Quest>(`/quests/${id}`);
    return response.data;
  },

  async start(id: string): Promise<Quest> {
    const response = await api.post<Quest>(`/quests/${id}/start`);
    return response.data;
  },

  async completeStep(questId: string, stepId: string): Promise<Quest> {
    const response = await api.post<Quest>(`/quests/${questId}/steps/${stepId}/complete`);
    return response.data;
  },
};
