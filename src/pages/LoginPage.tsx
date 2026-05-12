import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { mockCurrentUser } from '@/lib/mock/users.mock';
import { ROUTES } from '@/config/routes';

const LoginPage = () => {
  const [email, setEmail] = useState('demo@sidequest.app');
  const [password, setPassword] = useState('demo1234');
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    setSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    signIn(
      {
        ...mockCurrentUser,
        email,
        username: email.split('@')[0] || mockCurrentUser.username,
      },
      { accessToken: 'demo-token' },
    );
    toast.success('Welcome back, explorer!', { description: '+10 XP login bonus.' });
    setSubmitting(false);
    navigate(ROUTES.explore, { replace: true });
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
            <p className="text-center text-xs text-muted-foreground">
              Demo: <span className="font-mono">demo@sidequest.app</span> · any password
            </p>
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
