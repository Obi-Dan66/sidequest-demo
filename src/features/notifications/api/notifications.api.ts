import { http } from '@/services/api';
import { type NotificationDto } from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';

export const notificationsApi = {
  list(query: ListQuery = {}): Promise<PaginatedResponse<NotificationDto>> {
    return http.getPaginated<NotificationDto>('/notifications', { params: query });
  },

  markRead(id: string): Promise<void> {
    return http.patchVoid(`/notifications/${id}/read`);
  },

  markAllRead(): Promise<void> {
    return http.patchVoid('/notifications/read-all');
  },
};
