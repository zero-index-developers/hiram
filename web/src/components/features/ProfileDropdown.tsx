import { useState } from 'react';
import { LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface ProfileDropdownProps {
  variant?: 'header' | 'searchbar';
}

export function ProfileDropdown({ variant = 'header' }: ProfileDropdownProps) {
  const { isAuthenticated, user, setAuthModalOpen, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  if (!isAuthenticated || !user) {
    if (variant === 'searchbar') {
      return (
        <button
          onClick={() => setAuthModalOpen(true, 'login')}
          className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary hover:bg-primary/5 transition-colors bg-white shadow-sm pointer-events-auto"
        >
          Sign In
        </button>
      );
    }

    return (
      <button
        onClick={() => setAuthModalOpen(true, 'login')}
        className="border border-primary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/5 hover:border-primary transition-colors duration-200 bg-transparent"
      >
        Get Started
      </button>
    );
  }

  const avatarSizeClass = variant === 'searchbar' ? 'w-10 h-10' : 'w-9 h-9';

  return (
    <div className="relative">
      {/* Profile Avatar trigger */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center focus:outline-none group pointer-events-auto"
      >
        <div className={`${avatarSizeClass} rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold text-sm transition-all group-hover:border-primary/30 group-hover:bg-primary/10 shadow-sm`}>
          {getInitials(user.name)}
        </div>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <>
          {/* Backdrop overlay for closing dropdown */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2.5 w-60 bg-white border border-primary/10 rounded-2xl shadow-xl py-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto text-left">
            <div className="px-4 py-2 border-b border-neutral-100 mb-2">
              <div className="font-extrabold text-neutral-800 text-sm truncate">{user.name}</div>
              <div className="text-neutral-400 text-xs truncate mt-0.5">{user.email}</div>
              {user.course && (
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                  <UserIcon size={10} /> {user.course}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                alert("Profile Clicked");
                setDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors duration-200 flex items-center gap-2 font-bold"
            >
              <UserIcon size={16} />
              Profile
            </button>

            <button
              onClick={() => {
                alert("Settings Clicked");
                setDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors duration-200 flex items-center gap-2 font-bold"
            >
              <Settings size={16} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors duration-200 flex items-center gap-2 font-bold border-t border-neutral-100 mt-1 pt-3"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
