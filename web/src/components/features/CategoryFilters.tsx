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
        className={`absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 flex items-center justify-start transition-opacity duration-300 pointer-events-none ${
          canScrollLeft ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`bg-white border border-primary/10 text-neutral-600 rounded-full p-1.5 hover:bg-primary/5 hover:text-primary transition-all duration-200 shadow-sm ml-1 ${
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
                ? 'bg-primary border border-primary text-white shadow-sm'
                : 'bg-white border border-primary/10 text-neutral-600 hover:text-primary hover:border-primary/20 shadow-sm'
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
        className={`absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 flex items-center justify-end transition-opacity duration-300 pointer-events-none ${
          canScrollRight ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`bg-white border border-primary/10 text-neutral-600 rounded-full p-1.5 hover:bg-primary/5 hover:text-primary transition-all duration-200 shadow-sm mr-1 ${
            canScrollRight ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
