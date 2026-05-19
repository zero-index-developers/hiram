import { useState } from 'react';
import type { Tag, TagType } from '@hiram/shared';

export function useSearchFilters() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags(prev => {
      let filtered = prev.filter(t => t.type !== tag.type);
      
      // Cascade clear downstream locations
      if (tag.type === 'REGION') {
        filtered = filtered.filter(t => t.type !== 'CITY' && t.type !== 'BARANGAY');
      } else if (tag.type === 'CITY') {
        filtered = filtered.filter(t => t.type !== 'BARANGAY');
      }

      if (tag.slug) {
        return [...filtered, tag];
      }
      return filtered;
    });
  };

  const handleApplyTags = (tagsToApply: Tag[], typesToReplace: TagType[]) => {
    const replaceSet = new Set<string>(typesToReplace);
    setSelectedTags(prev => [
      ...prev.filter(t => !replaceSet.has(t.type as string)),
      ...tagsToApply,
    ]);
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  return {
    selectedTags,
    searchQuery,
    setSearchQuery,
    handleSelectTag,
    handleApplyTags,
    clearAllFilters
  };
}
