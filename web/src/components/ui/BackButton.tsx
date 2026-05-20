import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

export function BackButton({ fallbackPath = '/', className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    // In React Router, window.history.state?.idx specifies if we have page history in our app.
    // If idx > 0, it means there are previous pages in the router session history we can safely go back to.
    const state = window.history.state as { idx?: number } | null;
    if (state && typeof state.idx === 'number' && state.idx > 0) {
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
