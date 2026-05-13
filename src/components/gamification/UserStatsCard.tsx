import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UserStatsCardProps {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  hint?: string;
  accentClass?: string;
  className?: string;
}

export const UserStatsCard = ({
  label,
  value,
  icon: Icon,
  hint,
  accentClass = 'from-primary/20 to-secondary/10 text-primary',
  className,
}: UserStatsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}
    >
      <Card className="h-full overflow-hidden">
        <CardContent className="relative flex items-center gap-3 p-4">
          <span
            aria-hidden
            className={cn(
              'grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br',
              accentClass,
            )}
          >
            <Icon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-display text-xl font-bold leading-tight">{value}</div>
            <p className="truncate text-xs text-muted-foreground">{label}</p>
          </div>
          {hint && <span className="text-[11px] font-medium text-[hsl(var(--xp))]">{hint}</span>}
        </CardContent>
      </Card>
    </motion.div>
  );
};
