import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { type ApiError } from '@/services/api/errors';
import { toUser } from '@/lib/adapters';
import { queryKeys } from '@/lib/queryClient';
import { type AuthSessionDto, type RegisterDto } from '@/types/dto';

export const useRegister = () => {
  const signIn = useAuthStore((s) => s.signIn);
  const queryClient = useQueryClient();

  return useMutation<AuthSessionDto, ApiError, RegisterDto>({
    mutationFn: (payload) => authApi.register(payload),
    onSuccess: ({ user, accessToken, refreshToken }) => {
      signIn(toUser(user), { accessToken, refreshToken });
      queryClient.setQueryData(queryKeys.auth.me, user);
    },
  });
};
