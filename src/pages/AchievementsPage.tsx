import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AchievementCard } from '@/components/gamification/AchievementCard';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { useMyAchievements } from '@/features/achievements/hooks/useAchievements';
import { useAuth } from '@/hooks/useAuth';
import { useAchievements } from '@/features/achievements/hooks/useAchievements';

const AchievementsPage = () => {
  const { isAuthenticated } = useAuth();
  const mine = useMyAchievements(isAuthenticated);
  const all = useAchievements(!isAuthenticated);
  const achievements = isAuthenticated ? (mine.data ?? []) : (all.data ?? []);
  const isLoading = isAuthenticated ? mine.isLoading : all.isLoading;

  const unlocked = achievements.filter((a) => a.unlockedAt);
  const inProgress = achievements.filter((a) => !a.unlockedAt && a.progress);
  const locked = achievements.filter((a) => !a.unlockedAt && !a.progress);

  return (
    <div className="flex flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold tracking-tight">Achievements</h1>
        <p className="text-sm text-muted-foreground">Trophies you have earned and ones to chase.</p>
      </motion.div>

      <Card>
        <CardContent className="space-y-4 p-5">
          <SectionHeader
            title="Showcase"
            subtitle={`${unlocked.length} trophy${unlocked.length === 1 ? '' : 'ies'} unlocked`}
          />
          {isLoading ? (
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="size-16 rounded-full" />
              ))}
            </div>
          ) : unlocked.length === 0 ? (
            <EmptyState
              title="No achievements yet"
              description="Complete your first quest to unlock your first trophy."
            />
          ) : (
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
              {unlocked.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <AchievementBadge achievement={achievement} size="lg" />
                  <span className="line-clamp-2 text-[11px] font-medium text-muted-foreground">
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {inProgress.length > 0 && (
        <section className="space-y-3">
          <SectionHeader title="In progress" subtitle="So close." />
          <div className="grid gap-3 md:grid-cols-2">
            {inProgress.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </section>
      )}

      {locked.length > 0 && (
        <section className="space-y-3">
          <SectionHeader title="Locked" subtitle="Mystery trophies waiting." />
          <div className="grid gap-3 md:grid-cols-2">
            {locked.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AchievementsPage;
