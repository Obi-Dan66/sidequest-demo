import { Loader2, Wifi, WifiOff } from 'lucide-react';
import { useHealth } from '@/features/health/hooks/useHealth';
import { cn } from '@/lib/utils';
import { env } from '@/config/env';
import { isApiError } from '@/services/api';

interface BackendStatusProps {
  className?: string;
  /** Compact pill (dot + short label). Defaults to true. */
  compact?: boolean;
}

const formatError = (error: unknown): string => {
  if (isApiError(error)) {
    if (error.status === 0) return 'Cannot reach backend';
    return `${error.status} ${error.message}`;
  }
  if (error instanceof Error) return error.message;
  return 'Unknown error';
};

const formatTimestamp = (date: Date): string =>
  date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export const BackendStatus = ({ className, compact = true }: BackendStatusProps) => {
  const { isOnline, isPending, isFetching, isError, error, dataUpdatedAt, refetch } = useHealth();

  let tone: 'idle' | 'ok' | 'error';
  let label: string;
  let Icon = Wifi;

  if (isPending) {
    tone = 'idle';
    label = 'Checking…';
    Icon = Loader2;
  } else if (isError || !isOnline) {
    tone = 'error';
    label = 'Backend Offline';
    Icon = WifiOff;
  } else {
    tone = 'ok';
    label = 'Backend Connected';
    Icon = Wifi;
  }

  const toneClasses: Record<typeof tone, string> = {
    idle: 'bg-muted text-muted-foreground ring-1 ring-border',
    ok: 'bg-[hsl(var(--xp))]/15 text-[hsl(var(--xp))] ring-1 ring-[hsl(var(--xp))]/30',
    error: 'bg-destructive/15 text-destructive ring-1 ring-destructive/30',
  };

  const dotToneClasses: Record<typeof tone, string> = {
    idle: 'bg-muted-foreground/60',
    ok: 'bg-[hsl(var(--xp))]',
    error: 'bg-destructive',
  };

  const title = [
    `API: ${env.api.baseUrl}`,
    isError ? `Error: ${formatError(error)}` : null,
    dataUpdatedAt ? `Last check: ${formatTimestamp(new Date(dataUpdatedAt))}` : null,
    'Click to retry',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <button
      type="button"
      onClick={() => refetch()}
      title={title}
      aria-label={`${label}. Click to retry.`}
      aria-live="polite"
      className={cn(
        'inline-flex select-none items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        toneClasses[tone],
        className,
      )}
    >
      <span className="relative flex size-2">
        {tone === 'ok' && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--xp))]/60" />
        )}
        <span className={cn('relative size-2 rounded-full', dotToneClasses[tone])} />
      </span>

      {compact ? (
        <>
          <span className="hidden sm:inline">{label}</span>
          <Icon
            className={cn('size-3.5 sm:hidden', isPending || isFetching ? 'animate-spin' : null)}
            aria-hidden
          />
        </>
      ) : (
        <span className="inline-flex items-center gap-1.5">
          <Icon
            className={cn('size-3.5', isPending || isFetching ? 'animate-spin' : null)}
            aria-hidden
          />
          {label}
        </span>
      )}
    </button>
  );
};
