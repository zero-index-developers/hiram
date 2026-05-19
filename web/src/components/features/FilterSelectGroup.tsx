import { FILTERS_CONFIG } from '@hiram/shared';
import type { Tag, TagType } from '@hiram/shared';
import { Select } from '../ui/Select';

interface FilterSelectGroupProps {
  selectedTags: Tag[];
  onSelectTag: (tag: Tag) => void;
  className?: string;
}

// Web-specific styling for the different filter dropdowns
const FILTER_CLASSES: Partial<Record<TagType, string>> = {
  LOCATION: 'min-w-[130px]',
  CATEGORY: 'min-w-[140px]',
  CONDITION: 'min-w-[120px]',
  TRANSACTION: 'min-w-[170px]',
};

export function FilterSelectGroup({
  selectedTags,
  onSelectTag,
  className = ''
}: FilterSelectGroupProps) {

  const handleSelect = (slug: string, filterType: TagType, sourceList: Tag[]) => {
    if (slug === 'ALL') {
      onSelectTag({ slug: '', name: '', type: filterType });
    } else {
      const tag = sourceList.find(t => t.slug === slug);
      if (tag) onSelectTag(tag);
    }
  };

  return (
    <div className={`flex flex-wrap justify-center items-center gap-3 ${className}`}>
      {FILTERS_CONFIG.map((filter) => {
        // Find the currently active tag for this specific filter type
        const selectedValue = selectedTags.find(t => t.type === filter.type)?.slug || 'ALL';
        const webClassName = FILTER_CLASSES[filter.type] || 'min-w-[120px]';

        return (
          <Select
            key={filter.type}
            value={selectedValue}
            onChange={(e) => handleSelect(e.target.value, filter.type, filter.options)}
            className={webClassName}
          >
            {filter.options.map(opt => (
              <option key={opt.slug} value={opt.slug}>{opt.name}</option>
            ))}
            <option value="ALL">All {filter.placeholder}s</option>
          </Select>
        );
      })}
    </div>
  );
}
