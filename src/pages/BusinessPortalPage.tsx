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
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mascot } from '@/components/common/Mascot';
import { SectionHeader } from '@/components/common/SectionHeader';
import {
  businessBenefits,
  mockBusinessMetrics,
  mockBusinessQuests,
} from '@/lib/mock/business.mock';
import { cn } from '@/lib/utils';

const BusinessPortalPage = () => {
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
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-3.5 text-amber-500" /> 4.8 / 5 partner rating
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
                    <p className="font-display text-lg font-semibold">Café Louvre · Dashboard</p>
                  </div>
                  <Badge variant="success">
                    <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
                    Live
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {mockBusinessMetrics.slice(0, 2).map((metric) => (
                    <MetricTile key={metric.label} {...metric} />
                  ))}
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
          {businessBenefits.map((benefit, index) => {
            const Icon = [Footprints, Gift, BarChart3][index] ?? Footprints;
            return (
              <Card key={benefit.title} className="h-full">
                <CardContent className="space-y-3 p-5">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container">
        <SectionHeader
          title="Inside the partner dashboard"
          subtitle="A glance at the real-time numbers our partners see."
          className="mb-6"
        />

        <div className="grid gap-4 md:grid-cols-4">
          {mockBusinessMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} />
          ))}
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <SectionHeader title="Top quests" subtitle="Performance over the last 30 days." />
              <Badge variant="outline">
                <LineChart className="mr-1 size-3" /> 30d
              </Badge>
            </div>
            <div className="overflow-x-auto">
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
                  {mockBusinessQuests.map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-accent/30">
                      <td className="px-4 py-3 font-medium">{row.title}</td>
                      <td className="px-4 py-3 text-right font-mono">
                        {row.visits.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {(row.conversion * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 font-medium">
                          <Star className="size-3.5 text-amber-500" />
                          {row.rating.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: '2.4k', sub: 'players this month' },
                { icon: BarChart3, label: '+18%', sub: 'visits MoM' },
                { icon: Star, label: '4.7', sub: 'avg rating' },
                { icon: Gift, label: '63%', sub: 'redeem rewards' },
              ].map((stat) => (
                <Card key={stat.sub}>
                  <CardContent className="space-y-1 p-4">
                    <stat.icon className="size-4 text-primary" />
                    <p className="font-display text-2xl font-bold">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface MetricTileProps {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
}

const MetricTile = ({ label, value, delta, trend = 'flat' }: MetricTileProps) => (
  <Card>
    <CardContent className="space-y-1 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-bold">{value}</p>
      {delta && (
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
