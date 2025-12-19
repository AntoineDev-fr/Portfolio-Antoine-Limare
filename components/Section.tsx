import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('section-padding scroll-mt-24', className)}>
      {children}
    </section>
  );
}
