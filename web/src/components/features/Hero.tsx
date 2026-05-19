import type { Tag } from '@hiram/shared';
import { HeroHotTags } from './HeroHotTags';
import { HeroSearchBar } from './HeroSearchBar';

interface HeroProps {
  selectedTags: Tag[];
  onSelectTag: (tag: Tag) => void;
  onApplyTags?: (tags: Tag[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Hero({ 
  selectedTags, 
  onSelectTag, 
  onApplyTags,
  searchQuery, 
  setSearchQuery 
}: HeroProps) {
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
        onSelectTag={onSelectTag}
        onApplyTags={onApplyTags}
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
