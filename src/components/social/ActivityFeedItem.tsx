import { motion } from 'framer-motion';
import { Award, MapPin, Sparkles, Swords, Zap, type LucideIcon } from 'lucide-react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import { type ActivityItem, type ActivityKind } from '@/types/social';

const kindIcon: Record<ActivityKind, LucideIcon> = {
  completed_quest: Swords,
  unlocked_achievement: Award,
  leveled_up: Sparkles,
  started_quest: Zap,
  visited_place: MapPin,
};

const kindAccent: Record<ActivityKind, string> = {
  completed_quest: 'from-primary/30 to-secondary/30 text-primary',
  unlocked_achievement: 'from-amber-500/30 to-rose-500/20 text-amber-500',
  leveled_up: 'from-fuchsia-500/30 to-sky-500/20 text-fuchsia-400',
  started_quest: 'from-emerald-500/30 to-sky-500/20 text-emerald-400',
  visited_place: 'from-sky-500/30 to-cyan-500/20 text-sky-400',
};

const relativeTime = (iso: string) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86_400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86_400)}d ago`;
};

interface ActivityFeedItemProps {
  item: ActivityItem;
  index?: number;
}

export const ActivityFeedItem = ({ item, index = 0 }: ActivityFeedItemProps) => {
  const Icon = kindIcon[item.kind];

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-3 transition-colors hover:bg-accent/30"
    >
      <UserAvatar username={item.actor.username} level={item.actor.level} size="md" />
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-semibold">{item.actor.username}</span>{' '}
          <span className="text-muted-foreground">{item.title}</span>
        </p>
        {item.subtitle && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.subtitle}</p>
        )}
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full bg-gradient-to-br px-2 py-0.5 font-medium',
              kindAccent[item.kind],
            )}
          >
            <Icon className="size-3" /> {item.kind.replace('_', ' ')}
          </span>
          <span>{relativeTime(item.createdAt)}</span>
          {typeof item.xpEarned === 'number' && (
            <span className="font-semibold text-[hsl(var(--xp))]">+{item.xpEarned} XP</span>
          )}
        </div>
      </div>
    </motion.li>
  );
};
