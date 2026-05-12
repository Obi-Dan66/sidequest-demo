import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Award,
  Flame,
  Footprints,
  MapPinned,
  Settings,
  Sparkles,
  Swords,
  Trophy,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/common/UserAvatar';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { XPBar } from '@/components/gamification/XPBar';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { UserStatsCard } from '@/components/gamification/UserStatsCard';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { FriendListItem } from '@/components/social/FriendListItem';
import { useAuth } from '@/hooks/useAuth';
import { mockUsersService } from '@/services/mock/users.service';
import { mockSocialService } from '@/services/mock/social.service';
import { mockCurrentUser } from '@/lib/mock/users.mock';
import { ROUTES } from '@/config/routes';
import { formatNumber } from '@/lib/utils';

const ProfilePage = () => {
  const { user: authUser, signOut } = useAuth();
  const user = authUser ?? mockCurrentUser;

  const { data: stats } = useQuery({
    queryKey: ['profile', 'stats'],
    queryFn: () => mockUsersService.stats(),
  });
  const { data: achievements = [] } = useQuery({
    queryKey: ['profile', 'achievements'],
    queryFn: () => mockUsersService.achievements(),
  });
  const { data: history = [] } = useQuery({
    queryKey: ['profile', 'history'],
    queryFn: () => mockUsersService.history(),
  });
  const { data: friends = [] } = useQuery({
    queryKey: ['profile', 'friends-preview'],
    queryFn: () => mockSocialService.friends(),
  });

  const unlocked = achievements.filter((a) => a.unlockedAt);
  const locked = achievements.filter((a) => !a.unlockedAt);

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border bg-card"
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-primary/40 via-secondary/30 to-transparent" />
        <CardContent className="relative flex flex-col gap-5 p-5 md:flex-row md:items-end md:p-7">
          <UserAvatar username={user.username} avatarUrl={user.avatarUrl} size="xl" />
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold">{user.username}</h1>
              <LevelBadge level={user.level} />
              {user.title && <Badge variant="secondary">{user.title}</Badge>}
            </div>
            <XPBar level={user.level} xp={user.xp} xpToNextLevel={user.xpToNextLevel} />
          </div>
          <div className="flex gap-2 md:flex-col">
            <Button asChild variant="outline" size="sm">
              <Link to={ROUTES.settings}>
                <Settings className="size-4" /> Settings
              </Link>
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm">
              Sign out
            </Button>
          </div>
        </CardContent>
      </motion.div>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <UserStatsCard
          label="Quests completed"
          value={stats ? formatNumber(stats.questsCompleted) : '—'}
          icon={Swords}
          accentClass="from-primary/25 to-secondary/15 text-primary"
        />
        <UserStatsCard
          label="Places visited"
          value={stats ? formatNumber(stats.placesVisited) : '—'}
          icon={MapPinned}
          accentClass="from-sky-500/25 to-cyan-500/15 text-sky-400"
        />
        <UserStatsCard
          label="Distance walked"
          value={stats ? `${stats.distanceWalkedKm.toFixed(1)} km` : '—'}
          icon={Footprints}
          accentClass="from-emerald-500/25 to-teal-500/15 text-emerald-400"
        />
        <UserStatsCard
          label="Achievements"
          value={stats ? formatNumber(stats.achievementsUnlocked) : '—'}
          icon={Trophy}
          accentClass="from-amber-500/25 to-orange-500/15 text-amber-500"
        />
        <UserStatsCard
          label="Streak"
          value={stats ? `${stats.currentStreakDays}d` : '—'}
          icon={Flame}
          hint={stats ? `best ${stats.longestStreakDays}d` : undefined}
          accentClass="from-rose-500/25 to-pink-500/15 text-rose-400"
        />
        <UserStatsCard
          label="Total XP"
          value={formatNumber(user.xp)}
          icon={Sparkles}
          accentClass="from-fuchsia-500/25 to-violet-500/15 text-fuchsia-400"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-4 p-5">
            <SectionHeader
              title="Achievements"
              subtitle={`${unlocked.length} unlocked · ${locked.length} to chase`}
              action={
                <Button asChild variant="ghost" size="sm">
                  <Link to={ROUTES.achievements}>View all</Link>
                </Button>
              }
            />
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
              {achievements.slice(0, 8).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <AchievementBadge achievement={achievement} size="md" />
                  <span className="line-clamp-2 text-[11px] font-medium text-muted-foreground">
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-5">
            <SectionHeader
              title="Friends"
              subtitle={`${friends.length} explorers`}
              action={
                <Button asChild variant="ghost" size="sm">
                  <Link to={ROUTES.friends}>Open</Link>
                </Button>
              }
            />
            {friends.length === 0 ? (
              <EmptyState
                title="No friends yet"
                description="Invite some explorers to make every quest more fun."
                icon={Award}
              />
            ) : (
              <ul className="flex flex-col gap-2">
                {friends.slice(0, 4).map((friend, index) => (
                  <FriendListItem key={friend.id} friend={friend} index={index} />
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardContent className="space-y-3 p-5">
            <SectionHeader title="Recent quests" subtitle="Your latest completed quests." />
            {history.length === 0 ? (
              <EmptyState
                title="No history yet"
                description="Complete your first quest to see it here."
                icon={Swords}
              />
            ) : (
              <ul className="divide-y">
                {history.map((entry) => (
                  <li key={entry.id} className="flex items-center gap-4 py-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Swords className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        <Link to={ROUTES.questDetail(entry.questId)} className="hover:text-primary">
                          {entry.questTitle}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.completedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        · {entry.durationMinutes} min
                      </p>
                    </div>
                    <span className="font-semibold text-[hsl(var(--xp))]">
                      +{entry.xpEarned} XP
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ProfilePage;
