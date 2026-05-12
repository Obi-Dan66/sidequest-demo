import { http } from '@/services/api';
import { type AchievementDto } from '@/types/dto';

export const achievementsApi = {
  listAll(): Promise<AchievementDto[]> {
    return http.get<AchievementDto[]>('/achievements');
  },

  listMine(): Promise<AchievementDto[]> {
    return http.get<AchievementDto[]>('/achievements/me');
  },
};
