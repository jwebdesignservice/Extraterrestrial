'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  noBorder?: boolean;
}

export default function GlassPanel({
  children,
  className,
  hover = false,
  glow = false,
  noBorder = false,
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        'bg-[var(--panel-bg)] backdrop-blur-xl rounded-lg',
        !noBorder && 'border border-[var(--glass-border)]',
        hover && 'transition-all duration-300 hover:bg-[var(--panel-bg-hover)] hover:border-[var(--glass-border-hover)]',
        glow && 'shadow-[0_0_20px_var(--matrix-green-glow)]',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
