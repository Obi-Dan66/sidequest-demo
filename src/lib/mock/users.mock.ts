import { type User } from '@/types/user';
import { type UserStats, type QuestHistoryItem } from '@/types/stats';

export const mockCurrentUser: User = {
  id: 'me',
  username: 'praguenaut',
  email: 'praguenaut@sidequest.app',
  avatarUrl: '',
  level: 12,
  xp: 4280,
  xpToNextLevel: 6000,
  title: 'Cobblestone Wanderer',
  joinedAt: '2026-01-20T10:00:00Z',
};

export const mockUserStats: UserStats = {
  questsCompleted: 28,
  placesVisited: 64,
  distanceWalkedKm: 84.2,
  achievementsUnlocked: 9,
  longestStreakDays: 14,
  currentStreakDays: 6,
};

export const mockQuestHistory: QuestHistoryItem[] = [
  {
    id: 'h1',
    questId: 'old-town-secrets',
    questTitle: 'Old Town Secrets',
    completedAt: '2026-05-10T18:22:00Z',
    xpEarned: 250,
    durationMinutes: 51,
  },
  {
    id: 'h2',
    questId: 'cafe-crawl',
    questTitle: 'Vinohrady Café Crawl',
    completedAt: '2026-05-07T11:00:00Z',
    xpEarned: 380,
    durationMinutes: 92,
  },
  {
    id: 'h3',
    questId: 'hidden-gardens',
    questTitle: 'Hidden Gardens of Malá Strana',
    completedAt: '2026-05-04T09:15:00Z',
    xpEarned: 280,
    durationMinutes: 48,
  },
  {
    id: 'h4',
    questId: 'letna-skyline',
    questTitle: 'Letná Skyline',
    completedAt: '2026-04-28T19:40:00Z',
    xpEarned: 500,
    durationMinutes: 78,
  },
];
