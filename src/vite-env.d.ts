/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  readonly VITE_PORT?: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT?: string;
  readonly VITE_API_WITH_CREDENTIALS?: string;
  readonly VITE_MAP_PROVIDER: 'leaflet' | 'mapbox';
  readonly VITE_MAP_DEFAULT_LAT?: string;
  readonly VITE_MAP_DEFAULT_LNG?: string;
  readonly VITE_MAP_DEFAULT_ZOOM?: string;
  readonly VITE_MAPBOX_TOKEN?: string;
  readonly VITE_ENABLE_DEVTOOLS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
