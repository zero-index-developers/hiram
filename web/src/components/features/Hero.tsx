import { useState } from 'react';
import type { Tag } from '@hiram/shared';
import { CAMPUS_LOCATIONS } from '@hiram/shared';
import { HeroHotTags } from './HeroHotTags';
import { HeroSearchBar } from './HeroSearchBar';

export function Hero() {
  const defaultLocation = CAMPUS_LOCATIONS.find(l => l.slug === 'pup-manila') || CAMPUS_LOCATIONS[0];
  const [selectedTags, setSelectedTags] = useState<Tag[]>([defaultLocation]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags(prev => {
      const filtered = prev.filter(t => t.type !== tag.type);
      return [...filtered, tag];
    });
  };

  return (
    <>
      <section className="relative w-full bg-background pt-20 pb-10 px-6 flex flex-col items-center">
        <div className="max-w-[800px] w-full mx-auto flex flex-col items-center">
          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 text-center leading-none tracking-tight mt-4">
            <span className="text-accent">Hiram.</span> Trade. This is the platform.
          </h1>
        </div>
      </section>

      <HeroSearchBar 
        selectedTags={selectedTags}
        onSelectTag={handleSelectTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <HeroHotTags 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}
