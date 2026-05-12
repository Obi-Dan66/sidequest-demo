import { type Achievement } from '@/types/achievement';

export const mockAchievements: Achievement[] = [
  {
    id: 'first-quest',
    title: 'First Step',
    description: 'Complete your very first quest.',
    rarity: 'common',
    unlockedAt: '2026-02-04T12:30:00Z',
  },
  {
    id: 'old-town-explorer',
    title: 'Old Town Explorer',
    description: 'Complete three history quests in Staré Město.',
    rarity: 'common',
    unlockedAt: '2026-03-22T16:00:00Z',
  },
  {
    id: 'view-collector',
    title: 'Skyline Collector',
    description: 'Reach 5 different viewpoints in Prague.',
    rarity: 'rare',
    progress: { current: 3, target: 5 },
  },
  {
    id: 'coffee-snob',
    title: 'Coffee Snob',
    description: 'Visit 10 specialty cafés.',
    rarity: 'rare',
    progress: { current: 7, target: 10 },
  },
  {
    id: 'midnight-walker',
    title: 'Midnight Walker',
    description: 'Complete a quest between 23:00 and 03:00.',
    rarity: 'epic',
  },
  {
    id: 'architecture-buff',
    title: 'Architecture Buff',
    description: 'Complete 5 culture & architecture quests.',
    rarity: 'epic',
    progress: { current: 2, target: 5 },
  },
  {
    id: 'streaker',
    title: 'On Fire',
    description: 'Quest 7 days in a row.',
    rarity: 'rare',
    progress: { current: 6, target: 7 },
  },
  {
    id: 'prague-legend',
    title: 'Prague Legend',
    description: 'Complete every quest in Prague.',
    rarity: 'legendary',
    progress: { current: 1, target: 42 },
  },
];
