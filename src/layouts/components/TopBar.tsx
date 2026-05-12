import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';

export const TopBar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center gap-3">
        <Link to={ROUTES.home} className="flex items-center" aria-label="SideQuest home">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <ThemeToggle />
          {isAuthenticated && user ? (
            <Link to={ROUTES.profile} className="flex items-center gap-2 pl-1">
              <LevelBadge level={user.level} className="hidden sm:inline-flex" />
              <Avatar className="size-8 ring-2 ring-primary/30">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Button asChild size="sm" variant="gradient">
              <Link to={ROUTES.auth.login}>Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
