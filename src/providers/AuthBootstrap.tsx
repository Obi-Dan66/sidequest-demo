import { type ReactNode, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { toUser } from '@/lib/adapters';
import { isApiError } from '@/services/api';
import { queryKeys } from '@/lib/queryClient';

interface AuthBootstrapProps {
  children: ReactNode;
}

/**
 * On app boot, if the persisted auth store still has an access token,
 * verify it by calling `/auth/me`. On success, refresh the user data; on
 * failure with a final 401 (after the refresh interceptor has tried),
 * clear the session so the UI drops back to signed-out.
 *
 * Runs exactly once per session.
 */
export const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const hasToken = useAuthStore((s) => Boolean(s.session?.accessToken));
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clear);
  const queryClient = useQueryClient();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    if (!isHydrated || !hasToken) return;
    didRun.current = true;

    const verify = async () => {
      try {
        const dto = await authApi.me();
        setUser(toUser(dto));
        queryClient.setQueryData(queryKeys.auth.me, dto);
      } catch (error) {
        if (isApiError(error) && error.status === 401) {
          clear();
        }
      }
    };

    void verify();
  }, [isHydrated, hasToken, setUser, clear, queryClient]);

  return <>{children}</>;
};
