import { http } from '@/services/api';
import {
  type CreateFriendshipDto,
  type FriendActivityDto,
  type FriendSummaryDto,
  type FriendshipDto,
  type FriendshipStatus,
  type PendingFriendshipDto,
} from '@/types/dto';

export interface FriendshipListQuery {
  status?: FriendshipStatus;
}

export interface FriendActivityQuery {
  limit?: number;
  cursor?: string;
}

export const friendshipsApi = {
  listMine(query: FriendshipListQuery = {}): Promise<FriendshipDto[]> {
    return http.get<FriendshipDto[]>('/friendships', { params: query });
  },

  /** Returns enriched friend summaries (FEATURES.md §7). */
  listFriends(): Promise<FriendSummaryDto[]> {
    return http.get<FriendSummaryDto[]>('/friendships/friends');
  },

  /** Returns pending friend requests with the requester user resolved (FEATURES.md §6). */
  listPending(): Promise<PendingFriendshipDto[]> {
    return http.get<PendingFriendshipDto[]>('/friendships/pending');
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

  /** No "decline" endpoint exists today — decline is implemented as DELETE. */
  decline(id: string): Promise<void> {
    return http.deleteVoid(`/friendships/${id}`);
  },

  block(userId: string): Promise<FriendshipDto> {
    return http.post<FriendshipDto>(`/friendships/block/${userId}`);
  },

  remove(id: string): Promise<void> {
    return http.deleteVoid(`/friendships/${id}`);
  },
};
