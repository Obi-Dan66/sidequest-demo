import { http } from '@/services/api';
import {
  type LeaderboardPeriod,
  type LeaderboardResponseDto,
  type LeaderboardScope,
} from '@/types';

export interface LeaderboardQuery {
  scope?: LeaderboardScope;
  city?: string;
  period?: LeaderboardPeriod;
  limit?: number;
}

/** Planned — see FEATURES.md §10. */
export const leaderboardApi = {
  fetch(query: LeaderboardQuery = {}): Promise<LeaderboardResponseDto> {
    return http.get<LeaderboardResponseDto>('/leaderboard', { params: query });
  },
};
