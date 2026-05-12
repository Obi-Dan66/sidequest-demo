import { sirPip } from '@/assets/images/sir-pip';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  /** Visual size of the avatar mark. Wordmark scales with it. */
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<NonNullable<LogoProps['size']>, { mark: string; word: string }> = {
  sm: { mark: 'size-7', word: 'text-base' },
  md: { mark: 'size-9', word: 'text-lg' },
  lg: { mark: 'size-12', word: 'text-2xl' },
};

export const Logo = ({ className, withWordmark = true, size = 'md' }: LogoProps) => {
  const sizes = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        aria-hidden
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 ring-1 ring-primary/30',
          sizes.mark,
        )}
      >
        <img
          src={sirPip.bust}
          alt=""
          className="h-[120%] w-[120%] object-cover object-center"
          draggable={false}
        />
      </span>
      {withWordmark && (
        <span className={cn('font-display font-bold tracking-tight', sizes.word)}>
          Side<span className="text-gradient">Quest</span>
        </span>
      )}
    </div>
  );
};
