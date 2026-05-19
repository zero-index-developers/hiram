import { mockItems } from '@hiram/shared';
import type { Tag } from '@hiram/shared';
import { Package } from 'lucide-react';
import { ItemCard } from './ItemCard';

interface DiscoverSectionProps {
  selectedTags: Tag[];
  searchQuery: string;
}

export function DiscoverSection({ selectedTags, searchQuery }: DiscoverSectionProps) {
  const filteredItems = mockItems.filter(item => {
    // 1. Text Search Filter (title/description match)
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category / Subcategory Filter from selectedTags
    const categoryTags = selectedTags.filter(t => t.type === 'CATEGORY' || t.type === 'SUBCATEGORY');
    
    // If no category/subcategory tags are selected, it matches.
    // Otherwise, it must match at least one selected category OR subcategory.
    const matchesCategory = categoryTags.length === 0 || categoryTags.some(tag => {
      if (tag.type === 'CATEGORY') return item.category === tag.slug;
      if (tag.type === 'SUBCATEGORY') return item.subcategory === tag.slug;
      return false;
    });

    // 3. Condition Filter from selectedTags
    const conditionTag = selectedTags.find(t => t.type === 'CONDITION');
    const matchesCondition = !conditionTag || item.condition === conditionTag.slug;

    // 4. Transaction Filter from selectedTags
    const transactionTag = selectedTags.find(t => t.type === 'TRANSACTION');
    const matchesTransaction = !transactionTag || item.preferredTransaction === transactionTag.slug;

    // 5. Location Cascading Filter
    const regionTag = selectedTags.find(t => t.type === 'REGION');
    const cityTag = selectedTags.find(t => t.type === 'CITY');
    const barangayTag = selectedTags.find(t => t.type === 'BARANGAY');

    let matchesLocation = true;
    if (barangayTag) {
      matchesLocation = item.barangayCode === barangayTag.slug;
    } else if (cityTag) {
      matchesLocation = item.cityCode === cityTag.slug;
    } else if (regionTag) {
      matchesLocation = item.regionCode === regionTag.slug;
    }

    return matchesSearch && matchesCategory && matchesCondition && matchesTransaction && matchesLocation;
  });

  return (
    <main id="discover" className="max-w-6xl mx-auto px-8 py-20 flex-grow w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-neutral-900">Discover Shared Resources</h3>
          <p className="text-neutral-500 text-sm mt-1.5 font-medium">Filter items available right now across the campus network.</p>
        </div>
      </div>

      {/* Display Item Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-primary/10 rounded-2xl p-16 text-center max-w-xl mx-auto shadow-sm">
          <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h4 className="font-extrabold text-xl text-neutral-800">No resources found</h4>
          <p className="text-neutral-500 text-sm mt-1.5 font-medium">Try refining your filter categories or checking spelling.</p>
        </div>
      )}
    </main>
  );
}
