import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Compass,
  Map,
  MapPin,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mascot } from '@/components/common/Mascot';
import { ROUTES } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { usePublicStats } from '@/features/stats/hooks/usePublicStats';
import { toQuest } from '@/lib/adapters';
import { formatNumber } from '@/lib/utils';

const features = [
  {
    icon: Map,
    title: 'A living quest map',
    description:
      'Hand-curated quests pinned across Prague. Different categories, difficulties, and vibes.',
  },
  {
    icon: Swords,
    title: 'Real quests, real places',
    description:
      'From sunset viewpoints to hidden speakeasies — each quest is a small adventure with steps to complete.',
  },
  {
    icon: Sparkles,
    title: 'Level up, for real',
    description:
      'Earn XP, unlock achievements, climb the leaderboard. Your city becomes your skill tree.',
  },
  {
    icon: Users,
    title: 'Better with friends',
    description: 'Quest together, share progress, race for streaks. SideQuest is more fun social.',
  },
];

const steps = [
  {
    icon: Compass,
    title: 'Open the map',
    description: 'See quests near you, filtered by what you feel like doing.',
  },
  {
    icon: MapPin,
    title: 'Pick a quest',
    description: 'Walking, food, history, nightlife — there is always a side quest for the mood.',
  },
  {
    icon: Trophy,
    title: 'Complete and level up',
    description: 'Hit the steps in real life and watch your XP, badges and streak rise.',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const LandingPage = () => {
  const { data: publicStats } = usePublicStats();
  const featuredQuest = publicStats?.featuredQuest ? toQuest(publicStats.featuredQuest) : null;
  const explorersInCity =
    publicStats?.cities.find((city) => city.slug === siteConfig.primaryCity.slug)?.explorers ??
    publicStats?.totalExplorers;

  return (
    <div className="flex flex-col gap-24 pb-20">
      <section className="container relative pt-10 md:pt-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="grid items-center gap-10 md:grid-cols-2"
        >
          <motion.div variants={item} className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              <Sparkles className="mr-1 size-3" /> Now exploring {siteConfig.primaryCity.name}
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Your city is a <span className="text-gradient">SideQuest</span>.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground md:text-lg">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="gradient">
                <Link to={ROUTES.auth.register}>
                  <Swords className="size-4" /> Start questing
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={ROUTES.explore}>
                  <Map className="size-4" /> Open the map
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            {typeof explorersInCity === 'number' && explorersInCity > 0 && (
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((letter) => (
                    <span
                      key={letter}
                      className="grid size-7 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary text-[10px] font-semibold text-primary-foreground"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(explorersInCity)} explorers
                  </span>{' '}
                  already questing in {siteConfig.primaryCity.name}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div variants={item} className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent blur-2xl" />

            <Card className="overflow-hidden border-white/10 bg-card/70 backdrop-blur-xl">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/40 via-primary/20 to-secondary/40 sm:h-72">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.35),transparent_60%)]" />
                <div className="pointer-events-none absolute -bottom-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl" />
                <Mascot className="absolute inset-0 m-auto h-[88%] w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <Star className="size-3 text-amber-300" /> Mascot: Sir Pip
                </div>
              </div>
              {featuredQuest && (
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-base font-semibold">{featuredQuest.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {featuredQuest.steps.length} step
                        {featuredQuest.steps.length === 1 ? '' : 's'} ·{' '}
                        {featuredQuest.estimatedMinutes} min · {featuredQuest.distanceKm.toFixed(1)}{' '}
                        km
                      </p>
                    </div>
                    <Badge variant="success">+{featuredQuest.reward.xp} XP</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={ROUTES.questDetail(featuredQuest.id)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Featured quest
                    </Link>
                    <span className="text-[11px] text-muted-foreground">Tap to view</span>
                    <Award className="ml-auto size-5 text-[hsl(var(--legendary))]" />
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <section className="container">
        <div className="mb-8 text-center">
          <Badge variant="default" className="mb-3">
            Features
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to <span className="text-gradient">go outside</span>.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Built for the way real people explore a city — with friends, with a phone in pocket, and
            with a reason to actually go.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="mb-8 text-center">
          <Badge variant="secondary" className="mb-3">
            How it works
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Three taps to your next adventure.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.06 }}
              className="relative"
            >
              <Card className="h-full">
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <step.icon className="size-4 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-background to-secondary/15 p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 md:block">
            <Mascot pose="celebrating" className="h-72" />
          </div>
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              Stop scrolling. <span className="text-gradient">Go outside.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sir Pip is waiting at the gate with your first quest. It takes 45 minutes, costs you
              one walk, and earns you 250 XP.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="gradient">
                <Link to={ROUTES.auth.register}>
                  <Swords className="size-4" /> Create my account
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={ROUTES.business}>For businesses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
