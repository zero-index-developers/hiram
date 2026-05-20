import { useState } from 'react';
import { LogoSymbol } from '../ui/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { LogOut, User as UserIcon } from 'lucide-react';

export function Header() {
  const { isAuthenticated, user, setAuthModalOpen, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="w-full bg-background px-8 py-4 border-b border-primary/5 backdrop-blur-md bg-background/80">
      <div className="max-w-5xl mx-auto flex justify-between items-center w-full">
        {/* Logo mark: Small primary color geometric icon */}
        <div className="flex-shrink-0 flex items-center mr-18">
          <LogoSymbol size="md" className="text-primary w-8 h-8" />
        </div>

        {/* Nav links: 3 essential items */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-neutral-600 font-medium">
          <a href="#discover" className="hover:text-primary transition-colors duration-200">Discover</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors duration-200">How it Works</a>
          <a href="#trust" className="hover:text-primary transition-colors duration-200">About</a>
        </nav>

        {/* Auth Buttons / Profile Dropdown */}
        <div className="flex items-center gap-4 flex-shrink-0 relative">
          {isAuthenticated && user ? (
            <div>
              {/* Profile Avatar trigger */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                <div className="w-9 h-9 rounded-full bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold text-sm transition-all group-hover:border-primary/30 group-hover:bg-primary/10 shadow-sm">
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
                  <div className="absolute right-0 mt-2.5 w-60 bg-white border border-primary/10 rounded-2xl shadow-xl py-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
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
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors duration-200 flex items-center gap-2 font-bold"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Sign up: pill shape */
            <button
              onClick={() => setAuthModalOpen(true, 'login')}
              className="border border-primary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/5 hover:border-primary transition-colors duration-200 bg-transparent"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
