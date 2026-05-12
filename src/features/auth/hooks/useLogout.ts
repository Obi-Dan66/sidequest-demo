import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { type ApiError } from '@/services/api/errors';

export const useLogout = () => {
  const clear = useAuthStore((s) => s.clear);
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clear();
      queryClient.clear();
    },
  });
};
