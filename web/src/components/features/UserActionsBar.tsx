import { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileDropdown } from './ProfileDropdown';
import { InboxPopover } from './InboxPopover';
import { NotificationPopover } from './NotificationPopover';

interface UserActionsBarProps {
  variant?: 'header' | 'searchbar';
}

export function UserActionsBar({ variant = 'header' }: UserActionsBarProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();
  const [activePopover, setActivePopover] = useState<'profile' | 'notifications' | 'inbox' | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    if (!activePopover) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activePopover]);

  // Close popovers on page scroll
  useEffect(() => {
    if (!activePopover) return;

    const handleScroll = () => {
      setActivePopover(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePopover]);

  const handleToggle = (popover: 'profile' | 'notifications' | 'inbox') => {
    setActivePopover((prev) => (prev === popover ? null : popover));
  };

  if (!isAuthenticated) {
    if (variant === 'header') {
      return (
        <button
          onClick={() => setAuthModalOpen(true, 'login')}
          className="px-5 py-2 text-sm font-black rounded-full border border-primary/10 bg-primary/5 text-neutral-700 hover:text-primary hover:bg-primary/10 transition-all shadow-sm pointer-events-auto shrink-0 cursor-pointer"
        >
          Sign In
        </button>
      );
    }

    const sizeClass = 'w-10 h-10';
    return (
      <button
        onClick={() => setAuthModalOpen(true, 'login')}
        className={`${sizeClass} rounded-full border border-primary/10 bg-primary/5 text-neutral-600 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm pointer-events-auto shrink-0 cursor-pointer`}
        aria-label="Sign In"
      >
        <User size={16} />
      </button>
    );
  }

  // Layout sizing config
  const btnSizeClass = variant === 'searchbar' ? 'w-10 h-10' : 'w-9 h-9';
  const containerGap = variant === 'searchbar' ? 'gap-2.5' : 'gap-4';
  const iconSize = variant === 'searchbar' ? 16 : 18;

  return (
    <div className={`flex items-center ${containerGap} pointer-events-auto`} ref={containerRef}>
      
      {/* Inbox Icon Button */}
      {variant === 'searchbar' && (
        <InboxPopover
          isOpen={activePopover === 'inbox'}
          onClose={() => setActivePopover(null)}
          btnSizeClass={btnSizeClass}
          onToggle={() => handleToggle('inbox')}
        />
      )}

      {/* Bell Notification Button */}
      <NotificationPopover
        isOpen={activePopover === 'notifications'}
        onClose={() => setActivePopover(null)}
        btnSizeClass={btnSizeClass}
        iconSize={iconSize}
        onToggle={() => handleToggle('notifications')}
      />

      {/* Profile Dropdown Component */}
      <ProfileDropdown
        variant={variant}
        isOpen={activePopover === 'profile'}
        onToggle={() => handleToggle('profile')}
        onClose={() => setActivePopover(null)}
      />
      
    </div>
  );
}
