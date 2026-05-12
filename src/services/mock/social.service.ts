import { fakeDelay } from '@/services/mock/delay';
import { mockActivity, mockFriendInvites, mockFriends } from '@/lib/mock/social.mock';
import { type ActivityItem, type Friend, type FriendInvite } from '@/types/social';

export const mockSocialService = {
  async friends(): Promise<Friend[]> {
    await fakeDelay();
    return mockFriends;
  },
  async activity(): Promise<ActivityItem[]> {
    await fakeDelay();
    return mockActivity;
  },
  async invites(): Promise<FriendInvite[]> {
    await fakeDelay(250);
    return mockFriendInvites;
  },
};
