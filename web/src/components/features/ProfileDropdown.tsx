import { ChevronRight, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Avatar } from "../ui/Avatar";
import { Popover } from "../ui/Popover";
import { VerifiedBadge } from "../ui/VerifiedBadge";

interface ProfileDropdownProps {
  variant?: "header" | "searchbar";
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ProfileDropdown({
  variant = "header",
  isOpen,
  onToggle,
  onClose,
}: ProfileDropdownProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isAuthenticated || !user) {
    return null; // Handled by parent container UserActionsBar
  }

  return (
    <div className="relative">
      {/* Profile Avatar trigger */}
      <button
        onClick={onToggle}
        className="flex items-center focus:outline-none group pointer-events-auto"
      >
        <Avatar
          name={user.name}
          src={user.avatarUrl}
          size={variant === "searchbar" ? "md" : "sm"}
        />
      </button>

      {/* Dropdown Menu */}
      <Popover isOpen={isOpen} onClose={onClose} width="w-60" className="!pt-2">
        <button
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
          className="w-full px-4 py-3 border-b border-neutral-100 mb-2 transition-colors duration-200 text-left cursor-pointer dropdown-item"
        >
          <div className="font-black text-neutral-800 text-base flex items-center gap-1.5 truncate">
            {user.name}
            {user.studentId && (
              <VerifiedBadge iconSize={14} variant="icon-only" />
            )}
            <ChevronRight
              size={14}
              className="ml-auto text-neutral-300 shrink-0"
            />
          </div>
        </button>

        <button
          onClick={() => {
            navigate("/settings");
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary transition-colors duration-200 flex items-center gap-2 font-bold cursor-pointer dropdown-item"
        >
          <Settings size={16} />
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left text-sm text-neutral-600 hover:text-primary transition-colors duration-200 flex items-center gap-2 font-bold border-t border-neutral-100 mt-1 pt-3 dropdown-item"
        >
          <LogOut size={16} />
          Logout
        </button>
      </Popover>
    </div>
  );
}
