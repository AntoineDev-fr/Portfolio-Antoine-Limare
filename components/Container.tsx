import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{ className?: string }>;

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-10', className)}>
      {children}
    </div>
  );
}
