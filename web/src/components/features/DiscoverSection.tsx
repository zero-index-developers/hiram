import type { Tag } from '@hiram/shared';
import { formatDate, mockItems } from '@hiram/shared';
import { ArrowRight, Clock, Columns2, LayoutGrid, Package, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { LogoSymbol } from '../ui/Logo';
import { ItemCard } from './ItemCard';

interface DiscoverSectionProps {
  selectedTags: Tag[];
  searchQuery: string;
}

type ViewMode = 'grid' | 'master-detail';

interface CompactItemImageProps {
  src?: string;
  title: string;
}

function CompactItemImage({ src, title }: CompactItemImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-primary/5 flex items-center justify-center relative">
      {src && !imgError ? (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
              <LogoSymbol size="sm" className="text-primary/10" />
            </div>
          )}
          <img
            src={src}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-neutral-400 gap-1 w-full h-full bg-neutral-50">
          <LogoSymbol size="sm" className="text-neutral-300" />
        </div>
      )}
    </div>
  );
}

interface DetailItemImageProps {
  src?: string;
  title: string;
}

function DetailItemImage({ src, title }: DetailItemImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-neutral-50">
      {src && !imgError ? (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center z-10">
              <LogoSymbol size="lg" className="text-primary/10" />
            </div>
          )}
          <img
            src={src}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-neutral-400 gap-2 w-full h-full bg-neutral-50">
          <LogoSymbol size="lg" className="text-neutral-200" />
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">No Image Available</span>
        </div>
      )}
    </div>
  );
}

export function DiscoverSection({ selectedTags, searchQuery }: DiscoverSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('master-detail');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const filteredItems = mockItems.filter(item => {
    // 1. Text Search Filter (title/description match)
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category / Subcategory Filter from selectedTags
    const categoryTags = selectedTags.filter(t => t.type === 'CATEGORY' || t.type === 'SUBCATEGORY');

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

  // Sync selected item when filters change
  useEffect(() => {
    if (filteredItems.length > 0) {
      // Keep existing selection if still in filtered list, otherwise reset to first
      const exists = filteredItems.some(item => item.id === selectedItemId);
      if (!exists) {
        setSelectedItemId(filteredItems[0].id);
      }
    } else {
      setSelectedItemId(null);
    }
  }, [filteredItems, selectedItemId]);

  const selectedItem = filteredItems.find(item => item.id === selectedItemId) || filteredItems[0];

  return (
    <main id="discover" className="max-w-6xl mx-auto px-8 py-20 flex-grow w-full">
      {/* Header bar with View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-primary/5 pb-6">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-neutral-900">Discover Shared Resources</h3>
          <p className="text-neutral-500 text-sm mt-1.5 font-medium">Filter items available right now across the campus network.</p>
        </div>

        {/* Dynamic View Switcher Container */}
        {filteredItems.length > 0 && (
          <div className="flex items-center gap-1.5 bg-primary/5 p-1 rounded-xl border border-primary/10 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('master-detail')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'master-detail'
                  ? 'bg-white text-primary shadow-sm border border-primary/10'
                  : 'text-neutral-500 hover:text-primary'
                }`}
            >
              <Columns2 className="w-4 h-4" />
              Master-Detail
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'grid'
                  ? 'bg-white text-primary shadow-sm border border-primary/10'
                  : 'text-neutral-500 hover:text-primary'
                }`}
            >
              <LayoutGrid className="w-4 h-4" />
              3-Grid Row
            </button>
          </div>
        )}
      </div>

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
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* Left Master List */}
            <div className="lg:w-2/5 w-full flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-2 scrollbar-minimal shrink-0">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const ownerName = typeof item.owner === 'string' ? item.owner : item.owner?.name || 'Unknown';
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-primary/10 hover:border-primary/30 hover:bg-neutral-50/50 bg-white'
                      }`}
                  >
                    {/* Compact Image */}
                    <CompactItemImage src={item.image} title={item.title} />

                    {/* Metadata Summary */}
                    <div className="min-w-0 flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider border ${item.preferredTransaction === 'HIRAM'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                          {item.preferredTransaction === 'HIRAM' ? 'Hiram' : 'Trade'}
                        </span>
                        <span className="text-[9px] text-neutral-400 font-bold">
                          {item.condition}
                        </span>
                      </div>
                      <h5 className={`font-black text-sm truncate ${isSelected ? 'text-primary' : 'text-neutral-800'}`}>
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-neutral-400 font-bold truncate">
                        By {ownerName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Detail Pane */}
            {selectedItem && (
              <div className="flex-1 lg:w-3/5 w-full bg-white border border-primary/20 rounded-2xl overflow-hidden shadow-sm sticky top-24 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Visual Image Banner */}
                <div className="relative h-64 bg-neutral-50 flex items-center justify-center border-b border-primary/5">
                  <DetailItemImage 
                    key={selectedItem.id} 
                    src={selectedItem.image} 
                    title={selectedItem.title} 
                  />
                  <Badge variant="glass" className="absolute top-4 right-4 z-20">
                    {selectedItem.condition}
                  </Badge>
                </div>

                {/* Information details */}
                <div className="p-8 flex flex-col gap-6">
                  {/* Category & Date Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      {selectedItem.category}
                    </Badge>
                    {selectedItem.preferredTransaction && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${selectedItem.preferredTransaction === 'HIRAM'
                          ? 'bg-blue-50 text-blue-600 border-blue-100'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                        {selectedItem.preferredTransaction === 'HIRAM' ? 'Hiram' : 'Trade'}
                      </span>
                    )}
                    <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" /> Listed {formatDate(selectedItem.createdAt)}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-2xl font-black text-neutral-900 leading-tight">
                      {selectedItem.title}
                    </h4>
                    <p className="text-neutral-600 text-sm mt-3.5 leading-relaxed font-medium">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Lender Profile Card */}
                  <div className="border border-primary/10 rounded-xl p-4 bg-neutral-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-sm uppercase border border-primary/10 shrink-0">
                        {(() => {
                          const ownerName = typeof selectedItem.owner === 'string' ? selectedItem.owner : selectedItem.owner?.name || 'Unknown';
                          return ownerName.charAt(0);
                        })()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-neutral-400 font-bold">Lender Profile</span>
                        <span className="text-sm font-bold text-neutral-800">
                          {typeof selectedItem.owner === 'string' ? selectedItem.owner : selectedItem.owner?.name || 'Unknown'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-black uppercase text-primary tracking-wider">
                      <User className="w-3 h-3" /> Campus Verified
                    </div>
                  </div>

                  {/* CTA Request Button */}
                  <div className="pt-2 flex justify-end">
                    <Button variant="primary" className="px-6 py-3 text-sm flex items-center gap-2 font-black shadow-md shadow-primary/10 hover:translate-y-[-1px] active:translate-y-[1px] transition-all">
                      Request to Borrow <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        /* Empty State with Recommendations */
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
      )}
    </main>
  );
}
