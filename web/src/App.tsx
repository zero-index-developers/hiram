import { useEffect, useState } from 'react';
import { useSearchFilters } from './hooks/useSearchFilters';
import { DiscoverSection } from './components/features/DiscoverSection';
import { Hero } from './components/features/Hero';
import { HeroSearchBar } from './components/features/HeroSearchBar';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { AuthModal } from './components/features/AuthModal';
import { ItemDetailsPage } from './components/features/ItemDetailsPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const {
    selectedTags,
    searchQuery,
    setSearchQuery,
    handleSelectTag,
    handleApplyTags,
    clearAllFilters
  } = useSearchFilters();

  const initAuth = useAuthStore((state) => state.initAuth);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateBack = () => {
    window.history.pushState(null, '', '/');
    setCurrentPath('/');
  };

  const isItemDetails = currentPath.startsWith('/items/');
  const itemSlug = isItemDetails ? currentPath.replace('/items/', '') : '';

  return (
    <div className="min-h-screen bg-background text-neutral-800 flex flex-col font-sans w-full transition-colors duration-300">
      {/* Structural layout: Header / Search Bar */}
      {!isItemDetails ? (
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
      <Footer />

      {/* Authentication Dialog */}
      <AuthModal />
    </div>
  );
}

export default App;

