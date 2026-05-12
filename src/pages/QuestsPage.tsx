import { Link } from 'react-router-dom';
import { Clock, MapPin, Swords } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { type Quest } from '@/types/quest';

const mockQuests: Quest[] = [
  {
    id: 'old-town-secrets',
    title: 'Old Town Secrets',
    summary: 'Hidden alleys and clocktower legends in Staré Město.',
    difficulty: 'easy',
    status: 'available',
    estimatedMinutes: 45,
    startLocation: { lat: 50.0875, lng: 14.4213 },
    steps: [],
    reward: { xp: 250 },
    tags: ['history', 'walking'],
  },
  {
    id: 'letna-skyline',
    title: 'Letná Skyline',
    summary: 'Climb to the city`s best sunset viewpoint.',
    difficulty: 'medium',
    status: 'available',
    estimatedMinutes: 75,
    startLocation: { lat: 50.0974, lng: 14.4178 },
    steps: [],
    reward: { xp: 500 },
    tags: ['views', 'park'],
  },
  {
    id: 'cubist-prague',
    title: 'Cubist Prague',
    summary: 'A walking tour through the only cubist architecture in the world.',
    difficulty: 'hard',
    status: 'locked',
    estimatedMinutes: 90,
    startLocation: { lat: 50.0786, lng: 14.4178 },
    steps: [],
    reward: { xp: 900 },
    tags: ['architecture'],
  },
];

const difficultyToBadge = {
  easy: 'success',
  medium: 'rare',
  hard: 'epic',
  legendary: 'legendary',
} as const;

const QuestsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Quests</h1>
        <p className="text-sm text-muted-foreground">Pick a quest, head out, earn XP.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockQuests.map((quest) => (
          <Card key={quest.id} className="overflow-hidden">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold">{quest.title}</h3>
                  <p className="text-sm text-muted-foreground">{quest.summary}</p>
                </div>
                <Badge variant={difficultyToBadge[quest.difficulty]} className="capitalize">
                  {quest.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" /> {quest.estimatedMinutes} min
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> Prague
                </span>
                <span className="ml-auto font-semibold text-[hsl(var(--xp))]">
                  +{quest.reward.xp} XP
                </span>
              </div>

              <Button
                asChild
                variant={quest.status === 'locked' ? 'outline' : 'gradient'}
                disabled={quest.status === 'locked'}
                className="mt-1"
              >
                <Link to={ROUTES.questDetail(quest.id)}>
                  <Swords className="size-4" />
                  {quest.status === 'locked' ? 'Locked' : 'View quest'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestsPage;
