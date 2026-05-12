import { lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MarketingLayout } from '@/layouts/MarketingLayout';
import { ProtectedRoute } from '@/router/ProtectedRoute';
import { ROUTES } from '@/config/routes';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const BusinessPortalPage = lazy(() => import('@/pages/BusinessPortalPage'));
const ExplorePage = lazy(() => import('@/pages/ExplorePage'));
const QuestsPage = lazy(() => import('@/pages/QuestsPage'));
const QuestDetailPage = lazy(() => import('@/pages/QuestDetailPage'));
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage'));
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const FriendsPage = lazy(() => import('@/pages/FriendsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<MarketingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={ROUTES.business} element={<BusinessPortalPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path={ROUTES.explore} element={<ExplorePage />} />
          <Route path={ROUTES.quests} element={<QuestsPage />} />
          <Route path="/quests/:id" element={<QuestDetailPage />} />
          <Route path={ROUTES.achievements} element={<AchievementsPage />} />
          <Route path={ROUTES.leaderboard} element={<LeaderboardPage />} />
          <Route path={ROUTES.friends} element={<FriendsPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.profile} element={<ProfilePage />} />
            <Route path={ROUTES.settings} element={<SettingsPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.auth.login} element={<LoginPage />} />
          <Route path={ROUTES.auth.register} element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};
