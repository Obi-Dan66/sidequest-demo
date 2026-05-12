import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '@/features/notifications/api/notifications.api';
import { queryKeys } from '@/lib/queryClient';
import { type NotificationDto } from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';
import { type ApiError } from '@/services/api/errors';

export const useNotifications = (query: ListQuery = {}) =>
  useQuery<PaginatedResponse<NotificationDto>, ApiError>({
    queryKey: queryKeys.notifications.list(query),
    queryFn: () => notificationsApi.list(query),
  });

export const useUnreadNotificationCount = (query: ListQuery = {}): number => {
  const { data } = useNotifications(query);
  return (data?.data ?? []).filter((notification) => notification.readAt === null).length;
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => notificationsApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, void>({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
