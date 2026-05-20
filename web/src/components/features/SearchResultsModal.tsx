import { useNavigate } from 'react-router-dom';
import type { Tag } from '@hiram/shared';
import { mockItems } from '@hiram/shared';
import { SearchResultCard } from './SearchResultCard';
import { LogoSymbol } from '../ui/Logo';
import { Search } from 'lucide-react';

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTags: Tag[];
  searchQuery: string;
}

export function SearchResultsModal({
  isOpen,
  onClose,
  selectedTags,
  searchQuery
}: SearchResultsModalProps) {
  const navigate = useNavigate();

  // Re-use the exact same item matching logic as DiscoverSection
  const filteredItems = mockItems.filter((item) => {
    // 1. Text Search Filter (title/description match)
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category / Subcategory Filter from selectedTags
    const categoryTags = selectedTags.filter((t) => t.type === 'CATEGORY' || t.type === 'SUBCATEGORY');
    const matchesCategory =
      categoryTags.length === 0 ||
      categoryTags.some((tag) => {
        if (tag.type === 'CATEGORY') return item.category === tag.slug;
        if (tag.type === 'SUBCATEGORY') return item.subcategory === tag.slug;
        return false;
      });

    // 3. Condition Filter from selectedTags
    const conditionTags = selectedTags.filter((t) => t.type === 'CONDITION');
    const matchesCondition =
      conditionTags.length === 0 ||
      conditionTags.some((tag) => item.condition === tag.slug);

    // 4. Transaction Filter from selectedTags
    const transactionTags = selectedTags.filter((t) => t.type === 'TRANSACTION');
    const matchesTransaction =
      transactionTags.length === 0 ||
      transactionTags.some((tag) => item.preferredTransaction === tag.slug);

    // 5. Location Cascading Filter
    const regionTags = selectedTags.filter((t) => t.type === 'REGION');
    const cityTags = selectedTags.filter((t) => t.type === 'CITY');
    const barangayTags = selectedTags.filter((t) => t.type === 'BARANGAY');

    const hasLocationFilters = regionTags.length > 0 || cityTags.length > 0 || barangayTags.length > 0;
    const matchesLocation =
      !hasLocationFilters ||
      (barangayTags.some((tag) => item.barangayCode === tag.slug) ||
        cityTags.some((tag) => item.cityCode === tag.slug) ||
        regionTags.some((tag) => item.regionCode === tag.slug));

    return matchesSearch && matchesCategory && matchesCondition && matchesTransaction && matchesLocation;
  });

  const handleItemClick = (itemId: string, itemTitle: string) => {
    const slug = itemTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + itemId;
    navigate(`/items/${slug}`);
    setTimeout(() => {
      onClose();
    }, 10);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-4 z-50 bg-white shadow-2xl border border-primary/10 h-[500px] max-h-[60vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
      <p className="text-xs text-right  p-4 w-full text-neutral-400 font-medium">
        Found <b className='text-primary'>{filteredItems.length}</b> matching items
      </p>

      <div className="flex-1 overflow-y-auto scrollbar-minimal p-6 bg-neutral-50/30 pb-20">
        {filteredItems.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredItems.map((item) => (
              <SearchResultCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item.id, item.title)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
            <LogoSymbol size="xl" className="text-neutral-200 mb-4 animate-bounce" />
            <h3 className="font-extrabold text-neutral-700 text-sm">No items matched your search</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm font-medium">
              Try adjusting your query, categories, or location tags to see different listings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
