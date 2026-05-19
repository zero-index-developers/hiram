import type { Tag, TagType } from '@hiram/shared';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LogoSymbol } from '../ui/Logo';
import { FilterSelectGroup } from './FilterSelectGroup';

interface HeroSearchBarProps {
  selectedTags: Tag[];
  onSelectTag: (tag: Tag) => void;
  onApplyTags?: (tags: Tag[], typesToReplace: TagType[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function HeroSearchBar({ selectedTags, onSelectTag, onApplyTags, searchQuery, setSearchQuery }: HeroSearchBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 215);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`sticky top-0 pt-4 z-50 bg-background w-full px-6 flex flex-col items-center justify-center pointer-events-none transition-shadow duration-300 ${isSticky ? 'shadow-sm border-b border-primary/5 pb-4' : ''}`}>
        <div className='max-w-3xl w-full'>
          <div className='flex gap-2'>
            <div
              className={`flex items-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isSticky
                ? 'w-8 opacity-100 ml-3 mr-1 translate-x-0 scale-100'
                : 'w-0 opacity-0 ml-0 mr-0 translate-x-8 scale-50'
                }`}
            >
              <LogoSymbol size="xl" className="text-primary" />
            </div>
            <div className={`pointer-events-auto w-full max-w-7xl flex flex-col bg-white border border-primary/10 shadow-sm transition-all duration-300 rounded-3xl sm:rounded-full p-2`}>

              {/* Main Search Row */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex-1 flex items-center gap-2 w-full px-4 sm:px-2 py-2 sm:py-0 rounded-full sm:rounded-none min-h-[44px]">
                  <Search className="w-6 h-6 text-neutral-400 font-black hidden sm:block text-primary mr-4 shrink-0" />

                  <input
                    className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 font-medium h-full"
                    placeholder="Item name, category, or lender..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button className="bg-primary text-white rounded-full px-8 py-3 sm:py-2.5 text-sm font-black hover:bg-primary/90 transition w-full sm:w-auto shrink-0 shadow-sm">
                  Search
                </button>

              </div>
            </div>


            <div
              className={`flex items-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isSticky
                ? 'w-10 opacity-100 ml-1 mr-1 translate-x-0 scale-100 pointer-events-auto'
                : 'w-0 opacity-0 ml-0 mr-0 -translate-x-8 scale-50 pointer-events-none'
                }`}
            >
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-colors shadow-sm ${isFilterOpen
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-primary/10 bg-white text-neutral-600 hover:bg-primary/5 hover:text-primary'
                  }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Filter Area */}
          <div className={`overflow-visible transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex justify-center ${(!isSticky || isFilterOpen) ? 'max-h-96 opacity-100 pt-3 pb-1 px-4 mt-2 pointer-events-auto' : 'max-h-0 opacity-0 pt-0 pb-0 mt-0 px-4 border-transparent pointer-events-none'
            }`}>
            <FilterSelectGroup
              selectedTags={selectedTags}
              onSelectTag={onSelectTag}
              onApplyTags={onApplyTags}
            />
          </div>
        </div>
      </div>
    </>
  );
}
