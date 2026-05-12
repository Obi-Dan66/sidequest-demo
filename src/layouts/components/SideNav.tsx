import { NavLink } from 'react-router-dom';
import { Compass, Map, Swords, Trophy, User, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/config/routes';

const items = [
  { to: ROUTES.home, label: 'Home', icon: Compass, end: true },
  { to: ROUTES.explore, label: 'Explore', icon: Map },
  { to: ROUTES.quests, label: 'Quests', icon: Swords },
  { to: ROUTES.achievements, label: 'Achievements', icon: Trophy },
  { to: ROUTES.leaderboard, label: 'Leaderboard', icon: BarChart3 },
  { to: ROUTES.profile, label: 'Profile', icon: User },
  { to: ROUTES.settings, label: 'Settings', icon: Settings },
];

export const SideNav = () => {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r border-border/60 py-6 md:block">
      <nav aria-label="Primary navigation" className="px-3">
        <ul className="flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
