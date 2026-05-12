import { http } from '@/services/api';
import {
  type CreateFriendshipDto,
  type FriendActivityDto,
  type FriendshipDto,
  type FriendshipStatus,
  type UserDto,
} from '@/types/dto';

export interface FriendshipListQuery {
  status?: FriendshipStatus;
}

export interface FriendActivityQuery {
  limit?: number;
}

export const friendshipsApi = {
  listMine(query: FriendshipListQuery = {}): Promise<FriendshipDto[]> {
    return http.get<FriendshipDto[]>('/friendships', { params: query });
  },

  listFriends(): Promise<UserDto[]> {
    return http.get<UserDto[]>('/friendships/friends');
  },

  listPending(): Promise<FriendshipDto[]> {
    return http.get<FriendshipDto[]>('/friendships/pending');
  },

  activity(query: FriendActivityQuery = {}): Promise<FriendActivityDto[]> {
    return http.get<FriendActivityDto[]>('/friendships/activity', { params: query });
  },

  request(payload: CreateFriendshipDto): Promise<FriendshipDto> {
    return http.post<FriendshipDto, CreateFriendshipDto>('/friendships', payload);
  },

  accept(id: string): Promise<FriendshipDto> {
    return http.post<FriendshipDto>(`/friendships/${id}/accept`);
  },

  block(userId: string): Promise<FriendshipDto> {
    return http.post<FriendshipDto>(`/friendships/block/${userId}`);
  },

  remove(id: string): Promise<void> {
    return http.deleteVoid(`/friendships/${id}`);
  },
};
