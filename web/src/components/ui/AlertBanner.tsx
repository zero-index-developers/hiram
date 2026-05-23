import { AlertCircle } from 'lucide-react';

interface AlertBannerProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function AlertBanner({ title, children, className = '' }: AlertBannerProps) {
  return (
    <div className={`p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-2.5 text-xs text-destructive animate-in fade-in duration-200 ${className}`}>
      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
      <div>
        {title && <span className="font-bold">{title}</span>}
        {children}
      </div>
    </div>
  );
}
