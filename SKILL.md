# SideQuest — Frontend Skill Guide

This document is the source of truth for **how we build features** in the SideQuest frontend. It is written for both humans and AI coding agents. Keep it short, opinionated, and current.

> Golden rule: optimize for **developer speed + clarity**. Avoid clever abstractions. Push complexity to the edges where it earns its keep.

---

## 1. Frontend Architecture

```
        ┌──────────────────────────────────────────────┐
        │                    Pages                     │  ← route-level
        └───────────────▲────────────────▲─────────────┘
                        │                │
        ┌───────────────┴────┐    ┌──────┴──────────────┐
        │      Features      │    │       Layouts       │
        │ (auth, quests, …)  │    │ Main / Auth + nav   │
        └─────────▲──────────┘    └──────▲──────────────┘
                  │                      │
        ┌─────────┴────────┐   ┌─────────┴──────────────┐
        │   Components     │   │   Hooks / Providers    │
        │  ui • common •   │   │  useTheme • useAuth •  │
        │  gamification •  │   │  AppProviders          │
        │  map             │   └────────────────────────┘
        └─────────▲────────┘
                  │
        ┌─────────┴────────────────────────────────────┐
        │  lib • services/api • store • config • types │
        └──────────────────────────────────────────────┘
```

Rules of thumb:

- **Pages** are thin. They compose features and layout. No business logic.
- **Features** own their API calls, hooks, and feature-specific components.
- **Components** are presentation-only. They never call APIs directly.
- **Services / lib / config / types** must never import from `pages`, `features`, or `layouts`.

A new feature gets its own folder under `src/features/<name>/` with this skeleton:

```
features/<name>/
├── api/<name>.api.ts     # Axios calls, return typed payloads
├── hooks/use<Thing>.ts   # TanStack Query wrappers
├── components/           # Feature-specific UI (optional)
└── types/                # Local types (optional)
```

---

## 2. State Management

| Concern                                       | Tool                                                    | Where it lives                          |
| --------------------------------------------- | ------------------------------------------------------- | --------------------------------------- |
| Server state (caching, refetching, mutations) | **TanStack Query**                                      | `src/lib/queryClient.ts`, feature hooks |
| Client state (auth session, UI flags)         | **Zustand**                                             | `src/store/*.store.ts`                  |
| Form state                                    | **Local `useState`** (consider `react-hook-form` later) | Per-component                           |
| Theme                                         | **React Context** via `ThemeProvider`                   | `src/providers/ThemeProvider.tsx`       |

Conventions:

- Auth lives in `useAuthStore` and is persisted to `localStorage` under `sq.auth`.
- Use selectors: `useAuthStore((s) => s.user)` — never destructure the whole store.
- Query keys live in `queryKeys` (`src/lib/queryClient.ts`). Always reuse them.
- Default query config: `staleTime: 60s`, `gcTime: 5min`, `refetchOnWindowFocus: false`.

---

## 3. API Patterns

- All HTTP goes through the singleton `api` from `@/services/api/client`.
- Auth token is auto-attached via a request interceptor from `useAuthStore`.
- All errors are normalized to `ApiError` (`src/services/api/errors.ts`) which has `status`, `code`, `message`, `details`.
- A 401 response clears the auth store automatically.

Feature API module pattern (`features/<name>/api/<name>.api.ts`):

```ts
import { api } from '@/services/api/client';
import { type Quest } from '@/types/quest';

export const questsApi = {
  async list(): Promise<Quest[]> {
    const response = await api.get<Quest[]>('/quests');
    return response.data;
  },
};
```

Feature hook pattern (`features/<name>/hooks/useQuests.ts`):

```ts
import { useQuery } from '@tanstack/react-query';
import { questsApi } from '@/features/quests/api/quests.api';
import { queryKeys } from '@/lib/queryClient';

export const useQuests = () =>
  useQuery({ queryKey: queryKeys.quests.all, queryFn: () => questsApi.list() });
```

Always:

- Use **async/await**, never `.then()`.
- Avoid `as` type assertions — narrow with type guards instead.
- Never call `api.*` from a component. Always go through a feature hook.

---

## 4. Component Patterns

