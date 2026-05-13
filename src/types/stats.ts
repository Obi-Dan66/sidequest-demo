/** Mapped from `UserStatsDto`. Omitted backend fields stay `undefined` so the UI shows "—" or derives from live endpoints (see Profile). */
export interface UserStats {
  questsCompleted: number;
  currentStreakDays: number;
  placesVisited?: number;
  distanceWalkedKm?: number;
  achievementsUnlocked?: number;
  longestStreakDays?: number;
  xpToNextLevel?: number;
}

export interface QuestHistoryItem {
  id: string;
  questId: string;
  questTitle: string;
  completedAt: string;
  xpEarned: number;
  durationMinutes: number;
}
