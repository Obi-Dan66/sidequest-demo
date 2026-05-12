import { type UserRole, type UserStatus } from '@/types/dto';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  level: number;
  xp: number;
  /** XP threshold for next level. Computed client-side if backend doesn't provide it. */
  xpToNextLevel: number;
  title?: string;
  /** ISO timestamp. */
  joinedAt: string;
  /** Backend authorization context. */
  role: UserRole;
  status: UserStatus;
  questsDone: number;
  streakDays: number;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface AuthUser extends User {
  session: AuthSession;
}
