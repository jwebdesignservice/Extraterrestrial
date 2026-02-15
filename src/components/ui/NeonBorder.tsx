'use client';

import { cn } from '@/lib/utils';

interface NeonBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: 'green' | 'cyan' | 'red';
  animated?: boolean;
}

export default function NeonBorder({
  children,
  className,
  color = 'green',
  animated = false,
}: NeonBorderProps) {
  const colorClasses = {
    green: 'border-[var(--matrix-green)] shadow-[0_0_10px_var(--matrix-green-glow),inset_0_0_10px_var(--matrix-green-glow)]',
    cyan: 'border-[var(--cyber-cyan)] shadow-[0_0_10px_var(--cyber-cyan-glow),inset_0_0_10px_var(--cyber-cyan-glow)]',
    red: 'border-[var(--warning-red)] shadow-[0_0_10px_var(--warning-red-glow),inset_0_0_10px_var(--warning-red-glow)]',
  };

  return (
    <div
      className={cn(
        'border-2 rounded-lg',
        colorClasses[color],
        animated && 'animate-pulse',
        className
      )}
    >
      {children}
    </div>
  );
}
