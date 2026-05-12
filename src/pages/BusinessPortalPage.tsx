import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Footprints,
  Gift,
  LineChart,
  ShieldCheck,
  Star,
  Store,
  TrendingDown,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Mascot } from '@/components/common/Mascot';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { useMe } from '@/features/auth/hooks/useMe';
import {
  useBusinessMetrics,
  useBusinessTopQuests,
  useMyBusiness,
} from '@/features/businesses/hooks/useBusinessMetrics';
import { usePublicStats } from '@/features/stats/hooks/usePublicStats';
import { type BusinessMetricsDto } from '@/types';
import { cn, formatNumber } from '@/lib/utils';

const businessBenefits = [
  {
    icon: Footprints,
    title: 'Foot traffic that loves to explore',
    description:
      'SideQuest players walk through your door already in adventure mode — and tell their friends about it.',
  },
  {
    icon: Gift,
    title: 'Reward redemption, built in',
    description:
      'Hand out XP boosts, badges, or real-world perks when quests bring players to your place.',
  },
  {
    icon: BarChart3,
    title: 'Real analytics, no spreadsheets',
    description:
      'See visits, completions, ratings and repeat customers in a dashboard that actually makes sense.',
  },
];

type Trend = 'up' | 'down' | 'flat';

const trendForPct = (pct: number | undefined): Trend => {
  if (pct === undefined) return 'flat';
  if (pct > 0.5) return 'up';
  if (pct < -0.5) return 'down';
  return 'flat';
};

