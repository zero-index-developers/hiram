import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface VerifiedBadgeProps {
  className?: string;
  iconSize?: number;
}

export function VerifiedBadge({ className = '', iconSize = 16 }: VerifiedBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <ShieldCheck 
        size={iconSize} 
        className="text-primary cursor-help drop-shadow-sm transition-transform hover:scale-110" 
      />
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200 z-50">
          Campus Verified Student
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
        </div>
      )}
    </div>
  );
}
