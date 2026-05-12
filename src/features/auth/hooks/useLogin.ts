import { useMutation } from '@tanstack/react-query';
import { authApi, type LoginPayload, type LoginResponse } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { type ApiError } from '@/services/api/errors';

export const useLogin = () => {
  const signIn = useAuthStore((s) => s.signIn);

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: (payload) => authApi.login(payload),
    onSuccess: ({ user, session }) => {
      signIn(user, session);
    },
  });
};
