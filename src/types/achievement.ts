export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: AchievementRarity;
  iconKey?: string;
  unlockedAt?: string;
  progress?: {
    current: number;
    target: number;
  };
}
