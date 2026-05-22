import type { LucideIcon } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon?: LucideIcon;
  error?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FormField({ label, icon: Icon, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {Icon ? (
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
            <Icon size={16} />
          </span>
          {children}
        </div>
      ) : (
        children
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
      <AlertCircle size={12} /> {message}
    </p>
  );
}
