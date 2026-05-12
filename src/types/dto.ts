/**
 * Backend DTOs — mirror `openapi.yaml` exactly (uppercase enums, nullable
 * strings as `string | null`). Keep this file the single source of truth
 * for backend shapes; UI-friendly types live in their own `types/*.ts`
 * files and are produced via adapters in `src/lib/adapters/*`.
 */

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN' | 'BUSINESS_OWNER';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export type QuestDifficultyDto = 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC';
export type QuestStatusDto = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type BusinessStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'BLOCKED';

export interface UserDto {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  role: UserRole;
  status: UserStatus;
  xp: number;
  level: number;
  questsDone: number;
  streakDays: number;
  /** Computed flavour rank (FEATURES.md §15). */
  title?: string | null;
  /** Personal referral link (FEATURES.md §13). */
  inviteLink?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantSummaryDto {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  level: number;
}

export interface UserStatsDto {
  xp: number;
  level: number;
  questsDone: number;
  streakDays: number;
  /** All fields below are optional in v1; planned in FEATURES.md §1. */
  achievementsUnlocked?: number;
  placesVisited?: number;
  distanceWalkedKm?: number;
  longestStreakDays?: number;
  xpToNextLevel?: number;
}

export interface QuestLocationDto {
  id: string;
  name: string | null;
  address: string | null;
  latitude: number;
  longitude: number;
  radiusM: number;
  orderIndex: number;
  distanceM?: number;
}

export interface QuestDto {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string;
  difficulty: QuestDifficultyDto;
  status: QuestStatusDto;
  xpReward: number;
  estimatedDurationMin: number | null;
  imageUrl: string | null;
  coverImageUrl: string | null;
  categoryId: string | null;
  businessId: string | null;
  authorId: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  locations?: QuestLocationDto[];
  distanceM?: number;
  /** FEATURES.md §3 — enrichment. Fields below are optional in v1. */
  tags?: string[];
  rating?: number | null;
  ratingCount?: number;
  participantCount?: number;
  participants?: ParticipantSummaryDto[];
  category?: QuestCategoryDto | null;
  rewards?: {
    xp: number;
    achievements: AchievementSummaryDto[];
  };
}

export interface AchievementSummaryDto {
  id: string;
  slug: string;
  name: string;
  iconUrl?: string | null;
  xpBonus: number;
}

export interface QuestCategoryDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  coverImageUrl?: string | null;
  colorHex?: string | null;
  /** FEATURES.md §16. */
  questCount?: number;
}

export type AchievementType =
  | 'QUEST_COUNT'
  | 'XP_TOTAL'
  | 'PLACES_VISITED'
  | 'STREAK_DAYS'
  | 'SPECIAL';

/** FEATURES.md §2 — `GET /users/me/quests/history`. Planned. */
export type UserQuestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

export interface QuestHistoryItemDto {
  id: string;
  questId: string;
  quest: {
    id: string;
    slug: string;
    title: string;
    coverImageUrl: string | null;
  };
  status: UserQuestStatus;
  startedAt: string;
  completedAt: string | null;
  xpEarned: number;
  durationMinutes: number | null;
}

/** FEATURES.md §6 — `GET /friendships/pending`. */
export interface PendingFriendshipDto {
  id: string;
  requester: ParticipantSummaryDto;
  createdAt: string;
}

/** FEATURES.md §7 — `GET /friendships/friends`. */
export type FriendPresenceStatus = 'ONLINE' | 'QUESTING' | 'OFFLINE';

export interface FriendSummaryDto {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  level: number;
  xp: number;
  status: FriendPresenceStatus;
  currentQuest: { id: string; title: string } | null;
  lastSeenAt: string | null;
  mutualQuestsCount: number;
}

/** FEATURES.md §10. */
export type LeaderboardScope = 'GLOBAL' | 'CITY';
export type LeaderboardPeriod = 'ALL_TIME' | 'MONTH' | 'WEEK';

