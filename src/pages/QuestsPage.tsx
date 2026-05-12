import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CategoryFilter } from '@/components/quests/CategoryFilter';
import { QuestCard } from '@/components/quests/QuestCard';
import { QuestCardSkeleton } from '@/components/quests/QuestCardSkeleton';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { useMockQuests } from '@/features/quests/hooks/useMockQuests';
import { type QuestCategory } from '@/types/quest';

const QuestsPage = () => {
  const [category, setCategory] = useState<QuestCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const { data: quests = [], isLoading } = useMockQuests({ category, search });

  const inProgress = quests.filter((q) => q.status === 'in_progress');
  const available = quests.filter((q) => q.status !== 'in_progress');

  return (
    <div className="flex flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold tracking-tight">Quests</h1>
        <p className="text-sm text-muted-foreground">
          Pick a quest, head out, earn XP. {quests.length} quests on the board.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
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

      {inProgress.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeader
            title="Continue where you left off"
            subtitle="Quests you have already started."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <SectionHeader title="All quests" subtitle="Hand-curated. New ones added every week." />
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <QuestCardSkeleton key={index} />
            ))}
          </div>
        ) : available.length === 0 ? (
          <EmptyState
            title="No quests match those filters"
            description="Try clearing the search or picking a different category."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default QuestsPage;
