import { LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { VerifiedBadge } from '../ui/VerifiedBadge';

interface ProfileDropdownProps {
  variant?: 'header' | 'searchbar';
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ProfileDropdown({
  variant = 'header',
  isOpen,
  onToggle,
  onClose
}: ProfileDropdownProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isAuthenticated || !user) {
    return null; // Handled by parent container UserActionsBar
  }

  const avatarSizeClass = variant === 'searchbar' ? 'w-10 h-10' : 'w-9 h-9';

  return (
    <div className="relative">
      {/* Profile Avatar trigger */}
      <button
        onClick={onToggle}
        className="flex items-center focus:outline-none group pointer-events-auto"
      >
        <div className={`${avatarSizeClass} rounded-full overflow-hidden bg-primary/5 text-primary border border-primary/10 flex items-center justify-center font-bold text-sm transition-all group-hover:border-primary/30 group-hover:bg-primary/10 shadow-sm`}>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            getInitials(user.name)
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop overlay for closing dropdown (with pointer-events-auto to override container lock) */}
          <div
            className="fixed inset-0 z-30 pointer-events-auto"
            onClick={onClose}
          />
          <div className="absolute right-0 mt-2.5 w-60 bg-white border border-primary/10 rounded-2xl shadow-xl py-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto text-left">
            <div className="px-4 py-2 border-b border-neutral-100 mb-2">
              <div className="font-extrabold text-neutral-800 text-sm flex items-center gap-1.5 truncate">
                {user.name}
                {user.studentId && <VerifiedBadge iconSize={14} />}
              </div>
              <div className="text-neutral-400 text-xs truncate mt-0.5">{user.email}</div>
              {user.course && (
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                  <UserIcon size={10} /> {user.course}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                navigate('/profile');
                onClose();
              }}
              className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors duration-200 flex items-center gap-2 font-bold"
            >
              <UserIcon size={16} />
              Profile
            </button>

            <button
              onClick={() => {
                alert("Settings Clicked");
                onClose();
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
