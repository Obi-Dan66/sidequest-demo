import { http } from '@/services/api';
import { type NotificationDto, type UnreadCountDto } from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';

export const notificationsApi = {
  list(query: ListQuery = {}): Promise<PaginatedResponse<NotificationDto>> {
    return http.getPaginated<NotificationDto>('/notifications', { params: query });
  },

  /** FEATURES.md §9. */
  unreadCount(): Promise<UnreadCountDto> {
    return http.get<UnreadCountDto>('/notifications/unread-count');
  },

  markRead(id: string): Promise<void> {
    return http.patchVoid(`/notifications/${id}/read`);
  },

  markAllRead(): Promise<void> {
    return http.patchVoid('/notifications/read-all');
  },
};
