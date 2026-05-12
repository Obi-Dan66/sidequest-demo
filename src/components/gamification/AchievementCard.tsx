import { Trophy, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { type Achievement, type AchievementRarity } from '@/types/achievement';

const rarityToBadgeVariant: Record<AchievementRarity, 'common' | 'rare' | 'epic' | 'legendary'> = {
  common: 'common',
  rare: 'rare',
  epic: 'epic',
  legendary: 'legendary',
};

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

export const AchievementCard = ({ achievement, className }: AchievementCardProps) => {
  const unlocked = Boolean(achievement.unlockedAt);
  const progress =
    achievement.progress && achievement.progress.target > 0
      ? Math.min(100, (achievement.progress.current / achievement.progress.target) * 100)
      : unlocked
        ? 100
        : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className={cn(!unlocked && 'opacity-70', className)}>
        <CardContent className="flex items-start gap-3 p-4">
          <div
            className={cn(
              'grid size-12 shrink-0 place-items-center rounded-xl',
              unlocked
                ? 'gradient-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {unlocked ? <Trophy className="size-5" /> : <Lock className="size-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="truncate font-display text-sm font-semibold">{achievement.title}</h4>
              <Badge variant={rarityToBadgeVariant[achievement.rarity]} className="capitalize">
                {achievement.rarity}
              </Badge>
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {achievement.description}
            </p>
            {achievement.progress && !unlocked && (
              <div className="mt-2">
                <Progress value={progress} className="h-1.5" />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {achievement.progress.current} / {achievement.progress.target}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
