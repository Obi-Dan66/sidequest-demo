import { AchievementCard } from '@/components/gamification/AchievementCard';
import { type Achievement } from '@/types/achievement';

const mockAchievements: Achievement[] = [
  {
    id: 'first-quest',
    title: 'First Step',
    description: 'Complete your very first quest.',
    rarity: 'common',
    unlockedAt: new Date().toISOString(),
  },
  {
    id: 'view-collector',
    title: 'Skyline Collector',
    description: 'Reach 5 different viewpoints in Prague.',
    rarity: 'rare',
    progress: { current: 2, target: 5 },
  },
  {
    id: 'midnight-walker',
    title: 'Midnight Walker',
    description: 'Complete a quest between 23:00 and 03:00.',
    rarity: 'epic',
  },
  {
    id: 'prague-legend',
    title: 'Prague Legend',
    description: 'Complete every quest in Prague.',
    rarity: 'legendary',
    progress: { current: 1, target: 42 },
  },
];

const AchievementsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Achievements</h1>
        <p className="text-sm text-muted-foreground">Trophies you have earned and ones to chase.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {mockAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
