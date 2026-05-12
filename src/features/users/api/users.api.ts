import { http } from '@/services/api';
import { type UpdateUserDto, type UploadDto, type UserDto, type UserStatsDto } from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';

export interface UserListQuery extends ListQuery {
  /** Free-text search query */
  search?: string;
}

export const usersApi = {
  me(): Promise<UserDto> {
    return http.get<UserDto>('/users/me');
  },

  updateMe(payload: UpdateUserDto): Promise<UserDto> {
    return http.patch<UserDto, UpdateUserDto>('/users/me', payload);
  },

  myStats(): Promise<UserStatsDto> {
    return http.get<UserStatsDto>('/users/me/stats');
  },

  uploadMyAvatar(file: File): Promise<UploadDto> {
    const form = new FormData();
    form.append('file', file);
    return http.post<UploadDto, FormData>('/users/me/avatar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  list(query: UserListQuery = {}): Promise<PaginatedResponse<UserDto>> {
    return http.getPaginated<UserDto>('/users', { params: query });
  },

  getById(id: string): Promise<UserDto> {
    return http.get<UserDto>(`/users/${id}`);
  },

  getStats(id: string): Promise<UserStatsDto> {
    return http.get<UserStatsDto>(`/users/${id}/stats`);
  },
};
