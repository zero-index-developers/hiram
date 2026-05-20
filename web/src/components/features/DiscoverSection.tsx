import type { Tag } from '@hiram/shared';
import { mockItems } from '@hiram/shared';
import { useEffect, useState } from 'react';
import { ItemCard } from './ItemCard';
import { DiscoverHeader } from './DiscoverHeader';
import { DiscoverMasterDetail } from './DiscoverMasterDetail';
import { DiscoverEmptyState } from './DiscoverEmptyState';

interface DiscoverSectionProps {
  selectedTags: Tag[];
  searchQuery: string;
  isSearchPage?: boolean;
}

type ViewMode = 'grid' | 'master-detail';

export function DiscoverSection({ selectedTags, searchQuery, isSearchPage = false }: DiscoverSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('master-detail');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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

  // Sync selected item when filters change
  useEffect(() => {
    if (filteredItems.length > 0) {
      // Keep existing selection if still in filtered list, otherwise reset to first
      const exists = filteredItems.some((item) => item.id === selectedItemId);
      if (!exists) {
        setSelectedItemId(filteredItems[0].id);
      }
    } else {
      setSelectedItemId(null);
    }
  }, [filteredItems, selectedItemId]);

  const selectedItem = filteredItems.find((item) => item.id === selectedItemId) || filteredItems[0];

  return (
    <main id="discover" className="max-w-6xl mx-auto px-8 py-20 flex-grow w-full">
      {/* Header bar with View Switcher */}
      <DiscoverHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        hasItems={filteredItems.length > 0}
        searchQuery={searchQuery}
        isSearchPage={isSearchPage}
      />

      {/* Main Content Area */}
      {filteredItems.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Master-Detail View Layout */
          <DiscoverMasterDetail
            filteredItems={filteredItems}
            selectedItem={selectedItem}
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
          />
        )
      ) : (
        /* Empty State with Recommendations */
        <DiscoverEmptyState />
      )}
    </main>
  );
}
