import type { LucideIcon } from 'lucide-react';

interface InfoItem {
  icon?: LucideIcon;
  label: string;
  value: string;
}

interface InfoCardProps {
  title?: string;
  items: InfoItem[];
  className?: string;
}

export function InfoCard({ title, items, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-primary/10 p-4 shadow-sm ${className}`}>
      {title && (
        <div className="font-extrabold text-neutral-800 text-sm mb-3">{title}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
            {item.icon && <item.icon size={14} className="text-primary shrink-0 mt-0.5" />}
            <div>
              <p className="font-extrabold text-neutral-500 uppercase text-[9px] tracking-wider">{item.label}</p>
              <p className="font-bold text-neutral-700 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
