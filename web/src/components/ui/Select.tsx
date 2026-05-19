import React, { useState, useRef, useEffect, type SelectHTMLAttributes } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  onChange?: (event: any) => void;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className = '', children, value, defaultValue, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const containerRef = useRef<HTMLDivElement>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Parse <option> children to build custom dropdown items
    const options: { value: string; label: React.ReactNode; disabled?: boolean; hidden?: boolean }[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === 'option') {
        options.push({
          value: child.props.value || '',
          label: child.props.children,
          disabled: child.props.disabled,
          hidden: child.props.hidden,
        });
      }
    });

    const selectedOption = options.find((opt) => opt.value === currentValue);
    const displayLabel = selectedOption ? selectedOption.label : '';

    // Handle click outside to close popover
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optValue: string) => {
      if (!isControlled) {
        setInternalValue(optValue);
      }
      if (onChange) {
        // Mock event object for seamless drop-in replacement of native select
        onChange({ target: { value: optValue } } as any);
      }
      setIsOpen(false);
    };

    return (
      <div className={`relative group ${className}`} ref={containerRef}>
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-neutral-50/50 border ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-neutral-200'} rounded-lg pl-3 pr-8 py-1.5 text-sm font-semibold text-neutral-600 hover:border-primary/50 transition-all cursor-pointer flex items-center justify-between select-none h-full`}
          {...(props as any)}
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full min-w-max mt-2 bg-white border border-primary/10 rounded-xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
            <div className="max-h-60 overflow-y-auto p-1.5 flex flex-col gap-0.5">
              {options.filter(opt => !opt.hidden).map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => !opt.disabled && handleSelect(opt.value)}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                    opt.disabled 
                      ? 'opacity-50 cursor-not-allowed text-neutral-400' 
                      : opt.value === currentValue
                        ? 'bg-primary/5 text-primary font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 font-medium'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {opt.value === currentValue && !opt.hidden && (
                    <Check className="w-4 h-4 ml-3 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
