import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Share2,
  Star,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapContainer } from '@/components/map/MapContainer';
import { UserAvatar } from '@/components/common/UserAvatar';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { useMockQuest } from '@/features/quests/hooks/useMockQuests';
import { mockAchievements } from '@/lib/mock/achievements.mock';
import { questCategoryMap } from '@/lib/categories';
import { ROUTES } from '@/config/routes';
import { cn, formatNumber } from '@/lib/utils';
import { type QuestDifficulty } from '@/types/quest';

const difficultyToBadge: Record<QuestDifficulty, 'success' | 'rare' | 'epic' | 'legendary'> = {
  easy: 'success',
  medium: 'rare',
  hard: 'epic',
  legendary: 'legendary',
};

const QuestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: quest, isLoading, isError } = useMockQuest(id);

  if (isLoading) return <QuestDetailSkeleton />;

  if (isError || !quest) {
    return (
      <EmptyState
        title="Quest not found"
        description="That quest seems to have wandered off the map."
        action={
          <Button asChild>
            <Link to={ROUTES.quests}>Back to quests</Link>
          </Button>
        }
      />
    );
  }

  const category = questCategoryMap[quest.category];
  const rewardAchievements = mockAchievements.filter((achievement) =>
    quest.reward.achievementIds?.includes(achievement.id),
  );

  const handleStart = () => {
    toast.success(`"${quest.title}" added to your active quests!`, {
      description: `Earn ${quest.reward.xp} XP when you complete all ${quest.steps.length || 'the'} steps.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit">
        <Link to={ROUTES.quests}>
          <ArrowLeft className="size-4" /> Back to quests
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border"
      >
        <div className="relative h-56 overflow-hidden md:h-72">
          {quest.coverImageUrl ? (
            <img src={quest.coverImageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/40 to-secondary/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 text-white md:inset-x-6 md:bottom-6">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge className={cn('border-transparent', category.badgeClass)}>
                  <category.icon className="mr-1 size-3" />
                  {category.label}
                </Badge>
                <Badge variant={difficultyToBadge[quest.difficulty]} className="capitalize">
                  {quest.difficulty}
                </Badge>
                {typeof quest.rating === 'number' && (
                  <Badge variant="outline" className="border-white/20 bg-black/30 text-white">
                    <Star className="mr-1 size-3 text-amber-400" /> {quest.rating.toFixed(1)}
                  </Badge>
                )}
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold drop-shadow md:text-4xl">
                {quest.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-white/85">{quest.summary}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Share quest"
              className="text-white hover:bg-white/10"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
              <Stat icon={Clock} label="Time" value={`${quest.estimatedMinutes} min`} />
              <Stat icon={MapPin} label="Distance" value={`${quest.distanceKm} km`} />
              <Stat icon={Users} label="Joined" value={formatNumber(quest.participantCount)} />
              <Stat
                icon={Zap}
                label="Reward"
                value={`+${quest.reward.xp} XP`}
                accent="text-[hsl(var(--xp))]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <h2 className="font-display text-lg font-semibold">About this quest</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{quest.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quest.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {quest.steps.length > 0 && (
            <Card>
              <CardContent className="space-y-3 p-5">
                <SectionHeader title="Steps" subtitle={`${quest.steps.length} to complete`} />
                <ul className="flex flex-col gap-2">
                  {quest.steps.map((step, index) => (
                    <li
                      key={step.id}
                      className={cn(
                        'flex items-start gap-3 rounded-xl border p-3 transition-colors',
                        step.isCompleted
                          ? 'border-[hsl(var(--xp))]/30 bg-[hsl(var(--xp))]/5'
                          : 'border-border bg-card',
                      )}
                    >
                      {step.isCompleted ? (
                        <CheckCircle2 className="mt-0.5 size-5 text-[hsl(var(--xp))]" />
                      ) : (
                        <Circle className="mt-0.5 size-5 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          <span className="text-muted-foreground">{index + 1}.</span> {step.title}
                        </p>
                        {step.description && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Starting point" />
              <MapContainer
                center={quest.startLocation}
                zoom={15}
                markers={[
                  {
                    id: quest.id,
                    position: quest.startLocation,
                    category: quest.category,
                    emphasized: true,
                  },
                ]}
                className="h-48 overflow-hidden rounded-xl border"
              />
              <Button onClick={handleStart} size="lg" variant="gradient" className="w-full">
                <Zap className="size-4" /> Start quest
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader
                title="Explorers in"
                subtitle={`${formatNumber(quest.participantCount)} have joined`}
              />
              {quest.participants.length === 0 ? (
                <p className="text-xs text-muted-foreground">Be the first of your friends.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {quest.participants.map((participant) => (
                    <li key={participant.id} className="flex items-center gap-3">
                      <UserAvatar
                        username={participant.username}
                        level={participant.level}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{participant.username}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {rewardAchievements.length > 0 && (
            <Card>
              <CardContent className="space-y-3 p-5">
                <SectionHeader title="Achievement rewards" />
                <ul className="flex flex-col gap-3">
                  {rewardAchievements.map((achievement) => (
                    <li key={achievement.id} className="flex items-center gap-3">
                      <AchievementBadge achievement={achievement} size="sm" />
                      <div>
                        <p className="text-sm font-semibold">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: string;
}

const Stat = ({ icon: Icon, label, value, accent = 'text-foreground' }: StatProps) => (
  <div className="flex flex-col gap-0.5">
    <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground">
      <Icon className="size-3" /> {label}
    </div>
    <p className={cn('font-display text-base font-semibold', accent)}>{value}</p>
  </div>
);

const QuestDetailSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-9 w-32" />
    <Skeleton className="h-56 w-full rounded-3xl md:h-72" />
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export default QuestDetailPage;
