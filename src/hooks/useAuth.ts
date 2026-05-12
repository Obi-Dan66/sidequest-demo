import { useAuthStore, selectIsAuthenticated } from '@/store/auth.store';

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const session = useAuthStore((s) => s.session);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const signIn = useAuthStore((s) => s.signIn);
  const clear = useAuthStore((s) => s.clear);

  return { user, session, isAuthenticated, signIn, signOut: clear };
};
