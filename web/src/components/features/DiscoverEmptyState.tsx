import { mockItems } from '@hiram/shared';
import { Package } from 'lucide-react';
import { ItemCard } from './ItemCard';

export function DiscoverEmptyState() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white border border-primary/10 rounded-2xl p-16 text-center max-w-xl mx-auto shadow-sm mb-16">
        <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h4 className="font-extrabold text-xl text-neutral-800">No resources found</h4>
        <p className="text-neutral-500 text-sm mt-1.5 font-medium">Try refining your filter categories or checking spelling.</p>
      </div>

      <div className="w-full border-t border-neutral-100 pt-12">
        <h4 className="text-xl font-black text-neutral-950 mb-6">Recommended for You</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockItems.slice(0, 3).map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
