import { cn } from '@/lib/utils';
import { Badge } from './Badge';

type TimelineItemProps = {
  title: string;
  detail: string;
  isLast?: boolean;
};

export function TimelineItem({ title, detail, isLast }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center">
        <span className="h-4 w-4 rounded-full border border-primary/40 bg-primary/40 shadow-glow" aria-hidden />
      </span>
      {!isLast && <span className="absolute left-[7px] top-5 h-full w-[2px] bg-white/10" aria-hidden />}
      <div className={cn('glass border border-white/10 rounded-xl p-4')}> 
        <Badge className="mb-2 inline-flex bg-primary/10 text-primary border-primary/30">{title}</Badge>
        <p className="text-sm text-white/80 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}
