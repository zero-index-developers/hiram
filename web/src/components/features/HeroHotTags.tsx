import { HOT_TAGS } from '@hiram/shared';
import { Flame } from 'lucide-react';

interface HeroHotTagsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function HeroHotTags({ searchQuery, setSearchQuery }: HeroHotTagsProps) {
  return (
    <section className="relative w-full pt-6 pb-4 px-6 flex flex-col items-center pointer-events-auto">
      <div className="max-w-[800px] w-full mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs max-w-2xl">
          <span className="text-neutral-500 font-bold uppercase tracking-wider text-[10px] mr-1 flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500 animate-pulse" /> Hot:
          </span>
          {HOT_TAGS.map(tag => {
            const isSelected = searchQuery.toLowerCase() === tag.name.toLowerCase();
            const handleClick = () => {
              if (isSelected) {
                setSearchQuery('');
              } else {
                setSearchQuery(tag.name);
              }
            };

            return (
              <button 
                key={tag.slug} 
                onClick={handleClick}
                className={`border rounded-full px-3.5 py-1.5 transition-all font-semibold shadow-sm ${
                  isSelected 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-primary/10 bg-white text-neutral-600 hover:border-primary/30 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
