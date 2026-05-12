import { env } from '@/config/env';

export const siteConfig = {
  name: env.appName,
  tagline: 'Discover Prague. Complete quests. Level up.',
  description:
    'SideQuest is a gamified exploration app. Find hidden gems, complete quests, earn XP, and level up your real-world adventures.',
  primaryCity: {
    slug: 'prague',
    name: 'Prague',
    countryCode: 'CZ',
    lat: 50.0875,
    lng: 14.4213,
  },
  links: {
    github: 'https://github.com/sidequest/sidequest',
    docs: '/docs',
  },
} as const;

export type SiteConfig = typeof siteConfig;
