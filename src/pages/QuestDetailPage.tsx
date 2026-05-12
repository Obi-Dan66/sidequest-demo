import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/config/routes';

const QuestDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-4">
      <Button asChild variant="ghost" size="sm" className="w-fit">
        <Link to={ROUTES.quests}>
          <ArrowLeft className="size-4" /> Back to quests
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <h1 className="font-display text-2xl font-bold">Quest: {id}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Detailed view coming soon. This route shows quest steps, map preview, rewards, and
            progress.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestDetailPage;
