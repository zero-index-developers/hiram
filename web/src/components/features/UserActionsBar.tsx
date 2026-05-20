import { useState, useEffect, useRef } from 'react';
import { Bell, Inbox, MessageSquare, CheckCircle, BookOpen, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileDropdown } from './ProfileDropdown';

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

  return (
    <div className={`flex items-center ${containerGap} pointer-events-auto`} ref={containerRef}>
      
      {/* Inbox Icon Button */}
      {variant === 'searchbar' && (
        <div className="relative">
          <button
            onClick={() => handleToggle('inbox')}
            className={`${btnSizeClass} rounded-full border border-primary/10 bg-primary/5 text-neutral-600 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm relative`}
          >
            <Inbox size={variant === 'searchbar' ? 16 : 18} />
            {/* Active Badge Dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {activePopover === 'inbox' && (
            <div className="absolute right-0 mt-2.5 w-80 bg-white border border-primary/10 rounded-2xl shadow-xl py-3.5 z-40 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
              <div className="px-4 pb-2 border-b border-neutral-100 mb-2 flex justify-between items-center">
                <span className="font-extrabold text-neutral-800 text-xs uppercase tracking-wider">Inbox Proposals</span>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">2 New</span>
              </div>
              
              <div className="max-h-64 overflow-y-auto scrollbar-minimal divide-y divide-neutral-100">
                <div 
                  onClick={() => {
                    setActivePopover(null);
                    window.history.pushState(null, '', '/inbox');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shrink-0">
                    <MessageSquare size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-700 truncate">Julius Cesar</p>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">Is the Chemistry Book still available for rent?</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setActivePopover(null);
                    window.history.pushState(null, '', '/inbox');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shrink-0">
                    <BookOpen size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-700 truncate">Marcus Aurelius</p>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">Offered Calculus Guide in exchange for your board...</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-2.5 px-4 flex justify-center">
                <button
                  onClick={() => {
                    setActivePopover(null);
                    window.history.pushState(null, '', '/inbox');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="text-xs font-black text-primary hover:text-primary/80 transition-colors w-full text-center py-1 cursor-pointer"
                >
                  See All
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bell Notification Button */}
      <div className="relative">
        <button
          onClick={() => handleToggle('notifications')}
          className={`${btnSizeClass} rounded-full border border-primary/10 bg-primary/5 text-neutral-600 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm relative`}
        >
          <Bell size={variant === 'searchbar' ? 16 : 18} />
          {/* Active Badge Dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {activePopover === 'notifications' && (
          <div className="absolute right-0 mt-2.5 w-80 bg-white border border-primary/10 rounded-2xl shadow-xl py-3.5 z-40 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
            <div className="px-4 pb-2 border-b border-neutral-100 mb-2 flex justify-between items-center">
              <span className="font-extrabold text-neutral-800 text-xs uppercase tracking-wider">Alerts</span>
              <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">New Updates</span>
            </div>

            <div className="max-h-64 overflow-y-auto scrollbar-minimal divide-y divide-neutral-100">
              <div 
                onClick={() => {
                  setActivePopover(null);
                  window.history.pushState(null, '', '/inbox?proposal=prop-2');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-700 leading-snug">
                    Your request for <span className="font-bold">"T-Square 36"</span> has been approved!
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">10 minutes ago</p>
                </div>
              </div>

              <div className="p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-700 leading-snug">
                    Verify your campus email to unlock unlimited listings.
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-2.5 px-4 flex justify-center">
              <button
                onClick={() => {
                  setActivePopover(null);
                  window.history.pushState(null, '', '/alerts');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-xs font-black text-primary hover:text-primary/80 transition-colors w-full text-center py-1 cursor-pointer"
              >
                See All
              </button>
            </div>
          </div>
        )}
      </div>

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
