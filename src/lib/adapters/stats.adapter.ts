import { type UserStatsDto } from '@/types/dto';
import { type UserStats } from '@/types/stats';

export const toUserStats = (dto: UserStatsDto): UserStats => ({
  questsCompleted: dto.questsDone,
  currentStreakDays: dto.streakDays,
  placesVisited: dto.placesVisited,
  distanceWalkedKm: dto.distanceWalkedKm,
  achievementsUnlocked: dto.achievementsUnlocked,
  longestStreakDays: dto.longestStreakDays,
  xpToNextLevel: dto.xpToNextLevel,
});
