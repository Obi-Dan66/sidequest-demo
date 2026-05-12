import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { formatNumber } from '@/lib/utils';

const mockLeaders = [
  { id: '1', username: 'praguenaut', level: 24, xp: 14_320 },
  { id: '2', username: 'vltava_wanderer', level: 22, xp: 12_980 },
  { id: '3', username: 'cobblestone', level: 19, xp: 10_750 },
  { id: '4', username: 'castle_owl', level: 17, xp: 9_460 },
  { id: '5', username: 'kafka_fan', level: 16, xp: 8_910 },
];

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Top explorers this season.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {mockLeaders.map((leader, index) => (
              <li
                key={leader.id}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/50"
              >
                <span className="w-6 font-display text-sm font-semibold text-muted-foreground">
                  {index + 1}
                </span>
                <Avatar className="size-9 ring-1 ring-border">
                  <AvatarFallback>{leader.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{leader.username}</p>
                </div>
                <LevelBadge level={leader.level} />
                <span className="w-24 text-right text-sm font-semibold text-[hsl(var(--xp))]">
                  {formatNumber(leader.xp)} XP
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
