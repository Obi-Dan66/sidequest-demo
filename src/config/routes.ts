/**
 * Single source of truth for route paths.
 * Use these constants throughout the app instead of hardcoded strings.
 */
export const ROUTES = {
  root: '/',
  home: '/',
  explore: '/explore',
  quests: '/quests',
  questDetail: (id: string | ':id' = ':id') => `/quests/${id}`,
  profile: '/profile',
  achievements: '/achievements',
  leaderboard: '/leaderboard',
  settings: '/settings',
  auth: {
    login: '/login',
    register: '/register',
  },
  notFound: '*',
} as const;
