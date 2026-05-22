import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface VerifiedBadgeProps {
  className?: string;
  iconSize?: number;
  variant?: 'tooltip' | 'icon-only';
}

export function VerifiedBadge({ className = '', iconSize = 16, variant = 'tooltip' }: VerifiedBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => variant === 'tooltip' && setShowTooltip(true)}
      onMouseLeave={() => variant === 'tooltip' && setShowTooltip(false)}
    >
      <ShieldCheck 
        size={iconSize} 
        className="text-primary drop-shadow-sm transition-transform hover:scale-110" 
      />
      
      {variant === 'tooltip' && showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200 z-50">
          Campus Verified Student
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
        </div>
      )}
    </div>
  );
}
