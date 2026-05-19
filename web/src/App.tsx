import { useState } from 'react';
import type { Tag } from '@hiram/shared';
import { CAMPUS_LOCATIONS } from '@hiram/shared';
import { DiscoverSection } from './components/features/DiscoverSection';
import { Hero } from './components/features/Hero';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

function App() {
  const defaultLocation = CAMPUS_LOCATIONS.find(l => l.slug === 'pup-manila') || CAMPUS_LOCATIONS[0];
  const [selectedTags, setSelectedTags] = useState<Tag[]>([defaultLocation]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags(prev => {
      const filtered = prev.filter(t => t.type !== tag.type);
      if (tag.slug) {
        return [...filtered, tag];
      }
      return filtered;
    });
  };

  const handleToggleTag = (tag: Tag) => {
    setSelectedTags(prev =>
      prev.some(t => t.slug === tag.slug)
        ? prev.filter(t => t.slug !== tag.slug)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background text-neutral-800 flex flex-col font-sans w-full transition-colors duration-300">
      {/* Structural layout: Header */}
      <Header />

      {/* Hero Intro */}
      <Hero 
        selectedTags={selectedTags}
        onSelectTag={handleSelectTag}
        onToggleTag={handleToggleTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Discover Hub */}
      <DiscoverSection 
        selectedTags={selectedTags}
        searchQuery={searchQuery}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

