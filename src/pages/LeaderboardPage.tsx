import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { useLeaderboard } from '@/features/leaderboard/hooks/useLeaderboard';
import { siteConfig } from '@/config/site';
import { formatNumber } from '@/lib/utils';

const LeaderboardPage = () => {
  const { data, isLoading } = useLeaderboard({
    scope: 'CITY',
    city: siteConfig.primaryCity.slug,
    period: 'ALL_TIME',
    limit: 20,
  });
  const entries = data?.entries ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Top explorers this season.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <ul className="divide-y">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center gap-4 px-4 py-3">
                  <Skeleton className="size-6 rounded" />
                  <Skeleton className="size-9 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-5 w-12" />
                </li>
              ))}
            </ul>
          ) : entries.length === 0 ? (
            <EmptyState
              title="No leaderboard yet"
              description="Once explorers start questing in Prague, the top of the board will show up here."
            />
          ) : (
            <ul className="divide-y">
              {entries.map((entry) => (
                <li
                  key={entry.user.id}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/50"
                >
                  <span className="w-6 font-display text-sm font-semibold text-muted-foreground">
                    {entry.rank}
                  </span>
                  <Avatar className="size-9 ring-1 ring-border">
                    {entry.user.avatarUrl && <AvatarImage src={entry.user.avatarUrl} alt="" />}
                    <AvatarFallback>{entry.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {entry.user.username}
                      {entry.isMe && (
                        <span className="ml-2 text-xs font-normal text-primary">(you)</span>
                      )}
                    </p>
                  </div>
                  <LevelBadge level={entry.user.level} />
                  <span className="w-24 text-right text-sm font-semibold text-[hsl(var(--xp))]">
                    {formatNumber(entry.xp)} XP
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
