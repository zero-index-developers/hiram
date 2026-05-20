import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
    }
  }, [isAuthenticated, setAuthModalOpen]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
