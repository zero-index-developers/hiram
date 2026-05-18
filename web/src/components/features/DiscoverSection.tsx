import { useState } from 'react';
import { Search, Grid, BookOpen, Camera, Paintbrush, FolderClosed, Package } from 'lucide-react';
import { CategoryFilters } from './CategoryFilters';
import { ItemCard } from './ItemCard';
import { mockItems } from '../../data/mockItems';

export function DiscoverSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { value: 'ALL', label: 'All Resources', icon: Grid },
    { value: 'ACADEMICS', label: 'Academics', icon: BookOpen },
    { value: 'ELECTRONICS', label: 'Electronics', icon: Camera },
    { value: 'CREATIVE', label: 'Creative & Art', icon: Paintbrush },
    { value: 'ORGANIZATION', label: 'Organization', icon: FolderClosed }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main id="discover" className="max-w-6xl mx-auto px-8 py-20 flex-grow w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-white">Discover Shared Resources</h3>
          <p className="text-white/60 text-sm mt-1.5 font-medium">Filter items available right now across the campus network.</p>
        </div>
      </div>

      {/* Categories Tabbar */}
      <CategoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Display Item Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-transparent border border-white/10 rounded-2xl p-16 text-center max-w-xl mx-auto">
          <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h4 className="font-extrabold text-xl text-white">No resources found</h4>
          <p className="text-white/60 text-sm mt-1.5 font-medium">Try refining your filter categories or checking spelling.</p>
        </div>
      )}
    </main>
  );
}
