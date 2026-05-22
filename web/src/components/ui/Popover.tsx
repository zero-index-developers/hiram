import { useEffect, useRef } from 'react';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export function Popover({ isOpen, onClose, children, width = 'w-80', className = '' }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div
        ref={ref}
        className={`absolute right-0 mt-2.5 ${width} bg-white border border-primary/10 rounded-2xl shadow-xl py-3.5 z-40 animate-in fade-in slide-in-from-top-2 duration-200 text-left ${className}`}
      >
        {children}
      </div>
    </>
  );
}
