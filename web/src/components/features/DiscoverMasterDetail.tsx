import type { Item } from '@hiram/shared';
import { formatDate } from '@hiram/shared';
import { ArrowRight, Clock, User, MapPin } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CompactItemImage, DetailItemImage } from './ItemImage';
import { useAuthStore } from '../../store/useAuthStore';

interface DiscoverMasterDetailProps {
  filteredItems: Item[];
  selectedItem: Item | undefined;
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
}

export function DiscoverMasterDetail({
  filteredItems,
  selectedItem,
  selectedItemId,
  onSelectItem
}: DiscoverMasterDetailProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();

  const handleRequestClick = () => {
    if (!selectedItem) return;
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
    } else {
      const slug = selectedItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + selectedItem.id;
      window.history.pushState(null, '', `/items/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Left Master List */}
      <div className="lg:w-2/5 w-full flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-2 scrollbar-minimal shrink-0">
        {filteredItems.map((item) => {
          const isSelected = selectedItemId === item.id;
          const ownerName = typeof item.owner === 'string' ? item.owner : item.owner?.name || 'Unknown';
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.id)}
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
                  <span
                    className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider border ${item.preferredTransaction === 'HIRAM'
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : item.preferredTransaction === 'TRADE'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}
                  >
                    {item.preferredTransaction === 'HIRAM' ? 'Hiram' : item.preferredTransaction === 'TRADE' ? 'Trade' : 'Request'}
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
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${selectedItem.preferredTransaction === 'HIRAM'
                      ? 'bg-blue-50 text-blue-600 border-blue-100'
                      : selectedItem.preferredTransaction === 'TRADE'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}
                >
                  {selectedItem.preferredTransaction === 'HIRAM' ? 'Hiram' : selectedItem.preferredTransaction === 'TRADE' ? 'Trade' : 'Request'}
                </span>
              )}
              <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" /> Listed {formatDate(selectedItem.createdAt)}
              </span>
              <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" /> {selectedItem.cityCode === '137607000' ? 'Taguig' : 'Manila'}
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
                    const ownerName =
                      typeof selectedItem.owner === 'string'
                        ? selectedItem.owner
                        : selectedItem.owner?.name || 'Unknown';
                    return ownerName.charAt(0);
                  })()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400 font-bold">Lender Profile</span>
                  <span className="text-sm font-bold text-neutral-800">
                    {typeof selectedItem.owner === 'string'
                      ? selectedItem.owner
                      : selectedItem.owner?.name || 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-black uppercase text-primary tracking-wider">
                <User className="w-3 h-3" /> Campus Verified
              </div>
            </div>

            {/* CTA Request Button */}
            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleRequestClick}
                variant="primary"
                className="px-6 py-3 text-sm flex items-center gap-2 font-black shadow-md shadow-primary/10 hover:translate-y-[-1px] active:translate-y-[1px] transition-all"
              >
                Request <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
