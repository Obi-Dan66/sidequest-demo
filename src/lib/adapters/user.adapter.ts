import { type UserDto } from '@/types/dto';
import { type User } from '@/types/user';

/** XP curve fallback when the backend doesn't provide `xpToNextLevel`. */
const xpForLevel = (level: number): number => Math.round(100 * Math.pow(1.35, Math.max(0, level)));

export interface XpToNextLevelHint {
  xpToNextLevel?: number;
}

export const toUser = (dto: UserDto, hint?: XpToNextLevelHint): User => {
  const xpToNextLevel =
    hint?.xpToNextLevel !== undefined && hint.xpToNextLevel > 0
      ? hint.xpToNextLevel
      : xpForLevel(dto.level + 1);

  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    displayName: dto.displayName ?? undefined,
    avatarUrl: dto.avatarUrl ?? undefined,
    bio: dto.bio ?? undefined,
    level: dto.level,
    xp: dto.xp,
    xpToNextLevel,
    title: dto.title ?? undefined,
    joinedAt: dto.createdAt,
    role: dto.role,
    status: dto.status,
    questsDone: dto.questsDone,
    streakDays: dto.streakDays,
  };
};
