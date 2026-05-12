import { NavLink } from 'react-router-dom';
import { Map, Swords, Trophy, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/config/routes';

const items = [
  { to: ROUTES.explore, label: 'Explore', icon: Map },
  { to: ROUTES.quests, label: 'Quests', icon: Swords },
  { to: ROUTES.friends, label: 'Friends', icon: Users },
  { to: ROUTES.achievements, label: 'Trophies', icon: Trophy },
  { to: ROUTES.profile, label: 'Me', icon: User },
];

export const BottomNav = () => {
  return (
    <nav
      aria-label="Primary"
      className="safe-bottom sticky bottom-0 z-30 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
    >
      <ul className="container flex h-16 items-stretch justify-between gap-1 px-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex h-full flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'size-5',
                      isActive && 'drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]',
                    )}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
