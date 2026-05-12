/**
 * Strongly-typed env access. Centralizes all runtime env reads so we never
 * sprinkle `import.meta.env.X` calls across the codebase.
 */

const toNumber = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
};

export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? 'SideQuest',
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
    timeoutMs: toNumber(import.meta.env.VITE_API_TIMEOUT, 15_000),
  },

  map: {
    provider: import.meta.env.VITE_MAP_PROVIDER ?? 'leaflet',
    defaultLat: toNumber(import.meta.env.VITE_MAP_DEFAULT_LAT, 50.0875),
    defaultLng: toNumber(import.meta.env.VITE_MAP_DEFAULT_LNG, 14.4213),
    defaultZoom: toNumber(import.meta.env.VITE_MAP_DEFAULT_ZOOM, 13),
    mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN ?? '',
  },

  features: {
    devtools: toBoolean(import.meta.env.VITE_ENABLE_DEVTOOLS, import.meta.env.DEV),
  },
} as const;

export type AppEnv = typeof env;
