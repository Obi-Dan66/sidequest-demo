import { Trophy, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Achievement, type AchievementRarity } from '@/types/achievement';

const rarityToRing: Record<AchievementRarity, string> = {
  common: 'ring-[hsl(var(--common))]/60',
  rare: 'ring-[hsl(var(--rare))]/60',
  epic: 'ring-[hsl(var(--epic))]/70',
  legendary: 'ring-[hsl(var(--legendary))]/80',
};

const rarityToGlow: Record<AchievementRarity, string> = {
  common: 'from-[hsl(var(--common))]/30 to-transparent',
  rare: 'from-[hsl(var(--rare))]/40 to-transparent',
  epic: 'from-[hsl(var(--epic))]/50 to-transparent',
  legendary: 'from-[hsl(var(--legendary))]/60 to-transparent',
};

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClass: Record<NonNullable<AchievementBadgeProps['size']>, string> = {
  sm: 'size-12',
  md: 'size-16',
  lg: 'size-20',
};

export const AchievementBadge = ({
  achievement,
  size = 'md',
  className,
}: AchievementBadgeProps) => {
  const unlocked = Boolean(achievement.unlockedAt);

  return (
    <motion.div
      title={`${achievement.title} — ${achievement.description}`}
      whileHover={{ scale: 1.06, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn('relative inline-flex items-center justify-center', sizeClass[size], className)}
    >
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-br opacity-80 blur-md',
          rarityToGlow[achievement.rarity],
          !unlocked && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'relative grid h-full w-full place-items-center rounded-full ring-2 transition-all',
          unlocked
            ? cn(
                'bg-gradient-to-br from-primary to-secondary text-primary-foreground',
                rarityToRing[achievement.rarity],
              )
            : 'bg-muted text-muted-foreground ring-border',
        )}
      >
        {unlocked ? <Trophy className="size-1/2" /> : <Lock className="size-1/2" />}
      </span>
    </motion.div>
  );
};
