import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const QuestCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none md:h-44" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  );
};
