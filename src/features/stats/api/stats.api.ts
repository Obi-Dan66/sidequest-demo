import { http } from '@/services/api';
import { type PublicStatsDto } from '@/types';

/** Planned — see FEATURES.md §11. */
export const statsApi = {
  publicStats(): Promise<PublicStatsDto> {
    return http.get<PublicStatsDto>('/stats/public');
  },
};