- **shadcn/ui primitives** live in `src/components/ui/*` — modify them only when you really need to change the primitive itself.
- **Shared composition** lives in `src/components/common/*` (`Logo`, `ThemeToggle`, `ErrorBoundary`, `PageLoader`, `LoadingSpinner`).
- **Gamification widgets** live in `src/components/gamification/*` (`XPBar`, `LevelBadge`, `AchievementCard`).
- **Map** lives in `src/components/map/*` with provider adapters under `providers/`.

Component rules:

- Functional components only.
- Co-locate `Props` interface above the component.
- Forward refs for low-level primitives.
- Variants via `cva` + `cn` helper.
- No prop drilling deeper than 2 levels — lift to a store or use composition.

---

## 5. Styling Conventions

- **Tailwind first.** Hand-written CSS only when truly needed (animations, vendor overrides).
- **Design tokens are CSS variables** in `src/index.css` (`--primary`, `--xp`, `--legendary`, etc.). Tailwind reads them via `tailwind.config.ts`. To change brand colors, edit the variables — not Tailwind classes.
- **Dark mode** uses Tailwind's `class` strategy. The `ThemeProvider` toggles `.dark` on `<html>`.
- **Spacing scale**: rely on Tailwind defaults (`gap-2`, `gap-4`, `p-5`). Avoid arbitrary `[12px]` values unless necessary.
- **Rounded corners** default to `rounded-2xl` for cards, `rounded-lg` for inputs/buttons.
- **Typography**: `font-display` for headings (Space Grotesk), `font-sans` for body (Inter).
- **Gamified accents**: use the `gradient-primary`, `gradient-xp`, `text-gradient`, and `shimmer` utility classes from `index.css`.

---

## 6. Routing Conventions

- All paths are defined once in `src/config/routes.ts`. Never hardcode strings.
- Pages live in `src/pages/` and use **default exports** so they can be code-split with `React.lazy()`.
- Authenticated routes are wrapped in `<ProtectedRoute />` which redirects to `/login` and preserves the original location in `state.from`.
- `MainLayout` provides `<TopBar />`, optional `<SideNav />` (desktop), and `<BottomNav />` (mobile).
- `AuthLayout` is used for sign-in / register screens.

To add a new page:

1. Add the path to `ROUTES` in `src/config/routes.ts`.
2. Create `src/pages/MyPage.tsx` with `export default MyPage`.
3. Add a lazy import and `<Route>` entry in `src/router/index.tsx`.

---

## 7. Map Architecture

```
components/map/
├── MapContainer.tsx           # Public, provider-agnostic API
└── providers/
    └── LeafletMap.tsx         # Today's adapter
    └── MapboxMap.tsx          # (future) — toggle via env.map.provider
```

- `MapContainer` accepts `center`, `zoom`, `markers`, and `onMarkerClick`. It Suspense-loads the active provider so Leaflet/Mapbox bundles never ship on routes that don't use the map.
- All map config (default center, zoom, provider, Mapbox token) comes from `env.map.*`.
- Never import Leaflet directly outside of `components/map/providers/`. Pages use `MapContainer` only.

---

## 8. Scalability Principles

1. **Feature-first folders.** Anything beyond a single screen graduates into `features/<name>/`.
2. **Boring abstractions.** Prefer a small repeated pattern (API module + hook + types) over a single mega-abstraction.
3. **Type the boundaries.** Domain types live in `src/types/`. API responses are typed at the `api.*` call site, never inside components.
4. **Lazy by default.** All pages are `React.lazy`. Heavy providers (Leaflet) are split.
5. **No global mutation across features.** Cross-feature communication goes through Zustand stores or query invalidation.
6. **No top-level side effects** in modules — all init happens inside providers or hooks.
7. **One source of truth per concept**: routes (`config/routes.ts`), env (`config/env.ts`), query keys (`lib/queryClient.ts`).
8. **Reject silent failures.** Always render an error state — `ErrorBoundary` + toast via Sonner.

---

## 9. Conventions cheat sheet

- ✅ `async / await` everywhere.
- ❌ No `as` type assertions. Use `unknown` + type guards.
- ✅ Import from absolute paths: `@/components/...`.
- ✅ Use `cn(...)` for class merging.
- ✅ Strong types over loose `any` / wildcard `Record<string, unknown>`.
- ✅ Domain language in code: `quest`, `xp`, `achievement`, `place` — not `item`, `data`.
- ❌ No business logic in `pages/*`. Lift into `features/*/hooks`.
