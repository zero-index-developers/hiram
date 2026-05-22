import { useNavigate } from "react-router-dom";
import { Avatar } from "../ui/Avatar";

interface UserSearchResultProps {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  studentId?: string | null;
}

export function UserSearchResult({
  id,
  name,
  email,
  avatarUrl,
  studentId,
}: UserSearchResultProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/profile/${id}`)}
      className="w-full text-left p-3 rounded-lg border border-primary/10 bg-white hover:bg-primary/5 hover:border-primary/20 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <Avatar name={name} src={avatarUrl} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neutral-900 truncate group-hover:text-primary transition-colors">
            {name}
          </p>
          <p className="text-xs text-neutral-500 truncate">
            {studentId ? `${studentId} • ${email}` : email}
          </p>
        </div>
      </div>
    </button>
  );
}
