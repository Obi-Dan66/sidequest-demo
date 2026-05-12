import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  users: {
    list: (query?: object) => ['users', 'list', query ?? {}] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
    myStats: ['users', 'me', 'stats'] as const,
    stats: (id: string) => ['users', id, 'stats'] as const,
    myHistory: (query?: object) => ['users', 'me', 'history', query ?? {}] as const,
    history: (id: string, query?: object) => ['users', id, 'history', query ?? {}] as const,
  },
  quests: {
    all: ['quests'] as const,
    list: (query?: object) => ['quests', 'list', query ?? {}] as const,
    nearby: (query?: object) => ['quests', 'nearby', query ?? {}] as const,
    detail: (id: string) => ['quests', 'detail', id] as const,
  },
  questCategories: {
    list: ['quest-categories', 'list'] as const,
    detail: (slug: string) => ['quest-categories', 'detail', slug] as const,
  },
  achievements: {
    all: ['achievements', 'all'] as const,
    mine: ['achievements', 'mine'] as const,
  },
  map: {
    pins: (query?: object) => ['map', 'pins', query ?? {}] as const,
  },
  friendships: {
    mine: (query?: object) => ['friendships', 'mine', query ?? {}] as const,
    friends: ['friendships', 'friends'] as const,
    pending: ['friendships', 'pending'] as const,
    activity: (query?: object) => ['friendships', 'activity', query ?? {}] as const,
  },
  businesses: {
    list: (query?: object) => ['businesses', 'list', query ?? {}] as const,
    detail: (id: string) => ['businesses', 'detail', id] as const,
  },
  notifications: {
    list: (query?: object) => ['notifications', 'list', query ?? {}] as const,
    unreadCount: ['notifications', 'unread-count'] as const,
  },
  leaderboard: {
    list: (query?: object) => ['leaderboard', 'list', query ?? {}] as const,
  },
  stats: {
    public: ['stats', 'public'] as const,
  },
  businessMetrics: {
    me: ['businesses', 'me'] as const,
    metrics: (query?: object) => ['businesses', 'me', 'metrics', query ?? {}] as const,
    topQuests: (query?: object) => ['businesses', 'me', 'top-quests', query ?? {}] as const,
  },
};
