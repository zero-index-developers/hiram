import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

let lastPage: string | null = null;

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

export function BackButton({ fallbackPath = '/', className = '' }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const pathBefore = lastPage;
  lastPage = currentPath;

  const handleBack = () => {
    if (pathBefore && pathBefore !== currentPath) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`w-10 h-10 rounded-full bg-white border border-primary/10 shadow-sm hover:shadow flex items-center justify-center transition-colors text-neutral-600 hover:text-primary hover:border-primary/30 cursor-pointer ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
    </button>
  );
}
