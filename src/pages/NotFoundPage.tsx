import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/common/Mascot';
import { ROUTES } from '@/config/routes';

const NotFoundPage = () => {
  return (
    <div className="container flex min-h-full flex-col items-center justify-center gap-4 py-20 text-center">
      <Mascot pose="waving" className="h-56 drop-shadow-[0_18px_28px_hsl(var(--primary)/0.25)]" />
      <h1 className="font-display text-3xl font-bold">You wandered off the map</h1>
      <p className="max-w-md text-muted-foreground">
        Sir Pip cannot find this page. Let&apos;s get you back on a quest.
      </p>
      <Button asChild variant="gradient" size="lg">
        <Link to={ROUTES.home}>Back to home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
