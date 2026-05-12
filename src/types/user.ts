export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  title?: string;
  joinedAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface AuthUser extends User {
  session: AuthSession;
}
