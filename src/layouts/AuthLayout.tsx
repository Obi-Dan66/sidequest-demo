import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { PageLoader } from '@/components/common/PageLoader';
import { Mascot } from '@/components/common/Mascot';
import { ROUTES } from '@/config/routes';

export const AuthLayout = () => {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[32rem] rounded-full bg-secondary/25 blur-3xl" />
      </div>

      <header className="container flex h-14 items-center justify-between">
        <Link to={ROUTES.home}>
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      <main className="container grid flex-1 items-center gap-10 py-10 md:grid-cols-[1fr_auto]">
        <div className="hidden flex-col items-center justify-center text-center md:flex">
          <Mascot
            pose="waving"
            className="h-72 drop-shadow-[0_18px_28px_hsl(var(--primary)/0.35)]"
          />
          <p className="mt-6 max-w-xs font-display text-xl font-semibold">
            Sir Pip is preparing your <span className="text-gradient">first quest</span>.
          </p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            45 minutes. 1.5 km. +250 XP. Pretty good deal for a Tuesday.
          </p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      <footer className="container py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} SideQuest. Explore on.
      </footer>
    </div>
  );
};
