import { http } from '@/services/api';
import { type MapPinDto, type QuestDifficultyDto } from '@/types/dto';

export interface MapPinsQuery {
  south?: number;
  north?: number;
  west?: number;
  east?: number;
  limit?: number;
  categorySlug?: string;
  difficulty?: QuestDifficultyDto;
  /** Comma-separated list of pin kinds, e.g. "QUEST,BUSINESS". */
  kinds?: string;
}

export const mapApi = {
  getPins(query: MapPinsQuery = {}): Promise<MapPinDto[]> {
    return http.get<MapPinDto[]>('/map/pins', { params: query });
  },
};
