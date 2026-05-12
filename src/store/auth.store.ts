import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type AuthSession, type User } from '@/types/user';

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: AuthSession | null) => void;
  /** Update only the access token (used by the refresh-token flow). */
  setAccessToken: (accessToken: string) => void;
  signIn: (user: User, session: AuthSession) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setAccessToken: (accessToken) =>
        set((state) => (state.session ? { session: { ...state.session, accessToken } } : state)),
      signIn: (user, session) => set({ user, session }),
      clear: () => set({ user: null, session: null }),
    }),
    {
      name: 'sq.auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, session: state.session }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    },
  ),
);

export const selectIsAuthenticated = (state: AuthState) =>
  Boolean(state.session?.accessToken && state.user);
