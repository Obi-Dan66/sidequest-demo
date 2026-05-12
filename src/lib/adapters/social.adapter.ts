import {
  type FriendActivityDto,
  type FriendPresenceStatus,
  type FriendSummaryDto,
  type PendingFriendshipDto,
} from '@/types/dto';
import {
  type ActivityItem,
  type ActivityKind,
  type Friend,
  type FriendInvite,
  type FriendStatus,
} from '@/types/social';

const activityKindMap: Record<FriendActivityDto['kind'], ActivityKind> = {
  QUEST_COMPLETED: 'completed_quest',
  QUEST_STARTED: 'started_quest',
  ACHIEVEMENT_UNLOCKED: 'unlocked_achievement',
  LEVEL_UP: 'leveled_up',
  PLACE_VISITED: 'visited_place',
};

const presenceMap: Record<FriendPresenceStatus, FriendStatus> = {
  ONLINE: 'online',
  QUESTING: 'questing',
  OFFLINE: 'offline',
};

export const toFriend = (dto: FriendSummaryDto): Friend => ({
  id: dto.id,
  username: dto.username,
  avatarUrl: dto.avatarUrl ?? undefined,
  level: dto.level,
  xp: dto.xp,
  status: presenceMap[dto.status] ?? 'offline',
  currentQuestTitle: dto.currentQuest?.title ?? undefined,
  lastSeen: dto.lastSeenAt ?? undefined,
  mutualQuestsCount: dto.mutualQuestsCount ?? 0,
});

export const toFriendInvite = (dto: PendingFriendshipDto): FriendInvite => ({
  id: dto.id,
  fromUsername: dto.requester.username,
  fromAvatarUrl: dto.requester.avatarUrl ?? undefined,
  level: dto.requester.level,
  createdAt: dto.createdAt,
});

const activityTitle = (dto: FriendActivityDto): string => {
  switch (dto.kind) {
    case 'QUEST_COMPLETED':
      return dto.questTitle ?? 'Completed a quest';
    case 'QUEST_STARTED':
      return dto.questTitle ?? 'Started a quest';
    case 'ACHIEVEMENT_UNLOCKED':
      return dto.achievementTitle ?? 'Unlocked an achievement';
    case 'LEVEL_UP':
      return `Reached level ${dto.user.level}`;
    case 'PLACE_VISITED':
      return dto.placeName ?? 'Visited a place';
  }
};

export const toActivityItem = (dto: FriendActivityDto): ActivityItem => ({
  id: dto.id,
  kind: activityKindMap[dto.kind],
  actor: {
    id: dto.user.id,
    username: dto.user.username,
    avatarUrl: dto.user.avatarUrl ?? undefined,
    level: dto.user.level,
  },
  title: activityTitle(dto),
  subtitle: dto.placeName ?? undefined,
  xpEarned: dto.xpEarned ?? undefined,
  createdAt: dto.createdAt,
  meta: {
    questId: dto.questId ?? undefined,
    achievementId: dto.achievementId ?? undefined,
    placeName: dto.placeName ?? undefined,
  },
});
