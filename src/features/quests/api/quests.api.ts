import { http } from '@/services/api';
import {
  type CreateQuestDto,
  type QuestDifficultyDto,
  type QuestDto,
  type QuestStatusDto,
  type UpdateQuestDto,
} from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';

export interface QuestListQuery extends ListQuery {
  status?: QuestStatusDto;
  difficulty?: QuestDifficultyDto;
  categorySlug?: string;
}

export interface QuestNearbyQuery {
  lat?: number;
  lng?: number;
  radiusM?: number;
  difficulty?: QuestDifficultyDto;
  categorySlug?: string;
}

export const questsApi = {
  list(query: QuestListQuery = {}): Promise<PaginatedResponse<QuestDto>> {
    return http.getPaginated<QuestDto>('/quests', { params: query });
  },

  listNearby(query: QuestNearbyQuery = {}): Promise<QuestDto[]> {
    return http.get<QuestDto[]>('/quests/nearby', { params: query });
  },

  getById(id: string): Promise<QuestDto> {
    return http.get<QuestDto>(`/quests/${id}`);
  },

  create(payload: CreateQuestDto): Promise<QuestDto> {
    return http.post<QuestDto, CreateQuestDto>('/quests', payload);
  },

  update(id: string, payload: UpdateQuestDto): Promise<QuestDto> {
    return http.patch<QuestDto, UpdateQuestDto>(`/quests/${id}`, payload);
  },

  remove(id: string): Promise<void> {
    return http.deleteVoid(`/quests/${id}`);
  },

  start(id: string): Promise<void> {
    return http.postVoid(`/quests/${id}/start`);
  },

  complete(id: string): Promise<void> {
    return http.postVoid(`/quests/${id}/complete`);
  },
};
