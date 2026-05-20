import { Columns2, LayoutGrid } from 'lucide-react';

type ViewMode = 'grid' | 'master-detail';

interface DiscoverHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  hasItems: boolean;
  searchQuery?: string;
  isSearchPage?: boolean;
}

export function DiscoverHeader({ viewMode, onViewModeChange, hasItems, searchQuery = '', isSearchPage = false }: DiscoverHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-primary/5 pb-6">
      <div>
        {isSearchPage ? (
          <>
            <h3 className="text-3xl font-black tracking-tight text-neutral-900">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Search Results'}
            </h3>
            <p className="text-neutral-500 text-sm mt-1.5 font-medium">Browse items matching your search criteria.</p>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-black tracking-tight text-neutral-900">Discover Shared Resources</h3>
            <p className="text-neutral-500 text-sm mt-1.5 font-medium">Filter items available right now across the campus network.</p>
          </>
        )}
      </div>

      {/* Dynamic View Switcher Container */}
      {hasItems && (
        <div className="flex items-center gap-1.5 bg-primary/5 p-1 rounded-xl border border-primary/10 shrink-0 self-start md:self-auto">
          <button
            onClick={() => onViewModeChange('master-detail')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'master-detail'
                ? 'bg-white text-primary shadow-sm border border-primary/10'
                : 'text-neutral-500 hover:text-primary'
              }`}
          >
            <Columns2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'grid'
                ? 'bg-white text-primary shadow-sm border border-primary/10'
                : 'text-neutral-500 hover:text-primary'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
