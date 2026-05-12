import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Copy, Mail, Search, Send, UserPlus, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { ActivityFeedItem } from '@/components/social/ActivityFeedItem';
import { FriendListItem } from '@/components/social/FriendListItem';
import { QuestCard } from '@/components/quests/QuestCard';
import { mockSocialService } from '@/services/mock/social.service';
import { mockQuestsService } from '@/services/mock/quests.service';

const FriendsPage = () => {
  const [search, setSearch] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ['social', 'friends'],
    queryFn: () => mockSocialService.friends(),
  });
  const { data: activity = [], isLoading: activityLoading } = useQuery({
    queryKey: ['social', 'activity'],
    queryFn: () => mockSocialService.activity(),
  });
  const { data: invites = [] } = useQuery({
    queryKey: ['social', 'invites'],
    queryFn: () => mockSocialService.invites(),
  });
  const { data: sharedQuests = [] } = useQuery({
    queryKey: ['social', 'shared-quests'],
    queryFn: () => mockQuestsService.nearby(),
  });

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const handleInvite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inviteEmail) return;
    toast.success(`Invite sent to ${inviteEmail}`, {
      description: 'They will earn +50 XP when they join.',
    });
    setInviteEmail('');
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText('https://sidequest.app/invite/praguenaut');
    toast.success('Invite link copied to clipboard');
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-1"
      >
        <h1 className="font-display text-2xl font-bold tracking-tight">Friends</h1>
        <p className="text-sm text-muted-foreground">
          Quest together, share progress, race the streak. Adventures are better with company.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader
                title="Your friends"
                subtitle={`${friends.length} explorer${friends.length === 1 ? '' : 's'}`}
                action={
                  <Badge variant="secondary">
                    <Users className="mr-1 size-3" />
                    {friends.filter((f) => f.status !== 'offline').length} online
                  </Badge>
                }
              />
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by username…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="pl-9"
                />
              </div>

              {friendsLoading ? (
                <ul className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton className="h-16 w-full rounded-2xl" />
                    </li>
                  ))}
                </ul>
              ) : filteredFriends.length === 0 ? (
                <EmptyState
                  title="No friends match that search"
                  description="Try a different username."
                />
              ) : (
                <ul className="flex flex-col gap-2">
                  {filteredFriends.map((friend, index) => (
                    <FriendListItem key={friend.id} friend={friend} index={index} />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Activity feed" subtitle="What your friends have been up to." />
              {activityLoading ? (
                <ul className="flex flex-col gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton className="h-16 w-full rounded-2xl" />
                    </li>
                  ))}
                </ul>
              ) : activity.length === 0 ? (
                <EmptyState
                  title="The feed is quiet"
                  description="Add some friends and check back here."
                />
              ) : (
                <ul className="flex flex-col gap-2">
                  {activity.map((item, index) => (
                    <ActivityFeedItem key={item.id} item={item} index={index} />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Invite friends" subtitle="They earn +50 XP when they join." />
              <form onSubmit={handleInvite} className="flex flex-col gap-2">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="friend@email.com"
                    value={inviteEmail}
                    onChange={(event) => setInviteEmail(event.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="gradient">
                  <Send className="size-4" /> Send invite
                </Button>
              </form>
              <Button onClick={handleCopyLink} variant="outline" className="w-full">
                <Copy className="size-4" /> Copy invite link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Pending invites" subtitle={`${invites.length} waiting`} />
              {invites.length === 0 ? (
                <EmptyState
                  title="No pending invites"
                  description="Send a few and they will show up here."
                  icon={UserPlus}
                />
              ) : (
                <ul className="flex flex-col gap-2">
                  {invites.map((invite) => (
                    <li
                      key={invite.id}
                      className="flex items-center justify-between rounded-xl border bg-card p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{invite.fromUsername}</p>
                        <p className="text-xs text-muted-foreground">Lvl {invite.level}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="gradient">
                          Accept
                        </Button>
                        <Button size="sm" variant="ghost">
                          Decline
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <SectionHeader
          title="Quests you can take on together"
          subtitle="Designed for groups of 2 or more."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sharedQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FriendsPage;
