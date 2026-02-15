'use client';

import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export default function GlitchText({
  text,
  className,
  as: Component = 'span',
}: GlitchTextProps) {
  return (
    <Component
      className={cn('glitch relative inline-block', className)}
      data-text={text}
    >
      {text}
    </Component>
  );
}
