import type { LucideIcon } from 'lucide-react';
import { Clock, MapPin } from 'lucide-react';
import { formatDate } from '@hiram/shared';

interface MetadataRowProps {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function MetadataRow({ icon: Icon, children, className = '' }: MetadataRowProps) {
  return (
    <span className={`text-[10px] text-neutral-400 font-bold flex items-center gap-1 ${className}`}>
      <Icon className="w-3 h-3 text-neutral-400" /> {children}
    </span>
  );
}

export function LocationLabel({ cityCode }: { cityCode?: string }) {
  return <MetadataRow icon={MapPin}>{cityCode === '137607000' ? 'Taguig' : 'Manila'}</MetadataRow>;
}

export function DateLabel({ date }: { date?: Date | string | null }) {
  return (
    <MetadataRow icon={Clock}>
      {date ? formatDate(date) : 'Recently'}
    </MetadataRow>
  );
}