export interface LeaderboardEntryDto {
  rank: number;
  user: ParticipantSummaryDto;
  xp: number;
  questsDone: number;
  isMe: boolean;
}

export interface LeaderboardResponseDto {
  entries: LeaderboardEntryDto[];
  myEntry: LeaderboardEntryDto | null;
}

/** FEATURES.md §11. */
export interface PublicStatsDto {
  totalExplorers: number;
  totalQuests: number;
  totalQuestCompletions: number;
  totalDistanceKm: number;
  cities: Array<{ slug: string; name: string; explorers: number }>;
  featuredQuest: QuestDto | null;
}

/** FEATURES.md §12. */
export type BusinessMetricsPeriod = 'MONTH' | '7D' | '30D' | '90D';

export interface BusinessMetricsDto {
  period: BusinessMetricsPeriod;
  monthlyVisits: { value: number; deltaPct: number };
  questCompletions: { value: number; deltaPct: number };
  avgRating: { value: number; deltaAbs: number };
  repeatVisitors: { value: number; deltaPct: number };
}

export interface BusinessTopQuestDto {
  id: string;
  title: string;
  visits: number;
  completions: number;
  conversion: number;
  rating: number | null;
  ratingCount: number;
}

export interface UnreadCountDto {
  count: number;
}

export interface AchievementDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconUrl?: string | null;
  type: AchievementType;
  xpBonus: number;
  createdAt: string;
  updatedAt: string;
  /** Present only when returned from /achievements/me */
  unlockedAt?: string | null;
  progress?: { current: number; target: number } | null;
}

export interface FriendshipDto {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export type FriendActivityKind =
  | 'QUEST_COMPLETED'
  | 'QUEST_STARTED'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'LEVEL_UP'
  | 'PLACE_VISITED';

export interface FriendActivityDto {
  id: string;
  kind: FriendActivityKind;
  userId: string;
  user: Pick<UserDto, 'id' | 'username' | 'displayName' | 'avatarUrl' | 'level'>;
  questId?: string | null;
  questTitle?: string | null;
  achievementId?: string | null;
  achievementTitle?: string | null;
  placeName?: string | null;
  xpEarned?: number | null;
  createdAt: string;
}

export interface MapPinDto {
  id: string;
  kind: 'QUEST' | 'BUSINESS';
  latitude: number;
  longitude: number;
  title: string;
  difficulty?: QuestDifficultyDto;
  categorySlug?: string | null;
  questId?: string | null;
  businessId?: string | null;
}

export interface BusinessDto {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
  status: BusinessStatus;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  ownerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationDto {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
}

export interface UploadDto {
  url: string;
  key?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  sizeBytes?: number;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}

/** Flat response shape returned by /auth/register, /auth/login, /auth/refresh. */
export interface AuthSessionDto extends AuthTokensDto {
  user: UserDto;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface UpdateUserDto {
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface CreateFriendshipDto {
  addresseeId: string;
}

export interface CreateQuestLocationDto {
  name?: string;
  address?: string;
  latitude: number;
  longitude: number;
  radiusM?: number;
  orderIndex?: number;
}

export interface CreateQuestDto {
  slug: string;
  title: string;
  summary?: string;
  description: string;
  difficulty?: QuestDifficultyDto;
  xpReward?: number;
  estimatedDurationMin?: number;
  categoryId?: string;
  businessId?: string;
  imageUrl?: string;
  coverImageUrl?: string;
  locations: CreateQuestLocationDto[];
}

export interface UpdateQuestDto {
  title?: string;
  summary?: string;
  description?: string;
  difficulty?: QuestDifficultyDto;
  status?: QuestStatusDto;
  xpReward?: number;
  estimatedDurationMin?: number;
  categoryId?: string;
  imageUrl?: string;
  coverImageUrl?: string;
  startsAt?: string;
  endsAt?: string;
}

export interface CreateBusinessDto {
  slug: string;
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}
