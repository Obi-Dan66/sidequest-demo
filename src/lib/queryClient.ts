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
  health: {
    check: ['health', 'check'] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
  quests: {
    all: ['quests'] as const,
    list: (filters?: object) => ['quests', 'list', filters ?? {}] as const,
    detail: (id: string) => ['quests', 'detail', id] as const,
  },
  places: {
    all: ['places'] as const,
    nearby: (lat: number, lng: number, radius: number) =>
      ['places', 'nearby', { lat, lng, radius }] as const,
  },
  achievements: {
    all: ['achievements'] as const,
    user: (userId: string) => ['achievements', 'user', userId] as const,
  },
};
