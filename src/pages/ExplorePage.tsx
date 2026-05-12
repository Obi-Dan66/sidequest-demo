import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, type MapMarker } from '@/components/map/MapContainer';
import { FloatingMapControls } from '@/components/map/FloatingMapControls';
import { CategoryFilter } from '@/components/quests/CategoryFilter';
import { QuestCard } from '@/components/quests/QuestCard';
import { QuestCardSkeleton } from '@/components/quests/QuestCardSkeleton';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';
import { useQuests } from '@/features/quests/hooks/useQuests';
import { siteConfig } from '@/config/site';
import { type Quest, type QuestCategory } from '@/types/quest';
import { questCategoryMap } from '@/lib/categories';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const ExplorePage = () => {
  const [category, setCategory] = useState<QuestCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedQuestId, setSelectedQuestId] = useState<string | undefined>();

  const { data, isLoading } = useQuests({
    categorySlug: category === 'all' ? undefined : category,
    search: search.trim() || undefined,
  });
  const quests = useMemo(() => data?.quests ?? [], [data?.quests]);

  const markers: MapMarker[] = useMemo(
    () =>
      quests.map((quest) => ({
        id: quest.id,
        position: quest.startLocation,
        category: quest.category,
        emphasized: quest.id === selectedQuestId,
        popup: <QuestPopup quest={quest} />,
      })),
    [quests, selectedQuestId],
  );

  const selectedQuest = quests.find((q) => q.id === selectedQuestId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Explore</h1>
            <p className="text-sm text-muted-foreground">
              <MapPin className="inline size-3.5" /> {siteConfig.primaryCity.name} · {quests.length}{' '}
              quests on the board
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search quests, places, or vibes…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="relative">
        <MapContainer
          markers={markers}
          onMarkerClick={(id) => setSelectedQuestId(id)}
          className="relative h-[55vh] min-h-[360px] overflow-hidden rounded-2xl border md:h-[60vh]"
        />
        <div className="pointer-events-none absolute right-3 top-3">
          <FloatingMapControls />
        </div>

        {selectedQuest && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="absolute inset-x-3 bottom-3 md:left-3 md:right-auto md:w-96"
          >
            <QuestCard quest={selectedQuest} variant="compact" />
          </motion.div>
        )}
      </div>

      <section className="flex flex-col gap-3">
        <SectionHeader
          title="Nearby quests"
          subtitle="Within a 20-minute walk of central Prague."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <QuestCardSkeleton key={index} />)
            : quests.slice(0, 6).map((quest) => <QuestCard key={quest.id} quest={quest} />)}
        </div>

        {!isLoading && quests.length === 0 && (
          <EmptyState
            title="No quests match those filters"
            description="Try clearing the search or picking a different category."
          />
        )}
      </section>
    </div>
  );
};

const QuestPopup = ({ quest }: { quest: Quest }) => {
  const category = questCategoryMap[quest.category];
  return (
    <Card className="w-60 border-none shadow-none">
      <CardContent className="space-y-1.5 p-2">
        <Badge className={category.badgeClass}>
          <category.icon className="mr-1 size-3" />
          {category.label}
        </Badge>
        <h4 className="font-display text-sm font-semibold leading-tight">{quest.title}</h4>
        <p className="line-clamp-2 text-xs text-muted-foreground">{quest.summary}</p>
        <Link
          to={ROUTES.questDetail(quest.id)}
          className="text-xs font-medium text-primary hover:underline"
        >
          View quest →
        </Link>
      </CardContent>
    </Card>
  );
};

export default ExplorePage;
