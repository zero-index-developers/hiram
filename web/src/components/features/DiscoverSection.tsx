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

    // 2. Category Filter from selectedTags
    const categoryTag = selectedTags.find(t => t.type === 'CATEGORY');
    const matchesCategory = !categoryTag || item.category === categoryTag.slug;

    // 3. Condition Filter from selectedTags
    const conditionTag = selectedTags.find(t => t.type === 'CONDITION');
    const matchesCondition = !conditionTag || item.condition === conditionTag.slug;

    // 4. Transaction Filter from selectedTags
    const transactionTag = selectedTags.find(t => t.type === 'TRANSACTION');
    const matchesTransaction = !transactionTag || item.preferredTransaction === transactionTag.slug;

    return matchesSearch && matchesCategory && matchesCondition && matchesTransaction;
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
