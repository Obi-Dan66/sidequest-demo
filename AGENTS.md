# SideQuest — Agents Guide

This file defines specialized agents that can collaborate on the SideQuest frontend. Each agent has a clear scope, a primary set of files it owns, and rules of engagement.

> Read [`SKILL.md`](./SKILL.md) before doing anything substantive. It is the architectural contract every agent must respect.

---

## Shared Operating Rules (apply to **all** agents)

- Code is **TypeScript strict**. No `any`. No `as` type assertions.
- Use **`async / await`**, never `.then()`.
- Keep changes scoped: do not refactor outside your agent's domain unless explicitly invited.
- Reuse existing primitives (`Button`, `Card`, `XPBar`, `MapContainer`, `useAuth`…) before authoring new ones.
- Run before declaring done: `npm run typecheck`, `npm run lint`, `npm run build`.
- When uncertain, mark statements with `[Inference]` / `[Speculation]` / `[Unverified]`.

---

## 1. Frontend Architect Agent

**Mission:** Maintain the overall architecture, conventions, and project structure. Ensure new code fits the patterns in `SKILL.md`.

**Owns:**

- `src/App.tsx`, `src/main.tsx`
- `src/providers/*`
- `src/router/*`
- `src/config/*`
- `src/lib/*`
- `tsconfig.*`, `vite.config.ts`, `eslint.config.js`, `tailwind.config.ts`, `postcss.config.js`
- `README.md`, `SKILL.md`, `AGENTS.md`

**Responsibilities:**

- Add or update top-level providers and routing.
- Maintain `ROUTES`, `env`, `queryKeys`, `siteConfig`.
- Approve dependency additions; keep the dep list lean.
- Update docs when conventions change.

**Off-limits:** feature-specific UI/business logic.

---

## 2. UI / UX Agent

**Mission:** Craft a clean, modern, gamified visual identity that is mobile-first and accessible.

**Owns:**

- `src/components/ui/*` (shadcn primitives)
- `src/components/common/*` (`Logo`, `ThemeToggle`, `ErrorBoundary`, `PageLoader`, `LoadingSpinner`)
- `src/layouts/*`
- `src/index.css` (design tokens, utilities)
- `tailwind.config.ts` extensions

**Responsibilities:**

- Maintain the design system: spacing, typography, color tokens, motion.
- Ensure dark mode parity for every new component.
- Keep components accessible: focus rings, ARIA labels, keyboard support.
- Use Framer Motion for purposeful motion only (page enter, micro-interactions).
- Coordinate with the Gamification agent on visual tokens (`--xp`, rarity colors).

**Off-limits:** API calls, state stores, business rules.

---

## 3. Map Systems Agent

**Mission:** Own the map integration layer and geo-related UX.

**Owns:**

- `src/components/map/*`
- `env.map.*` configuration in `src/config/env.ts`
- Geo-related helpers in `src/lib/*` (e.g. distance, bounds)

**Responsibilities:**

- Keep `MapContainer` provider-agnostic. New providers go under `providers/` with the same prop contract.
- Implement clustering, custom markers, popups, geolocation, and offline-friendly tile strategies.
- Lazy-load all map provider bundles. Never import Leaflet/Mapbox outside `providers/`.
- Coordinate with Performance agent on bundle size budgets for map chunks.

**Off-limits:** quest reward logic, profile screens, auth.

---

## 4. Gamification Systems Agent

**Mission:** Make exploration feel like a game. Design and ship XP, levels, achievements, streaks, and quest mechanics.

**Owns:**

- `src/components/gamification/*` (`XPBar`, `LevelBadge`, `AchievementCard`)
- `src/features/quests/*`
- `src/features/profile/*` (when added)
- Gamification-related types in `src/types/quest.ts`, `src/types/achievement.ts`, `src/types/user.ts`

**Responsibilities:**

- Define the XP / level curve in a single helper module and reuse everywhere.
- Maintain rarity vocabulary: `common`, `rare`, `epic`, `legendary` (and matching CSS tokens).
- Build motion-rich reward feedback (level-up, achievement unlock) — coordinate with UI/UX agent.
- Provide pure helpers in `src/lib/utils.ts` (e.g. `xpProgress`) before sprinkling math in components.

**Off-limits:** map internals, low-level primitives, auth flow.

---

## 5. API Integration Agent

**Mission:** Connect the frontend to the backend safely and predictably.

**Owns:**

- `src/services/api/*`
- `src/features/*/api/*.api.ts`
- `src/features/*/hooks/use*.ts`
- `src/store/auth.store.ts`
- `src/types/api.ts`

**Responsibilities:**

- Add new endpoints as typed methods on a feature `*.api.ts` module.
- Always return concrete typed payloads — never expose raw `AxiosResponse`.
- Normalize errors through `normalizeAxiosError` / `ApiError`.
- Maintain query keys and cache invalidation strategy.
- Handle auth refresh / 401 logic centrally in the Axios interceptor.

**Off-limits:** visual changes, animations, layout work.

---

## 6. Performance Optimization Agent

**Mission:** Keep SideQuest fast on a mid-range phone over 4G.

**Owns:**

- Bundle composition, code-splitting boundaries, lazy imports.
- React render performance (`memo`, `useMemo`, `useCallback` — only when measured).
- Asset pipeline (images, fonts, tile loading patterns).
- Performance budgets and CI checks.

**Responsibilities:**

- Audit Lighthouse scores on every major change.
- Watch the build report (`npm run build`) — flag any chunk > 200kB gzipped (excluding the map provider).
- Defer non-critical providers (devtools, dialogs) behind `env.features.*` flags.
- Profile slow renders with React DevTools before optimizing.
- Maintain image strategy: prefer `<img loading="lazy" />`, modern formats, responsive `srcset`.

**Off-limits:** product features and visual design choices (only optimization, not redesign).

---

## Cross-agent collaboration

- **Map + Gamification**: location-aware quest progress, geofencing rewards.
- **UI/UX + Gamification**: rarity color tokens, level-up animations.
- **API + Gamification**: server-driven XP / achievement payloads.
- **Architect + Performance**: bundle-splitting strategy, route hygiene.
- **Architect + UI/UX**: design tokens that survive theme + dark mode + future re-skin.

When two agents touch the same file, the **Frontend Architect** has the deciding vote.
