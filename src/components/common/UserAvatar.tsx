import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  username: string;
  avatarUrl?: string;
  level?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
  className?: string;
}

const sizeClass: Record<NonNullable<UserAvatarProps['size']>, string> = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
  xl: 'size-20 text-lg',
};

const initials = (username: string) => username.slice(0, 2).toUpperCase();

export const UserAvatar = ({
  username,
  avatarUrl,
  level,
  size = 'md',
  showRing = true,
  className,
}: UserAvatarProps) => {
  return (
    <div className={cn('relative inline-flex', className)}>
      <Avatar
        className={cn(
          sizeClass[size],
          showRing && 'ring-2 ring-primary/40 ring-offset-2 ring-offset-background',
        )}
      >
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground">
          {initials(username)}
        </AvatarFallback>
      </Avatar>
      {typeof level === 'number' && (
        <span className="absolute -bottom-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary px-1 text-[10px] font-semibold text-primary-foreground shadow">
          {level}
        </span>
      )}
    </div>
  );
};
