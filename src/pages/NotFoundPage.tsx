import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';

const NotFoundPage = () => {
  return (
    <div className="container flex min-h-full flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="size-8" />
      </div>
      <h1 className="font-display text-3xl font-bold">You wandered off the map</h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist. Let&apos;s get you back on a quest.
      </p>
      <Button asChild variant="gradient">
        <Link to={ROUTES.home}>Back to home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
