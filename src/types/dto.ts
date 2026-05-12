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
  createdAt: string;
  updatedAt: string;
}

export interface UserStatsDto {
  xp: number;
  level: number;
  questsDone: number;
  streakDays: number;
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
}

export interface QuestCategoryDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  coverImageUrl?: string | null;
  colorHex?: string | null;
}

export type AchievementType =
  | 'QUEST_COUNT'
  | 'XP_TOTAL'
  | 'PLACES_VISITED'
  | 'STREAK_DAYS'
  | 'SPECIAL';

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
