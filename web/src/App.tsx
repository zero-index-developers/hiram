import { useEffect, useRef } from 'react';
import { useSearchFilters } from './hooks/useSearchFilters';
import { DiscoverSection } from './components/features/DiscoverSection';
import { Hero } from './components/features/Hero';
import { HeroSearchBar } from './components/features/HeroSearchBar';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { AuthModal } from './components/features/AuthModal';
import { ItemDetailsPage } from './components/features/ItemDetailsPage';
import { InboxPage } from './components/features/InboxPage';
import { AlertsPage } from './components/features/AlertsPage';
import { useAuthStore } from './store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './components/features/ProtectedRoute';

function App() {
  const {
    selectedTags,
    searchQuery,
    setSearchQuery,
    handleSelectTag,
    handleApplyTags,
    clearAllFilters
  } = useSearchFilters();

  const { initAuth, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const prevAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Logout redirection guard: returns users to home screen on active session ending
  useEffect(() => {
    if (prevAuthRef.current && !isAuthenticated) {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, location.pathname, navigate]);

  const navigateBack = () => {
    navigate('/');
  };

  const isItemDetails = location.pathname.startsWith('/items/');
  const itemSlug = isItemDetails ? location.pathname.replace('/items/', '') : '';
  const isInbox = location.pathname === '/inbox';
  const isAlerts = location.pathname === '/alerts';

  return (
    <div className="min-h-screen bg-background text-neutral-800 flex flex-col font-sans w-full transition-colors duration-300">
      {/* Structural layout: Header / Search Bar */}
      {location.pathname === '/' ? (
        <Header />
      ) : (
        <HeroSearchBar
          selectedTags={selectedTags}
          onSelectTag={handleSelectTag}
          onApplyTags={handleApplyTags}
          onClearAll={clearAllFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          forceSticky={true}
        />
      )}

      {isItemDetails ? (
        <ItemDetailsPage slug={itemSlug} onBack={navigateBack} />
      ) : isInbox ? (
        <ProtectedRoute>
          <InboxPage onBack={navigateBack} />
        </ProtectedRoute>
      ) : isAlerts ? (
        <ProtectedRoute>
          <AlertsPage onBack={navigateBack} />
        </ProtectedRoute>
      ) : (
        <>
          {/* Hero Intro */}
          <Hero 
            selectedTags={selectedTags}
            onSelectTag={handleSelectTag}
            onApplyTags={handleApplyTags}
            onClearAll={clearAllFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Discover Hub */}
          <DiscoverSection 
            selectedTags={selectedTags}
            searchQuery={searchQuery}
          />
        </>
      )}

      {/* Footer */}
      {(!isInbox && !isAlerts) && <Footer />}

      {/* Authentication Dialog */}
      <AuthModal />
    </div>
  );
}

export default App;


