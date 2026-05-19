import { useState } from 'react';
import type { Tag, TagType } from '@hiram/shared';
import { DiscoverSection } from './components/features/DiscoverSection';
import { Hero } from './components/features/Hero';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

function App() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags(prev => {
      let filtered = prev.filter(t => t.type !== tag.type);
      
      // Cascade clear downstream locations
      if (tag.type === 'REGION') {
        filtered = filtered.filter(t => t.type !== 'CITY' && t.type !== 'BARANGAY');
      } else if (tag.type === 'CITY') {
        filtered = filtered.filter(t => t.type !== 'BARANGAY');
      }

      if (tag.slug) {
        return [...filtered, tag];
      }
      return filtered;
    });
  };

  const handleApplyTags = (tagsToApply: Tag[], typesToReplace: TagType[]) => {
    const replaceSet = new Set<string>(typesToReplace);
    setSelectedTags(prev => [
      ...prev.filter(t => !replaceSet.has(t.type as string)),
      ...tagsToApply,
    ]);
  };

  return (
    <div className="min-h-screen bg-background text-neutral-800 flex flex-col font-sans w-full transition-colors duration-300">
      {/* Structural layout: Header */}
      <Header />

      {/* Hero Intro */}
      <Hero 
        selectedTags={selectedTags}
        onSelectTag={handleSelectTag}
        onApplyTags={handleApplyTags}
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

