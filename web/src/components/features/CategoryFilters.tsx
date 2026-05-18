import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

interface Category {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export function CategoryFilters({
  categories,
  selectedCategory,
  setSelectedCategory
}: CategoryFiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.5;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Check scroll state after animation
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative mb-8 group">
      {/* Left Gradient & Arrow */}
      <div 
        className={`absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-black via-black/80 to-transparent z-10 flex items-center justify-start transition-opacity duration-300 pointer-events-none ${
          canScrollLeft ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`bg-black/80 border border-white/20 text-white rounded-full p-1.5 hover:bg-white/10 hover:text-primary transition-colors shadow-lg ml-1 ${
            canScrollLeft ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition shrink-0 duration-300 ${isSelected
                ? 'bg-primary/50 border border-primary text-white'
                : 'bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/50'
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Right Gradient & Arrow */}
      <div 
        className={`absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-black via-black/80 to-transparent z-10 flex items-center justify-end transition-opacity duration-300 pointer-events-none ${
          canScrollRight ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`bg-black/80 border border-white/20 text-white rounded-full p-1.5 hover:bg-white/10 hover:text-primary transition-colors shadow-lg mr-1 ${
            canScrollRight ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
