import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    // Demo only: wire to real API via @/services/api when the backend is ready.
    signIn(
      {
        id: 'demo-user',
        username: email.split('@')[0] || 'explorer',
        email,
        level: 4,
        xp: 1240,
        xpToNextLevel: 2000,
        title: 'Curious Newcomer',
        joinedAt: new Date().toISOString(),
      },
      { accessToken: 'demo-token' },
    );
    toast.success('Welcome back, explorer!');
    navigate(ROUTES.home, { replace: true });
  };

  return (
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
          <Button type="submit" variant="gradient" size="lg" className="mt-2">
            Sign in
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
  );
};

export default LoginPage;
