import { type AchievementDto } from '@/types/dto';
import { type Achievement, type AchievementRarity } from '@/types/achievement';

/** Derive UI rarity buckets from backend xpBonus thresholds. */
const rarityForXp = (xp: number): AchievementRarity => {
  if (xp >= 500) return 'legendary';
  if (xp >= 250) return 'epic';
  if (xp >= 100) return 'rare';
  return 'common';
};

export const toAchievement = (dto: AchievementDto): Achievement => ({
  id: dto.id,
  title: dto.name,
  description: dto.description,
  rarity: rarityForXp(dto.xpBonus),
  iconKey: dto.iconUrl ?? undefined,
  unlockedAt: dto.unlockedAt ?? undefined,
  progress: dto.progress ?? undefined,
});
