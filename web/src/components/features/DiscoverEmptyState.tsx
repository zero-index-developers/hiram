import { mockItems } from '@hiram/shared';
import { Package } from 'lucide-react';
import { ItemCard } from './ItemCard';
import { EmptyState } from '../ui/EmptyState';

export function DiscoverEmptyState() {
  return (
    <div className="flex flex-col items-center w-full">
      <EmptyState icon={Package} title="No resources found" description="Try refining your filter categories or checking spelling." />

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
