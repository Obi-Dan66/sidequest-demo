import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelBadgeProps {
  level: number;
  className?: string;
}

export const LevelBadge = ({ level, className }: LevelBadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-primary to-secondary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-sm',
        className,
      )}
    >
      <Sparkles className="size-3" />
      Lvl {level}
    </div>
  );
};
