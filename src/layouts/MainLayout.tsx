import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/layouts/components/TopBar';
import { BottomNav } from '@/layouts/components/BottomNav';
import { SideNav } from '@/layouts/components/SideNav';
import { PageLoader } from '@/components/common/PageLoader';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export const MainLayout = () => {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar />
      <div className="container flex flex-1 gap-6 py-4 md:py-8">
        <SideNav />
        <main className="min-w-0 flex-1 pb-20 md:pb-0">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
