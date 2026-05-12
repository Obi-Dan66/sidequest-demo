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
  friends: '/friends',
  achievements: '/achievements',
  leaderboard: '/leaderboard',
  settings: '/settings',
  business: '/business',
  auth: {
    login: '/login',
    register: '/register',
  },
  notFound: '*',
} as const;