const formatDelta = (value: number, suffix = '%'): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(0)}${suffix}`;
};

interface MetricTileProps {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  loading?: boolean;
}

const MetricTile = ({ label, value, delta, trend = 'flat', loading }: MetricTileProps) => (
  <Card>
    <CardContent className="space-y-1 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      {loading ? (
        <Skeleton className="h-7 w-24" />
      ) : (
        <p className="font-display text-2xl font-bold">{value}</p>
      )}
      {delta && !loading && (
        <p
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium',
            trend === 'up' && 'text-emerald-500',
            trend === 'down' && 'text-rose-500',
            trend === 'flat' && 'text-muted-foreground',
          )}
        >
          {trend === 'up' ? (
            <TrendingUp className="size-3" />
          ) : trend === 'down' ? (
            <TrendingDown className="size-3" />
          ) : null}
          {delta}
        </p>
      )}
    </CardContent>
  </Card>
);

const metricsToTiles = (metrics: BusinessMetricsDto): MetricTileProps[] => [
  {
    label: 'Monthly visits',
    value: formatNumber(metrics.monthlyVisits.value),
    delta: formatDelta(metrics.monthlyVisits.deltaPct),
    trend: trendForPct(metrics.monthlyVisits.deltaPct),
  },
  {
    label: 'Quest completions',
    value: formatNumber(metrics.questCompletions.value),
    delta: formatDelta(metrics.questCompletions.deltaPct),
    trend: trendForPct(metrics.questCompletions.deltaPct),
  },
  {
    label: 'Avg. rating',
    value: `${metrics.avgRating.value.toFixed(1)} / 5`,
    delta: `${metrics.avgRating.deltaAbs >= 0 ? '+' : ''}${metrics.avgRating.deltaAbs.toFixed(1)}`,
    trend: metrics.avgRating.deltaAbs > 0 ? 'up' : metrics.avgRating.deltaAbs < 0 ? 'down' : 'flat',
  },
  {
    label: 'Repeat visitors',
    value: `${metrics.repeatVisitors.value}%`,
    delta: formatDelta(metrics.repeatVisitors.deltaPct),
    trend: trendForPct(metrics.repeatVisitors.deltaPct),
  },
];

const BusinessPortalPage = () => {
  const { isAuthenticated } = useAuth();
  const { data: me } = useMe();
  const isBusinessOwner = isAuthenticated && me?.role === 'BUSINESS_OWNER';

  const businessQuery = useMyBusiness(isBusinessOwner);
  const metricsQuery = useBusinessMetrics({ period: '30D' }, isBusinessOwner);
  const topQuestsQuery = useBusinessTopQuests({ period: '30D', limit: 10 }, isBusinessOwner);
  const { data: publicStats } = usePublicStats();

  const metricTiles = metricsQuery.data ? metricsToTiles(metricsQuery.data) : null;

  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="container relative pt-10 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <Badge variant="secondary" className="w-fit">
              <Briefcase className="mr-1 size-3" /> For business
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Turn your café into a <span className="text-gradient">side quest</span>.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground md:text-lg">
              Partner with SideQuest to turn your venue into a real-world destination. Players
              already love going outside — give them a reason to walk through your door.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" variant="gradient">
                <BadgeCheck className="size-4" /> Become a partner
              </Button>
              <Button size="lg" variant="outline">
                See how it works
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-500" /> No setup fee
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Card className="overflow-hidden border-white/10 bg-card/70 backdrop-blur-xl">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Live preview</p>
                    <p className="font-display text-lg font-semibold">
                      {businessQuery.data?.name ?? 'Your venue · Dashboard'}
                    </p>
                  </div>
                  {isBusinessOwner ? (
                    <Badge variant="success">
                      <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
                      Live
                    </Badge>
                  ) : (
                    <Badge variant="outline">Sample</Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {metricTiles ? (
                    metricTiles.slice(0, 2).map((tile) => <MetricTile key={tile.label} {...tile} />)
                  ) : (
                    <>
                      <MetricTile
                        label="Monthly visits"
                        value="—"
                        loading={metricsQuery.isLoading}
                      />
                      <MetricTile
                        label="Quest completions"
                        value="—"
                        loading={metricsQuery.isLoading}
                      />
                    </>
                  )}
                </div>
                <SparkRow />
              </CardContent>
            </Card>

            <div className="pointer-events-none absolute -right-8 -top-10 hidden md:block">
              <Mascot className="h-40 -rotate-6 opacity-90" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container">
        <SectionHeader
          title="Why partners pick SideQuest"
          subtitle="Real foot traffic. Real analytics. Zero spreadsheets."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {businessBenefits.map((benefit) => (
            <Card key={benefit.title} className="h-full">
              <CardContent className="space-y-3 p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <benefit.icon className="size-5" />
                </span>
                <h3 className="font-display text-base font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeader
          title="Inside the partner dashboard"
          subtitle={
            isBusinessOwner
              ? 'Your venue, last 30 days.'
              : 'A glance at the real-time numbers our partners see.'
          }
          className="mb-6"
        />

        {!isBusinessOwner ? (
          <Card>
            <CardContent className="p-6">
              <EmptyState
                title="Sign in as a partner to see live numbers"
                description="Live business metrics appear here once your venue is linked to your account."
                icon={Briefcase}
              />
            </CardContent>
          </Card>
        ) : metricsQuery.isLoading ? (
          <div className="grid gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : metricTiles ? (
          <div className="grid gap-4 md:grid-cols-4">
            {metricTiles.map((tile) => (
              <MetricTile key={tile.label} {...tile} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Metrics not available"
            description="Your dashboard will populate once we have at least 7 days of data."
            icon={LineChart}
          />
        )}

        {isBusinessOwner && (
          <Card className="mt-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <SectionHeader title="Top quests" subtitle="Performance over the last 30 days." />
                <Badge variant="outline">
                  <LineChart className="mr-1 size-3" /> 30d
                </Badge>
              </div>
              <div className="overflow-x-auto">
                {topQuestsQuery.isLoading ? (
                  <div className="p-4">
                    <Skeleton className="h-40 w-full rounded-xl" />
                  </div>
                ) : (topQuestsQuery.data?.length ?? 0) === 0 ? (
                  <EmptyState
                    title="No quest data yet"
                    description="Once visitors start completing your quests, they'll show up here."
                    icon={LineChart}
                  />
                ) : (
                  <table className="w-full text-sm">
                    <thead className="border-y bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium">Quest</th>
                        <th className="px-4 py-2 text-right font-medium">Visits</th>
                        <th className="px-4 py-2 text-right font-medium">Conversion</th>
                        <th className="px-4 py-2 text-right font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {(topQuestsQuery.data ?? []).map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-accent/30">
                          <td className="px-4 py-3 font-medium">{row.title}</td>
                          <td className="px-4 py-3 text-right font-mono">
                            {formatNumber(row.visits)}
                          </td>
                          <td className="px-4 py-3 text-right font-mono">
                            {(row.conversion * 100).toFixed(0)}%
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center gap-1 font-medium">
                              <Star className="size-3.5 text-amber-500" />
                              {row.rating !== null ? row.rating.toFixed(1) : '—'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-secondary/15 via-background to-primary/15 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Store className="mr-1 size-3" /> Ready to start
              </Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                List your place in a <span className="text-gradient">side quest</span> today.
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Onboarding takes 10 minutes. Your venue can be live on the map by tomorrow.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button size="lg" variant="gradient">
                  Create partner account
                  <ArrowUpRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Talk to sales
                </Button>
              </div>
            </div>
            <PlatformStatsGrid
              totalExplorers={publicStats?.totalExplorers}
              totalCompletions={publicStats?.totalQuestCompletions}
              totalQuests={publicStats?.totalQuests}
              totalDistanceKm={publicStats?.totalDistanceKm}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface PlatformStatsGridProps {
  totalExplorers?: number;
  totalCompletions?: number;
  totalQuests?: number;
  totalDistanceKm?: number;
}

const PlatformStatsGrid = ({
  totalExplorers,
  totalCompletions,
  totalQuests,
  totalDistanceKm,
}: PlatformStatsGridProps) => {
  const tiles: Array<{ icon: LucideIcon; value: string; sub: string }> = [
    {
      icon: Users,
      value: totalExplorers !== undefined ? formatNumber(totalExplorers) : '—',
      sub: 'explorers on SideQuest',
    },
    {
      icon: BadgeCheck,
      value: totalCompletions !== undefined ? formatNumber(totalCompletions) : '—',
      sub: 'quests completed',
    },
    {
      icon: Briefcase,
      value: totalQuests !== undefined ? formatNumber(totalQuests) : '—',
      sub: 'published quests',
    },
    {
      icon: Footprints,
      value:
        totalDistanceKm !== undefined ? `${formatNumber(Math.round(totalDistanceKm))} km` : '—',
      sub: 'distance walked',
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {tiles.map((tile) => (
        <Card key={tile.sub}>
          <CardContent className="space-y-1 p-4">
            <tile.icon className="size-4 text-primary" />
            <p className="font-display text-2xl font-bold">{tile.value}</p>
            <p className="text-xs text-muted-foreground">{tile.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SparkRow = () => {
  const points = [4, 8, 6, 12, 10, 16, 14, 22, 18, 28, 26, 34];
  const max = Math.max(...points);
  return (
    <div className="flex h-20 items-end gap-1 rounded-xl bg-muted/40 p-3">
      {points.map((point, index) => (
        <motion.span
          key={index}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: index * 0.04 }}
          style={{ height: `${(point / max) * 100}%` }}
          className="w-3 origin-bottom rounded-md bg-gradient-to-t from-primary to-secondary"
        />
      ))}
    </div>
  );
};

export default BusinessPortalPage;
