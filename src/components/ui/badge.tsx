import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/15 text-primary',
        secondary: 'border-transparent bg-secondary/15 text-secondary',
        destructive: 'border-transparent bg-destructive/15 text-destructive',
        outline: 'text-foreground',
        success: 'border-transparent bg-xp/15 text-[hsl(var(--xp))]',
        legendary: 'border-transparent bg-[hsl(var(--legendary))]/15 text-[hsl(var(--legendary))]',
        epic: 'border-transparent bg-[hsl(var(--epic))]/15 text-[hsl(var(--epic))]',
        rare: 'border-transparent bg-[hsl(var(--rare))]/15 text-[hsl(var(--rare))]',
        common: 'border-transparent bg-[hsl(var(--common))]/15 text-[hsl(var(--common))]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
