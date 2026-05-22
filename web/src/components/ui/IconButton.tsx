import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  size?: number;
  className?: string;
  badge?: boolean;
  badgeColor?: string;
  badgePulse?: boolean;
}

export function IconButton({
  icon: Icon,
  onClick,
  size = 16,
  className = '',
  badge,
  badgeColor = 'bg-primary',
  badgePulse,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-primary/10 bg-primary/5 text-neutral-600 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm relative ${className}`}
    >
      <Icon size={size} />
      {badge && (
        <span
          className={`absolute top-1.5 right-1.5 w-2 h-2 ${badgeColor} rounded-full ring-2 ring-white ${badgePulse ? 'animate-pulse' : ''}`}
        />
      )}
    </button>
  );
}
