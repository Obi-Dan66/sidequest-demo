export type FriendStatus = 'online' | 'questing' | 'offline';

export interface Friend {
  id: string;
  username: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  status: FriendStatus;
  currentQuestTitle?: string;
  lastSeen?: string;
  mutualQuestsCount: number;
}

export type ActivityKind =
  | 'completed_quest'
  | 'unlocked_achievement'
  | 'leveled_up'
  | 'started_quest'
  | 'visited_place';

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  actor: {
    id: string;
    username: string;
    avatarUrl?: string;
    level: number;
  };
  title: string;
  subtitle?: string;
  xpEarned?: number;
  createdAt: string;
  meta?: {
    questId?: string;
    achievementId?: string;
    placeName?: string;
  };
}

export interface FriendInvite {
  id: string;
  fromUsername: string;
  fromAvatarUrl?: string;
  level: number;
  createdAt: string;
}
