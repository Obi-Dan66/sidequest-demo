import { type UserStatsDto } from '@/types/dto';
import { type UserStats } from '@/types/stats';

export const toUserStats = (dto: UserStatsDto): UserStats => ({
  questsCompleted: dto.questsDone,
  placesVisited: dto.placesVisited ?? 0,
  distanceWalkedKm: dto.distanceWalkedKm ?? 0,
  achievementsUnlocked: dto.achievementsUnlocked ?? 0,
  longestStreakDays: dto.longestStreakDays ?? dto.streakDays,
  currentStreakDays: dto.streakDays,
  xpToNextLevel: dto.xpToNextLevel,
});
