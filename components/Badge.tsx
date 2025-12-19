import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren<{ className?: string }>;

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/90 border border-white/10 backdrop-blur',
        className,
      )}
    >
      {children}
    </span>
  );
}
