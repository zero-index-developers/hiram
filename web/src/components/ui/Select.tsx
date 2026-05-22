import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Expose ref for react-hook-form integration if needed
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div 
      className={`relative w-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      ref={containerRef}
      {...props}
    >
      {/* Trigger */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-neutral-50/50 border ${isOpen ? 'border-primary ring-1 ring-primary/20 bg-white' : 'border-neutral-200'} rounded-xl py-2.5 px-4 text-sm font-medium transition-all flex items-center justify-between select-none ${className} ${disabled ? '' : 'hover:border-primary/50'} ${!selectedOption ? 'text-neutral-400' : 'text-neutral-900'}`}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown 
          className={`shrink-0 w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'text-neutral-400'}`} 
        />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-primary/10 rounded-xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto scrollbar-minimal">
          <div className="p-1.5 flex flex-col gap-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-neutral-50 font-medium'}`}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';
