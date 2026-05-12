# SideQuest

> A gamified exploration app. Discover Prague, complete quests, earn XP, unlock achievements, and level up your real-world adventures.
>
> Meet **Sir Pip** — the blue knight squire who is both our mascot _and_ our brand mark. He shows up in the logo, the favicon, the auth screens, the 404, and the celebration moments. New poses go in `src/assets/images/` and the `sir-pip.ts` registry.

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

> **Package manager**: this repo uses **yarn** (1.x classic). Don't mix in `npm install` — it would create a competing `package-lock.json` (already in `.gitignore`).

```bash
cp .env.example .env
yarn install
yarn dev
```

The app starts on `http://localhost:5173`.

## Scripts

| Command             | What it does                            |
| ------------------- | --------------------------------------- |
| `yarn dev`          | Start the Vite dev server               |
| `yarn build`        | Typecheck + production build to `dist/` |
| `yarn preview`      | Preview the production build locally    |
| `yarn lint`         | Run ESLint                              |
| `yarn lint:fix`     | Auto-fix ESLint issues                  |
| `yarn format`       | Format source with Prettier             |
| `yarn format:check` | Check formatting (CI-friendly)          |
| `yarn typecheck`    | Run TypeScript in `--noEmit` mode       |

## Git hooks (husky)

A `pre-commit` hook (managed by [husky](https://typicode.github.io/husky)) runs on every `git commit`:

1. `yarn format` — Prettier formats every file in `src/` and root configs.
2. `git add .` — re-stages the now-formatted files so the commit includes them.
3. `yarn lint` — if ESLint reports any **error**, the commit is **blocked**. Warnings still allow the commit.

The hook is installed automatically by `yarn install` (via the `prepare` script). To bypass it intentionally, use `git commit --no-verify` (don't rely on this).

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

## Pages

| Route                 | Layout    | Purpose                                               |
| --------------------- | --------- | ----------------------------------------------------- |
| `/`                   | Marketing | Landing page with hero, features, mascot, CTAs        |
| `/business`           | Marketing | Business portal — partnerships + mock analytics       |
| `/explore`            | Main      | Interactive map with quest pins, filters, nearby list |
| `/quests`             | Main      | Quest list with category filter + search              |
| `/quests/:id`         | Main      | Quest detail: image, steps, reward, participants      |
| `/friends`            | Main      | Friend list, activity feed, invite, shared quests     |
| `/achievements`       | Main      | Trophy showcase + progress + locked tiers             |
| `/leaderboard`        | Main      | Top explorers leaderboard                             |
| `/profile` (auth)     | Main      | Stats cards, achievements, history, friend preview    |
| `/settings` (auth)    | Main      | Theme + app settings                                  |
| `/login`, `/register` | Auth      | Mascot-flanked glass forms (mock-auth flow)           |

## Folder structure

```
src/
├── App.tsx, main.tsx, index.css     # App shell + entry + globals
├── assets/images/                   # Sir Pip — the SideQuest brand mark
│   ├── sir-pip.ts                   #   Registry exporting all pose URLs
│   ├── sir-pip-bust.png             #   Head + shoulders — logo / avatar / favicon
│   ├── sir-pip-hero.png             #   Standing with sword & shield (landing hero)
│   ├── sir-pip-waving.png           #   Greeting (auth, 404, empty states)
│   └── sir-pip-celebrating.png      #   Sword raised + sparkles (level-ups)
├── components/
│   ├── ui/                          # shadcn primitives (Button, Card…)
│   ├── common/                      # Cross-app components (Logo, Mascot, ErrorBoundary…)
│   ├── gamification/                # XPBar, LevelBadge, AchievementBadge, UserStatsCard
│   ├── quests/                      # QuestCard, QuestCardSkeleton, CategoryFilter
│   ├── social/                      # ActivityFeedItem, FriendListItem
│   └── map/                         # MapContainer + MapPin + provider adapters
├── config/                          # env, routes, site metadata
├── features/                        # Feature-scoped api/hooks
│   ├── auth/
│   └── quests/
├── hooks/                           # Reusable hooks (useTheme, useMediaQuery, useAuth)
├── layouts/                         # MainLayout, AuthLayout, MarketingLayout
├── lib/                             # utils, queryClient, categories, mock/
├── pages/                           # Route-level pages (lazy loaded)
├── providers/                       # App/Theme/Query providers
├── router/                          # AppRouter + ProtectedRoute
├── services/
│   ├── api/                         # Axios client + error normalization
│   └── mock/                        # In-memory mock services (delays + fake data)
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
