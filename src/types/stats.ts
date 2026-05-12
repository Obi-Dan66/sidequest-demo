export interface UserStats {
  questsCompleted: number;
  placesVisited: number;
  distanceWalkedKm: number;
  achievementsUnlocked: number;
  longestStreakDays: number;
  currentStreakDays: number;
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
