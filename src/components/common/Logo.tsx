import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export const Logo = ({ className, withWordmark = true }: LogoProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" />
        </svg>
      </span>
      {withWordmark && (
        <span className="font-display text-lg font-bold tracking-tight">
          Side<span className="text-gradient">Quest</span>
        </span>
      )}
    </div>
  );
};
