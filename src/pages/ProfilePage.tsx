import { Link, Navigate } from 'react-router-dom';
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
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/common/UserAvatar';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { XPBar } from '@/components/gamification/XPBar';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { UserStatsCard } from '@/components/gamification/UserStatsCard';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { FriendListItem } from '@/components/social/FriendListItem';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useMe } from '@/features/auth/hooks/useMe';
import { useMyStats } from '@/features/users/hooks/useUsers';
import { useMyAchievements } from '@/features/achievements/hooks/useAchievements';
import { useFriends } from '@/features/friendships/hooks/useFriendships';
import { useMyQuestHistory } from '@/features/users/hooks/useQuestHistory';
import { toUser } from '@/lib/adapters';
import { ROUTES } from '@/config/routes';
import { formatNumber } from '@/lib/utils';
import { type UserStats } from '@/types/stats';

const formatOptionalNumber = (value: number | undefined): string =>
  value === undefined ? '—' : formatNumber(value);

const formatOptionalKm = (value: number | undefined): string =>
  value === undefined ? '—' : `${value.toFixed(1)} km`;

/** Achievement trophy count: prefer `GET /users/me/stats` when the backend sends it; otherwise count unlocked rows from `GET /achievements/me`. */
const achievementsCardValue = (
  stats: UserStats | undefined,
  unlockedFromApi: number,
  achievementsLoaded: boolean,
): string => {
  if (stats?.achievementsUnlocked !== undefined) {
    return formatNumber(stats.achievementsUnlocked);
  }
  if (!achievementsLoaded) return '—';
  return formatNumber(unlockedFromApi);
};

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();
  const meQuery = useMe();
  const statsQuery = useMyStats(isAuthenticated);
  const achievementsQuery = useMyAchievements(isAuthenticated);
  const friendsQuery = useFriends();
  const historyQuery = useMyQuestHistory({ limit: 10, status: 'COMPLETED' }, isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.auth.login} replace />;
  }

  if (meQuery.isLoading || !meQuery.data) {
    return <ProfilePageSkeleton />;
  }

  const user = toUser(meQuery.data, statsQuery.data);
  const stats = statsQuery.data;
  const achievements = achievementsQuery.data ?? [];
  const friends = friendsQuery.data ?? [];
  const history = historyQuery.data?.items ?? [];

  const unlocked = achievements.filter((a) => a.unlockedAt);
  const locked = achievements.filter((a) => !a.unlockedAt);

  const statsLoading = statsQuery.isPending && !statsQuery.data;
  const achievementsLoaded = achievementsQuery.isSuccess;

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
            <Button
              onClick={() => logout.mutate()}
              variant="ghost"
              size="sm"
              disabled={logout.isPending}
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </motion.div>

      <section className="flex flex-col gap-2">
        <p className="sr-only">
          Stats load from GET /users/me/stats. Achievement count falls back to GET /achievements/me
          when the stats payload omits achievementsUnlocked.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <UserStatsCard
            label="Quests completed"
            value={
              statsLoading ? (
                <Skeleton className="mx-auto h-6 w-14" />
              ) : (
                formatOptionalNumber(stats?.questsCompleted)
              )
            }
            icon={Swords}
            accentClass="from-primary/25 to-secondary/15 text-primary"
          />
          <UserStatsCard
            label="Places visited"
            value={
              statsLoading ? (
                <Skeleton className="mx-auto h-6 w-14" />
              ) : (
                formatOptionalNumber(stats?.placesVisited)
              )
            }
            icon={MapPinned}
            accentClass="from-sky-500/25 to-cyan-500/15 text-sky-400"
          />
          <UserStatsCard
            label="Distance walked"
            value={
              statsLoading ? (
                <Skeleton className="mx-auto h-6 w-16" />
              ) : (
                formatOptionalKm(stats?.distanceWalkedKm)
              )
            }
            icon={Footprints}
            accentClass="from-emerald-500/25 to-teal-500/15 text-emerald-400"
          />
          <UserStatsCard
            label="Achievements"
            value={
              statsLoading ? (
                <Skeleton className="mx-auto h-6 w-10" />
              ) : (
                achievementsCardValue(stats, unlocked.length, achievementsLoaded)
              )
            }
            icon={Trophy}
            accentClass="from-amber-500/25 to-orange-500/15 text-amber-500"
          />
          <UserStatsCard
            label="Streak"
            value={
              statsLoading ? (
                <Skeleton className="mx-auto h-6 w-12" />
              ) : (
                formatOptionalNumber(stats?.currentStreakDays)
              )
            }
            icon={Flame}
            hint={
              stats && stats.longestStreakDays !== undefined
                ? `best ${stats.longestStreakDays}d`
                : undefined
            }
            accentClass="from-rose-500/25 to-pink-500/15 text-rose-400"
          />
          <UserStatsCard
            label="Total XP"
            value={formatNumber(user.xp)}
            icon={Sparkles}
            accentClass="from-fuchsia-500/25 to-violet-500/15 text-fuchsia-400"
          />
        </div>
        {statsQuery.isError && (
          <p className="text-xs text-muted-foreground">
            Could not load extended stats (GET /users/me/stats). Some cards show &quot;—&quot; until
            the backend implements FEATURES.md §1.
          </p>
        )}
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
            {achievementsQuery.isLoading ? (
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="size-14 rounded-full" />
                ))}
              </div>
            ) : achievements.length === 0 ? (
              <EmptyState
                title="No achievements yet"
                description="Complete your first quest to unlock your first trophy."
                icon={Trophy}
              />
            ) : (
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
            )}
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
            {friendsQuery.isLoading ? (
              <ul className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-14 w-full rounded-2xl" />
                  </li>
                ))}
              </ul>
            ) : friends.length === 0 ? (
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
            {historyQuery.isLoading ? (
              <ul className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-14 w-full rounded-xl" />
                  </li>
                ))}
              </ul>
            ) : history.length === 0 ? (
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
                          {entry.quest.title}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.completedAt
                          ? new Date(entry.completedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'In progress'}
                        {entry.durationMinutes !== null && ` · ${entry.durationMinutes} min`}
                      </p>
                    </div>
                    <span className="font-semibold text-[hsl(var(--xp))]">
                      +{entry.xpEarned} XP
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {historyQuery.isError && (
              <p className="text-xs text-muted-foreground">
                Could not load history (GET /users/me/quests/history). See FEATURES.md §2.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const ProfilePageSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-40 w-full rounded-3xl" />
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-20 rounded-2xl" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Skeleton className="h-56 rounded-2xl lg:col-span-2" />
      <Skeleton className="h-56 rounded-2xl" />
    </div>
  </div>
);

export default ProfilePage;
