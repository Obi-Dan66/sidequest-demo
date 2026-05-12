import { type FriendActivityDto, type UserDto } from '@/types/dto';
import { type ActivityItem, type ActivityKind, type Friend } from '@/types/social';

const activityKindMap: Record<FriendActivityDto['kind'], ActivityKind> = {
  QUEST_COMPLETED: 'completed_quest',
  QUEST_STARTED: 'started_quest',
  ACHIEVEMENT_UNLOCKED: 'unlocked_achievement',
  LEVEL_UP: 'leveled_up',
  PLACE_VISITED: 'visited_place',
};

export const toFriend = (dto: UserDto): Friend => ({
  id: dto.id,
  username: dto.username,
  avatarUrl: dto.avatarUrl ?? undefined,
  level: dto.level,
  xp: dto.xp,
  status: 'offline',
  mutualQuestsCount: 0,
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
