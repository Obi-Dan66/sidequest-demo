import { Sparkles, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { questCategoryList } from '@/lib/categories';
import { type QuestCategory } from '@/types/quest';

interface CategoryFilterProps {
  value: QuestCategory | 'all';
  onChange: (value: QuestCategory | 'all') => void;
  className?: string;
}

export const CategoryFilter = ({ value, onChange, className }: CategoryFilterProps) => {
  const entries: Array<{ id: QuestCategory | 'all'; label: string; icon: LucideIcon }> = [
    { id: 'all', label: 'All', icon: Sparkles },
    ...questCategoryList.map((entry) => ({ id: entry.id, label: entry.label, icon: entry.icon })),
  ];

  return (
    <div
      className={cn(
        'no-scrollbar -mx-1 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-1 pb-1',
        className,
      )}
      role="tablist"
      aria-label="Quest category filter"
    >
      {entries.map((entry) => {
        const isActive = value === entry.id;
        return (
          <button
            key={entry.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(entry.id)}
            className={cn(
              'relative inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              isActive
                ? 'border-transparent text-primary-foreground shadow-sm'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
            type="button"
          >
            {isActive && (
              <motion.span
                layoutId="categoryPill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary to-secondary"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <entry.icon className="size-3.5" />
            {entry.label}
          </button>
        );
      })}
    </div>
  );
};
