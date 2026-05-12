import { motion } from 'framer-motion';
import { sirPip, type SirPipPose } from '@/assets/images/sir-pip';
import { cn } from '@/lib/utils';

interface MascotProps {
  className?: string;
  /** Which Sir Pip pose to render. Defaults to the hero stance. */
  pose?: SirPipPose;
  /** When true, applies a subtle gentle hover/float animation. */
  animated?: boolean;
  alt?: string;
}

export const Mascot = ({
  className,
  pose = 'hero',
  animated = true,
  alt = 'Sir Pip, the SideQuest mascot',
}: MascotProps) => {
  const src = sirPip[pose];

  if (!animated) {
    return <img src={src} alt={alt} className={cn('select-none', className)} draggable={false} />;
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn('select-none', className)}
      initial={{ y: 0 }}
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      draggable={false}
    />
  );
};
