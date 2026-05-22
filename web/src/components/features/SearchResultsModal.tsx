import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mockItems, ITEM_CATEGORIES, HOT_TAGS } from '@hiram/shared';
import { Search, Sparkles, History, X } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchResultsModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery
}: SearchResultsModalProps) {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState<string[]>([]);

  // Load search history when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const history = localStorage.getItem('hiram_search_history');
        setHistoryList(history ? JSON.parse(history) : []);
      } catch {
        setHistoryList([]);
      }
    }
  }, [isOpen]);

  // Save term to search history helper
  const saveSearchToHistory = (query: string) => {
    if (!query.trim()) return;
    try {
      const history = localStorage.getItem('hiram_search_history');
      let searchHistory: string[] = history ? JSON.parse(history) : [];

      searchHistory = searchHistory.filter(q => q.toLowerCase() !== query.trim().toLowerCase());
      searchHistory.unshift(query.trim());
      searchHistory = searchHistory.slice(0, 8); // Keep last 8 searches

      localStorage.setItem('hiram_search_history', JSON.stringify(searchHistory));
      setHistoryList(searchHistory);
    } catch (e) {
      console.error(e);
    }
  };

  // Delete specific history item
  const handleDeleteHistoryItem = (e: React.MouseEvent, itemToDelete: string) => {
    e.stopPropagation();
    const updated = historyList.filter(item => item !== itemToDelete);
    setHistoryList(updated);
    localStorage.setItem('hiram_search_history', JSON.stringify(updated));
  };

  // Clear all search history
  const handleClearAllHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryList([]);
    localStorage.removeItem('hiram_search_history');
  };

  // Define static suggestible academic keywords
  const staticKeywords = [
    'Calculators',
    'Drafting Tools',
    'Reference Books',
    'Study Guides',
    'Academic Books',
    'Lab Equipment',
    'Tripods',
    'Cameras',
    'T-Square',
    'Engineering Books'
  ];

  // Collect all unique keywords from categories, hot tags, item titles, and static lists
  const allKeywords = Array.from(
    new Set([
      ...HOT_TAGS.map((t) => t.name),
      ...ITEM_CATEGORIES.map((c) => c.name),
      ...mockItems.map((item) => item.title),
      ...staticKeywords
    ])
  );

  // Filter keywords matching the search term
  const matchedKeywords = searchQuery.trim()
    ? allKeywords.filter((kw) =>
      kw.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    saveSearchToHistory(keyword);
    onClose();
    navigate('/search');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-14 left-0 right-0 mt-4 z-50 bg-white shadow-2xl border border-primary/10 rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto max-h-[450px]">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <span className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
          {searchQuery.trim() ? (
            <>
              <Search size={12} className="text-primary" /> Keyword Suggestions
            </>
          ) : historyList.length > 0 ? (
            <>
              <History size={12} className="text-primary" /> Recent Searches
            </>
          ) : (
            <>
              <Sparkles size={12} className="text-accent" /> Popular Campus Searches
            </>
          )}
        </span>

        {searchQuery.trim() ? (
          <span className="text-[10px] font-bold text-neutral-400">
            {matchedKeywords.length} suggestions
          </span>
        ) : historyList.length > 0 ? (
          <button
            onClick={handleClearAllHistory}
            className="text-[10px] font-black uppercase text-red-500 hover:text-red-600 transition-colors tracking-wider cursor-pointer"
          >
            Clear All
          </button>
        ) : null}
      </div>

      {/* Suggestion list body */}
      <div className="flex-1 overflow-y-auto scrollbar-minimal p-3 bg-white divide-y divide-neutral-50">
        {searchQuery.trim() ? (
          /* 1. Keyword search matching results */
          matchedKeywords.length > 0 ? (
            <div className="flex flex-col">
              {matchedKeywords.map((keyword, index) => (
                <button
                  key={`kw-${keyword}-${index}`}
                  onClick={() => handleKeywordClick(keyword)}
                  className="w-full text-left px-5 py-3.5 rounded-xl hover:text-primary transition-all duration-200 flex items-center gap-3 text-sm font-semibold text-neutral-700 cursor-pointer group animate-in fade-in duration-200"
                >
                  <Search size={14} className="text-neutral-400 group-hover:text-primary transition-colors shrink-0" />
                  <span className="truncate group-hover:translate-x-0.5 transition-transform duration-200">
                    {keyword}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState icon={Search} title="No matching keywords" description="Try searching with broader academic terms like 'calculator' or 'board'." className="bg-transparent border-none shadow-none" />
          )
        ) : historyList.length > 0 ? (
          /* 2. Recent Searches History list */
          <div className="flex flex-col">
            {historyList.map((item, index) => (
              <div
                key={`hist-${item}-${index}`}
                onClick={() => handleKeywordClick(item)}
                className="w-full px-5 py-3 rounded-xl hover:text-primary transition-all duration-200 flex items-center justify-between text-sm font-semibold text-neutral-700 cursor-pointer group animate-in fade-in duration-150"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <History size={14} className="text-neutral-400 group-hover:text-primary transition-colors shrink-0" />
                  <span className="truncate group-hover:translate-x-0.5 transition-transform duration-200">{item}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteHistoryItem(e, item)}
                  className="p-1 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-full transition-colors cursor-pointer shrink-0 opacity-0 group-hover:opacity-100"
                  title="Remove from history"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* 3. Fallback: Hot tags / Popular searches */
          <div className="flex flex-col">
            {HOT_TAGS.map((tag, index) => (
              <button
                key={`hot-${tag.slug}-${index}`}
                onClick={() => handleKeywordClick(tag.name)}
                className="w-full text-left px-5 py-3.5 rounded-xl hover:text-primary transition-all duration-200 flex items-center gap-3 text-sm font-semibold text-neutral-700 cursor-pointer group animate-in fade-in duration-150"
              >
                <Sparkles size={14} className="text-neutral-400 group-hover:text-primary transition-colors shrink-0" />
                <span className="truncate group-hover:translate-x-0.5 transition-transform duration-200">
                  {tag.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
