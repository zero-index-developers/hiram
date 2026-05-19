import { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckSquare, Square } from 'lucide-react';
import type { Tag } from '@hiram/shared';
import { ITEM_CATEGORIES } from '@hiram/shared/src/constants/categories'; // Adjust import if needed

interface CategoryNestedFilterProps {
  selectedTags: Tag[];
  onApplyTags: (tags: Tag[]) => void;
  className?: string;
}

export function CategoryNestedFilter({
  selectedTags,
  onApplyTags,
  className = ''
}: CategoryNestedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // The category currently hovered/selected on the left pane
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(ITEM_CATEGORIES[0]?.slug);
  
  // Local state for checkboxes before clicking "Apply"
  const [localTags, setLocalTags] = useState<Tag[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync localTags with selectedTags when popover opens
  useEffect(() => {
    if (isOpen) {
      setLocalTags(selectedTags.filter(t => t.type === 'CATEGORY' || t.type === 'SUBCATEGORY'));
    }
  }, [isOpen, selectedTags]);

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Calculate total selected count from active parent props (not local tags, for the closed button state)
  const activeCount = selectedTags.filter(t => t.type === 'CATEGORY' || t.type === 'SUBCATEGORY').length;

  const handleToggleLocalTag = (tag: Tag) => {
    setLocalTags(prev => {
      const isSelected = prev.some(t => t.slug === tag.slug);
      if (isSelected) {
        return prev.filter(t => t.slug !== tag.slug);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleApply = () => {
    onApplyTags(localTags);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalTags([]);
  };

  const activeCategory = ITEM_CATEGORIES.find(c => c.slug === activeCategorySlug);
  const subcategories = activeCategory?.subcategories || [];

  return (
    <div className={`relative group ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-neutral-50/50 border ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-neutral-200'} rounded-lg pl-3 pr-8 py-1.5 text-sm font-semibold text-neutral-600 hover:border-primary/50 transition-all cursor-pointer flex items-center justify-between select-none h-full min-w-[150px]`}
      >
        <span className="truncate">
          {activeCount > 0 ? `${activeCount} Category${activeCount > 1 ? 's' : ''}` : 'All Categories'}
        </span>
        <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-primary/10 rounded-xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 w-[500px] flex flex-col left-0 md:left-auto">
          <div className="flex h-[280px]">
            {/* Left Pane: Parent Categories */}
            <div className="w-1/2 border-r border-neutral-100 bg-neutral-50/30 overflow-y-auto">
              <div className="p-2 space-y-1">
                {ITEM_CATEGORIES.map(category => {
                  const isActiveHover = activeCategorySlug === category.slug;
                  const isChecked = localTags.some(t => t.slug === category.slug);
                  
                  return (
                    <div
                      key={category.slug}
                      onMouseEnter={() => setActiveCategorySlug(category.slug)}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                        isActiveHover ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-neutral-100 font-medium'
                      }`}
                    >
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleToggleLocalTag(category); }}
                        className="text-neutral-400 hover:text-primary transition-colors focus:outline-none"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <span className="truncate flex-1">{category.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Pane: Subcategories */}
            <div className="w-1/2 bg-white overflow-y-auto">
              <div className="p-2 space-y-1">
                {subcategories.length > 0 ? (
                  subcategories.map(subcat => {
                    const isChecked = localTags.some(t => t.slug === subcat.slug);
                    return (
                      <div
                        key={subcat.slug}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors text-neutral-600 hover:bg-neutral-50 font-medium"
                        onClick={() => handleToggleLocalTag(subcat)}
                      >
                        <button 
                          type="button"
                          className="text-neutral-400 hover:text-primary transition-colors focus:outline-none"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                        <span className="truncate flex-1">{subcat.name}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-sm text-neutral-400 italic">
                    No subcategories available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Actions */}
          <div className="border-t border-neutral-100 p-3 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-xs font-semibold text-neutral-500">
              {localTags.length} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-md shadow-sm hover:bg-primary/90 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
