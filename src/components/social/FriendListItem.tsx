import { Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import { type Friend, type FriendStatus } from '@/types/social';

const statusLabel: Record<FriendStatus, string> = {
  online: 'Online',
  questing: 'On a quest',
  offline: 'Offline',
};

const statusDot: Record<FriendStatus, string> = {
  online: 'bg-emerald-500',
  questing: 'bg-amber-500 animate-pulse',
  offline: 'bg-muted-foreground/50',
};

interface FriendListItemProps {
  friend: Friend;
  index?: number;
}

export const FriendListItem = ({ friend, index = 0 }: FriendListItemProps) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3"
    >
      <UserAvatar username={friend.username} level={friend.level} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{friend.username}</p>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn('size-1.5 rounded-full', statusDot[friend.status])} aria-hidden />
          <span>
            {friend.status === 'questing' && friend.currentQuestTitle
              ? friend.currentQuestTitle
              : statusLabel[friend.status]}
          </span>
        </div>
      </div>
      <Button size="sm" variant="ghost" className="shrink-0">
        <Swords className="size-3.5" />
        Invite
      </Button>
    </motion.li>
  );
};
