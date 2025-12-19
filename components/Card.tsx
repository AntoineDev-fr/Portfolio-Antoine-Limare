import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{ className?: string }>; 

export function Card({ children, className }: CardProps) {
  return <div className={cn('glass card-hover relative overflow-hidden rounded-2xl border border-white/10', className)}>{children}</div>;
}
