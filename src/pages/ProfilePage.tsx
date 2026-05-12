import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { XPBar } from '@/components/gamification/XPBar';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center md:flex-row md:text-left">
          <Avatar className="size-20 ring-4 ring-primary/30">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <h1 className="font-display text-2xl font-bold">{user.username}</h1>
              <LevelBadge level={user.level} />
            </div>
            {user.title && <p className="text-sm text-muted-foreground">{user.title}</p>}
            <XPBar level={user.level} xp={user.xp} xpToNextLevel={user.xpToNextLevel} />
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
