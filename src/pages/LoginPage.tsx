import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { ROUTES } from '@/config/routes';

const LoginPage = () => {
  const [email, setEmail] = useState('wanderer@prague.cz');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useLogin();
  const submitting = login.isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    try {
      await login.mutateAsync({ email, password });
      toast.success('Welcome back, explorer!');
      navigate(ROUTES.explore, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign-in failed';
      toast.error('Sign-in failed', { description: message });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue your quest.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="mt-2"
              disabled={submitting}
            >
              <LogIn className="size-4" />
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              New here?{' '}
              <Link to={ROUTES.auth.register} className="font-medium text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
