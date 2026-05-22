import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-primary/5 shadow-sm max-w-lg mx-auto ${className}`}>
      <Icon className="w-12 h-12 text-neutral-300 mb-3" />
      <h3 className="font-extrabold text-neutral-700 text-sm">{title}</h3>
      <p className="text-xs text-neutral-400 mt-1 max-w-xs font-medium">{description}</p>
    </div>
  );
}
