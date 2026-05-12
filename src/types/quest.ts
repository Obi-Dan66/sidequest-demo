import { type GeoPoint, type Place } from '@/types/place';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';

export type QuestStatus = 'available' | 'in_progress' | 'completed' | 'locked';

export interface QuestReward {
  xp: number;
  achievementIds?: string[];
}

export interface QuestStep {
  id: string;
  title: string;
  description?: string;
  target?: GeoPoint;
  place?: Place;
  isCompleted: boolean;
}

export interface Quest {
  id: string;
  title: string;
  summary: string;
  description?: string;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  estimatedMinutes: number;
  coverImageUrl?: string;
  startLocation: GeoPoint;
  steps: QuestStep[];
  reward: QuestReward;
  tags: string[];
}
