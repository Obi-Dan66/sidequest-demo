import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { PageLoader } from '@/components/common/PageLoader';
import { ROUTES } from '@/config/routes';

export const AuthLayout = () => {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[32rem] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <header className="container flex h-14 items-center justify-between">
        <Link to={ROUTES.home}>
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      <main className="container flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md">
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
