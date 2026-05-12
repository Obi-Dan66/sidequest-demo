import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  friendshipsApi,
  type FriendActivityQuery,
  type FriendshipListQuery,
} from '@/features/friendships/api/friendships.api';
import { queryKeys } from '@/lib/queryClient';
import { toActivityItem, toFriend } from '@/lib/adapters';
import { type ActivityItem, type Friend } from '@/types/social';
import { type CreateFriendshipDto, type FriendshipDto, type UserDto } from '@/types/dto';
import { type ApiError } from '@/services/api/errors';

export const useFriendships = (query: FriendshipListQuery = {}) =>
  useQuery<FriendshipDto[], ApiError>({
    queryKey: queryKeys.friendships.mine(query),
    queryFn: () => friendshipsApi.listMine(query),
  });

export const useFriends = () =>
  useQuery<Friend[], ApiError>({
    queryKey: queryKeys.friendships.friends,
    queryFn: async () => (await friendshipsApi.listFriends()).map(toFriend),
  });

export const usePendingFriendRequests = () =>
  useQuery<FriendshipDto[], ApiError>({
    queryKey: queryKeys.friendships.pending,
    queryFn: () => friendshipsApi.listPending(),
  });

export const useFriendActivity = (query: FriendActivityQuery = {}) =>
  useQuery<ActivityItem[], ApiError>({
    queryKey: queryKeys.friendships.activity(query),
    queryFn: async () => (await friendshipsApi.activity(query)).map(toActivityItem),
  });

const invalidateFriendships = (queryClient: ReturnType<typeof useQueryClient>): void => {
  queryClient.invalidateQueries({ queryKey: queryKeys.friendships.friends });
  queryClient.invalidateQueries({ queryKey: queryKeys.friendships.pending });
};

export const useRequestFriendship = () => {
  const queryClient = useQueryClient();
  return useMutation<FriendshipDto, ApiError, CreateFriendshipDto>({
    mutationFn: (payload) => friendshipsApi.request(payload),
    onSuccess: () => invalidateFriendships(queryClient),
  });
};

export const useAcceptFriendship = () => {
  const queryClient = useQueryClient();
  return useMutation<FriendshipDto, ApiError, string>({
    mutationFn: (id) => friendshipsApi.accept(id),
    onSuccess: () => invalidateFriendships(queryClient),
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation<FriendshipDto, ApiError, string>({
    mutationFn: (userId) => friendshipsApi.block(userId),
    onSuccess: () => invalidateFriendships(queryClient),
  });
};

export const useRemoveFriendship = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => friendshipsApi.remove(id),
    onSuccess: () => invalidateFriendships(queryClient),
  });
};

export type { UserDto };
