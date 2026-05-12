import { Progress } from '@/components/ui/progress';
import { cn, formatNumber, xpProgress } from '@/lib/utils';

interface XPBarProps {
  xp: number;
  xpToNextLevel: number;
  level: number;
  className?: string;
  showNumbers?: boolean;
}

export const XPBar = ({ xp, xpToNextLevel, level, className, showNumbers = true }: XPBarProps) => {
  const value = xpProgress(xp, xpToNextLevel);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">Lvl {level}</span>
        {showNumbers && (
          <span className="text-muted-foreground">
            {formatNumber(xp)} / {formatNumber(xpToNextLevel)} XP
          </span>
        )}
      </div>
      <Progress value={value} indicatorClassName="gradient-xp" />
    </div>
  );
};
