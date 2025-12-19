import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function Glow({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('gradient-blob', className)}>{children}</div>;
}
