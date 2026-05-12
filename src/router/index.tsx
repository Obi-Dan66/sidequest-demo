import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/router/ProtectedRoute';
import { ROUTES } from '@/config/routes';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ExplorePage = lazy(() => import('@/pages/ExplorePage'));
const QuestsPage = lazy(() => import('@/pages/QuestsPage'));
const QuestDetailPage = lazy(() => import('@/pages/QuestDetailPage'));
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage'));
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.explore} element={<ExplorePage />} />
        <Route path={ROUTES.quests} element={<QuestsPage />} />
        <Route path="/quests/:id" element={<QuestDetailPage />} />
        <Route path={ROUTES.achievements} element={<AchievementsPage />} />
        <Route path={ROUTES.leaderboard} element={<LeaderboardPage />} />

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
  );
};
