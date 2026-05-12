import { type LucideIcon, Sparkles } from 'lucide-react';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon: Icon = Sparkles,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card/60 p-8 text-center',
        className,
      )}
    >
      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
      <div>
        <h3 className="font-display text-base font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
};
