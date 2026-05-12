import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthBootstrap } from '@/providers/AuthBootstrap';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system">
        <QueryProvider>
          <AuthBootstrap>
            <BrowserRouter>
              {children}
              <Toaster />
            </BrowserRouter>
          </AuthBootstrap>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
