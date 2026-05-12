import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { mockCurrentUser } from '@/lib/mock/users.mock';
import { ROUTES } from '@/config/routes';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please fill in every field');
      return;
    }
    setSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 700));
    signIn(
      {
        ...mockCurrentUser,
        id: 'new-user',
        username,
        email,
        level: 1,
        xp: 50,
        xpToNextLevel: 250,
        title: 'Curious Newcomer',
      },
      { accessToken: 'demo-token' },
    );
    toast.success(`Welcome to SideQuest, ${username}!`, {
      description: '+50 XP for joining. Sir Pip is preparing your first quest.',
    });
    setSubmitting(false);
    navigate(ROUTES.explore, { replace: true });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Start your quest</CardTitle>
          <CardDescription>Create an account to start exploring Prague.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="explorer42"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
              <Swords className="size-4" />
              {submitting ? 'Creating…' : 'Create account'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to={ROUTES.auth.login} className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;
