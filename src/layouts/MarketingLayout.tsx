import { Suspense } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/common/PageLoader';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { to: ROUTES.home, label: 'Home', end: true },
  { to: ROUTES.explore, label: 'Map' },
  { to: ROUTES.business, label: 'For business' },
];

export const MarketingLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative flex min-h-full flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] overflow-hidden">
        <div className="absolute -left-20 top-10 size-[28rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-0 top-20 size-[32rem] rounded-full bg-secondary/25 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-14 items-center gap-6">
          <Link to={ROUTES.home} aria-label="SideQuest home">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Button asChild size="sm" variant="gradient">
                <Link to={ROUTES.explore}>Open app</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex">
                  <Link to={ROUTES.auth.login}>Sign in</Link>
                </Button>
                <Button asChild size="sm" variant="gradient">
                  <Link to={ROUTES.auth.register}>Start questing</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="border-t border-border/60 bg-background/60 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} SideQuest — Explore on.</p>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.business} className="hover:text-foreground">
              For business
            </Link>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
