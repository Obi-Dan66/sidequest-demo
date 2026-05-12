import { fakeDelay } from '@/services/mock/delay';
import { mockCurrentUser, mockQuestHistory, mockUserStats } from '@/lib/mock/users.mock';
import { mockAchievements } from '@/lib/mock/achievements.mock';
import { type Achievement } from '@/types/achievement';
import { type User } from '@/types/user';
import { type QuestHistoryItem, type UserStats } from '@/types/stats';

export const mockUsersService = {
  async me(): Promise<User> {
    await fakeDelay(200);
    return mockCurrentUser;
  },
  async stats(): Promise<UserStats> {
    await fakeDelay(200);
    return mockUserStats;
  },
  async history(): Promise<QuestHistoryItem[]> {
    await fakeDelay(250);
    return mockQuestHistory;
  },
  async achievements(): Promise<Achievement[]> {
    await fakeDelay(250);
    return mockAchievements;
  },
};
