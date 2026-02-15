'use client';

import { ReactNode } from 'react';
import Preloader from '@/components/ui/Preloader';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
