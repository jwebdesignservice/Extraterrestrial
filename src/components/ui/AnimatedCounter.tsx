'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn, formatWithCommas } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatFn?: (value: number) => string;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
  formatFn = formatWithCommas,
}: AnimatedCounterProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    formatFn(Math.round(latest))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          springValue.set(value);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, springValue, isInView]);

  // Update when value changes
  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [value, springValue, isInView]);

  return (
    <span ref={ref} className={cn('font-mono tabular-nums', className)}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
