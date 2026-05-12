export interface BusinessMetric {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface BusinessQuestRow {
  id: string;
  title: string;
  visits: number;
  conversion: number;
  rating: number;
}

export const mockBusinessMetrics: BusinessMetric[] = [
  { label: 'Monthly visits', value: '12,480', delta: '+18%', trend: 'up' },
  { label: 'Quest completions', value: '3,920', delta: '+9%', trend: 'up' },
  { label: 'Avg. rating', value: '4.7 / 5', delta: '+0.2', trend: 'up' },
  { label: 'Repeat visitors', value: '34%', delta: '-1%', trend: 'down' },
];

export const mockBusinessQuests: BusinessQuestRow[] = [
  { id: 'q1', title: 'Café Crawl: Vinohrady', visits: 4_310, conversion: 0.62, rating: 4.6 },
  { id: 'q2', title: 'Speakeasy Hunt', visits: 2_980, conversion: 0.48, rating: 4.8 },
  { id: 'q3', title: 'Old Town Secrets', visits: 2_650, conversion: 0.71, rating: 4.7 },
  { id: 'q4', title: 'Castle After Dark', visits: 580, conversion: 0.38, rating: 5.0 },
];

export const businessBenefits = [
  {
    title: 'Foot traffic that loves to explore',
    description:
      'SideQuest players walk through your door already in adventure mode — and tell their friends about it.',
  },
  {
    title: 'Reward redemption, built in',
    description:
      'Hand out XP boosts, badges, or real-world perks when quests bring players to your place.',
  },
  {
    title: 'Real analytics, no spreadsheets',
    description:
      'See visits, completions, ratings and repeat customers in a dashboard that actually makes sense.',
  },
];
