import { type GeoPoint, type Place } from '@/types/place';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';

export type QuestStatus = 'available' | 'in_progress' | 'completed' | 'locked';

export type QuestCategory = 'exploration' | 'history' | 'food' | 'nature' | 'culture' | 'nightlife';

export interface QuestReward {
  xp: number;
  achievementIds?: string[];
  coins?: number;
}

export interface QuestStep {
  id: string;
  title: string;
  description?: string;
  target?: GeoPoint;
  place?: Place;
  isCompleted: boolean;
}

export interface QuestParticipant {
  id: string;
  username: string;
  avatarUrl?: string;
  level: number;
}

export interface Quest {
  id: string;
  title: string;
  summary: string;
  description?: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  estimatedMinutes: number;
  distanceKm: number;
  coverImageUrl?: string;
  startLocation: GeoPoint;
  steps: QuestStep[];
  reward: QuestReward;
  tags: string[];
  participants: QuestParticipant[];
  participantCount: number;
  rating?: number;
  createdAt: string;
}
