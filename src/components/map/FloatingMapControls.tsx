import { Layers, LocateFixed, Maximize2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingMapControlsProps {
  className?: string;
  onLocate?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLayers?: () => void;
  onFullscreen?: () => void;
}

export const FloatingMapControls = ({
  className,
  onLocate,
  onZoomIn,
  onZoomOut,
  onLayers,
  onFullscreen,
}: FloatingMapControlsProps) => {
  const controls = [
    { id: 'locate', label: 'Center on me', icon: LocateFixed, onClick: onLocate, primary: true },
    { id: 'zoom-in', label: 'Zoom in', icon: Plus, onClick: onZoomIn },
    { id: 'zoom-out', label: 'Zoom out', icon: Minus, onClick: onZoomOut },
    { id: 'layers', label: 'Layers', icon: Layers, onClick: onLayers },
    { id: 'fullscreen', label: 'Fullscreen', icon: Maximize2, onClick: onFullscreen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className={cn(
        'pointer-events-auto flex flex-col items-end gap-2 rounded-2xl border border-white/20 bg-background/60 p-1.5 shadow-xl backdrop-blur-xl',
        className,
      )}
    >
      {controls.map(({ id, label, icon: Icon, onClick, primary }) => (
        <Button
          key={id}
          type="button"
          variant={primary ? 'gradient' : 'ghost'}
          size="icon"
          aria-label={label}
          onClick={onClick}
          className={cn('size-10 rounded-xl', primary && 'shadow-lg shadow-primary/40')}
        >
          <Icon className="size-4" />
        </Button>
      ))}
    </motion.div>
  );
};
