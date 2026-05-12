import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, subtitle, action, className }: SectionHeaderProps) => {
  return (
    <div className={cn('flex items-end justify-between gap-3', className)}>
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight md:text-xl">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
};
