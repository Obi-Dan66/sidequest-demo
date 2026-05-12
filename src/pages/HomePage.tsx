import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XPBar } from '@/components/gamification/XPBar';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import { siteConfig } from '@/config/site';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-6">
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-3xl border bg-card p-6 md:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-secondary/25 blur-3xl" />

        <Badge variant="secondary" className="mb-3">
          <Sparkles className="mr-1 size-3" /> Now exploring {siteConfig.primaryCity.name}
        </Badge>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          Your city is a <span className="text-gradient">SideQuest</span>.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{siteConfig.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="gradient">
            <Link to={ROUTES.quests}>
              <Swords className="size-4" /> Start a quest
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to={ROUTES.explore}>
              <MapPin className="size-4" /> Open the map
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {isAuthenticated && user && (
          <div className="mt-8 max-w-md">
            <XPBar level={user.level} xp={user.xp} xpToNextLevel={user.xpToNextLevel} />
          </div>
        )}
      </motion.section>

      <motion.section variants={item} className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Discover',
            description: 'Hidden viewpoints, courtyards, and local legends.',
            icon: MapPin,
          },
          {
            title: 'Quest',
            description: 'Curated routes that turn the city into a game.',
            icon: Swords,
          },
          {
            title: 'Level up',
            description: 'Earn XP, unlock achievements, climb the board.',
            icon: Sparkles,
          },
        ].map((feature) => (
          <Card key={feature.title}>
            <CardContent className="p-5">
              <feature.icon className="size-5 text-primary" />
              <h3 className="mt-3 font-display text-base font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
