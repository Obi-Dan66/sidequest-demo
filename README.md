# SideQuest

> A gamified exploration app. Discover Prague, complete quests, earn XP, unlock achievements, and level up your real-world adventures.

## Tech stack

- **Framework**: React 18 + Vite 6 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 + shadcn/ui components + CSS variables
- **Routing**: React Router 6 (lazy routes)
- **Data**: TanStack Query 5 + Axios (typed API client)
- **State**: Zustand (auth + UI), with persist middleware for auth
- **Maps**: Leaflet + React-Leaflet (Mapbox-ready via provider swap)
- **Motion / Icons**: Framer Motion + Lucide React
- **Toasts**: Sonner
- **Tooling**: ESLint 9 (typescript-eslint) + Prettier 3 + Tailwind plugin

## Getting started

```bash
cp .env.example .env
npm install
npm run dev
```

The app starts on `http://localhost:5173`.

## Scripts

| Command             | What it does                            |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start the Vite dev server               |
| `npm run build`     | Typecheck + production build to `dist/` |
| `npm run preview`   | Preview the production build locally    |
| `npm run lint`      | Run ESLint                              |
| `npm run lint:fix`  | Auto-fix ESLint issues                  |
| `npm run format`    | Format source with Prettier             |
| `npm run typecheck` | Run TypeScript in `--noEmit` mode       |

## Environment variables

All client-exposed vars must be prefixed with `VITE_`. Access them via `@/config/env` — never read `import.meta.env` directly elsewhere.

```env
VITE_API_BASE_URL="http://localhost:8000/api"
VITE_MAP_PROVIDER="leaflet"
VITE_MAP_DEFAULT_LAT=50.0875
VITE_MAP_DEFAULT_LNG=14.4213
VITE_ENABLE_DEVTOOLS=true
```

See [`.env.example`](.env.example) for the full list.

## Folder structure

```
src/
├── App.tsx, main.tsx, index.css     # App shell + entry + globals
├── assets/                          # Images, fonts, static media
├── components/
│   ├── ui/                          # shadcn primitives (Button, Card…)
│   ├── common/                      # Cross-app components (Logo, ErrorBoundary…)
│   ├── gamification/                # XPBar, LevelBadge, AchievementCard
│   └── map/                         # MapContainer + provider adapters
├── config/                          # env, routes, site metadata
├── features/                        # Feature-scoped api/hooks/components
│   ├── auth/
│   └── quests/
├── hooks/                           # Reusable hooks (useTheme, useMediaQuery…)
├── layouts/                         # MainLayout, AuthLayout + nav components
├── lib/                             # utils, queryClient
├── pages/                           # Route-level pages (lazy loaded)
├── providers/                       # App/Theme/Query providers
├── router/                          # AppRouter + ProtectedRoute
├── services/api/                    # Axios client + error normalization
├── store/                           # Zustand stores (auth, ui)
└── types/                           # Shared domain types
```

## Architecture highlights

- **Mobile-first, responsive**: container-based layout, mobile bottom nav + desktop side nav.
- **Theming**: HSL CSS variables, dark/light + system, persisted to `localStorage`.
- **Maps are pluggable**: `MapContainer` is provider-agnostic; today's adapter is Leaflet, swap to Mapbox by adding `providers/MapboxMap.tsx` and switching on `env.map.provider`.
- **Type-safe everywhere**: strict TS, no `as` type assertions, typed API errors via `ApiError`.
- **Resilient**: top-level `ErrorBoundary`, route-level `Suspense`, route-level `ErrorBoundary` inside `MainLayout`.

## Documentation

- [`SKILL.md`](./SKILL.md) — architecture playbook for humans + AI agents working on this codebase.
- [`AGENTS.md`](./AGENTS.md) — guide for specialized agents (UI, maps, gamification, API…).
