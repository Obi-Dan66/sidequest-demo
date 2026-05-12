import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { queryKeys } from '@/lib/queryClient';
import { type UserDto } from '@/types/dto';
import { type ApiError } from '@/services/api/errors';

/**
 * Fetches the current authenticated user via `/auth/me`.
 * Enabled only when an access token is present in the auth store.
 */
export const useMe = () => {
  const hasToken = useAuthStore((s) => Boolean(s.session?.accessToken));

  return useQuery<UserDto, ApiError>({
    queryKey: queryKeys.auth.me,
    queryFn: () => authApi.me(),
    enabled: hasToken,
    staleTime: 60_000,
  });
};
