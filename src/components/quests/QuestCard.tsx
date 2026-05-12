import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatNumber } from '@/lib/utils';
import { questCategoryMap } from '@/lib/categories';
import { ROUTES } from '@/config/routes';
import { type Quest, type QuestDifficulty } from '@/types/quest';

const difficultyToBadge: Record<QuestDifficulty, 'success' | 'rare' | 'epic' | 'legendary'> = {
  easy: 'success',
  medium: 'rare',
  hard: 'epic',
  legendary: 'legendary',
};

interface QuestCardProps {
  quest: Quest;
  variant?: 'default' | 'compact';
  className?: string;
}

export const QuestCard = ({ quest, variant = 'default', className }: QuestCardProps) => {
  const category = questCategoryMap[quest.category];
  const isCompact = variant === 'compact';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn('h-full', className)}
    >
      <Card className="group h-full overflow-hidden border-border/60 transition-shadow hover:shadow-xl hover:shadow-primary/10">
        <div
          className={cn('relative overflow-hidden bg-muted', isCompact ? 'h-28' : 'h-40 md:h-44')}
        >
          {quest.coverImageUrl ? (
            <img
              src={quest.coverImageUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/40 to-secondary/40" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
            <Badge className={cn('border-transparent', category.badgeClass)}>
              <category.icon className="mr-1 size-3" />
              {category.label}
            </Badge>
            <Badge variant={difficultyToBadge[quest.difficulty]} className="capitalize">
              {quest.difficulty}
            </Badge>
          </div>

          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
            <Zap className="size-3 text-[hsl(var(--xp))]" />
            {quest.reward.xp} XP
          </div>

          <div className="absolute inset-x-3 bottom-3 text-white">
            <h3 className="font-display text-lg font-bold leading-tight drop-shadow-sm">
              {quest.title}
            </h3>
            {!isCompact && (
              <p className="mt-0.5 line-clamp-1 text-xs text-white/80">{quest.summary}</p>
            )}
          </div>
        </div>

        <CardContent className="flex items-center gap-3 p-3">
          <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {quest.estimatedMinutes} min
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {quest.distanceKm} km
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" />
              {formatNumber(quest.participantCount)}
            </span>
            {typeof quest.rating === 'number' && (
              <span className="inline-flex items-center gap-1">
                <Star className="size-3.5 text-amber-500" />
                {quest.rating.toFixed(1)}
              </span>
            )}
          </div>
          <Button
            asChild
            size="sm"
            variant={quest.status === 'locked' ? 'outline' : 'gradient'}
            disabled={quest.status === 'locked'}
          >
            <Link to={ROUTES.questDetail(quest.id)}>
              {quest.status === 'locked' ? 'Locked' : 'View'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
