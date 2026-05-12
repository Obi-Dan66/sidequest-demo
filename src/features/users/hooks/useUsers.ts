import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi, type UserListQuery } from '@/features/users/api/users.api';
import { queryKeys } from '@/lib/queryClient';
import { toUserStats } from '@/lib/adapters';
import { type ApiError } from '@/services/api/errors';
import { type UpdateUserDto, type UserDto, type UserStatsDto } from '@/types/dto';
import { type PaginatedResponse } from '@/types/api';
import { type UserStats } from '@/types/stats';

export const useUsers = (query: UserListQuery = {}) =>
  useQuery<PaginatedResponse<UserDto>, ApiError>({
    queryKey: queryKeys.users.list(query),
    queryFn: () => usersApi.list(query),
  });

export const useUser = (id: string | undefined) =>
  useQuery<UserDto, ApiError>({
    queryKey: queryKeys.users.detail(id ?? ''),
    queryFn: () => usersApi.getById(id ?? ''),
    enabled: Boolean(id),
  });

export const useUserStats = (id: string | undefined) =>
  useQuery<UserStats, ApiError>({
    queryKey: queryKeys.users.stats(id ?? ''),
    queryFn: async () => toUserStats(await usersApi.getStats(id ?? '')),
    enabled: Boolean(id),
  });

export const useMyStats = (enabled = true) =>
  useQuery<UserStats, ApiError>({
    queryKey: queryKeys.users.myStats,
    queryFn: async () => toUserStats(await usersApi.myStats()),
    enabled,
    retry: false,
  });

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation<UserDto, ApiError, UpdateUserDto>({
    mutationFn: (payload) => usersApi.updateMe(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);
    },
  });
};

export const useUploadMyAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => usersApi.uploadMyAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
};

export type { UserStatsDto };
