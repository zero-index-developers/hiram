import { useState, useEffect } from 'react';
import type { Tag } from '@hiram/shared';

export interface BaseProps {
  options: Tag[];
  placeholder: string;
  className?: string;
  onHover?: (slug: string) => void;
  forceNested?: boolean;
}

export interface RadioProps extends BaseProps {
  variant: 'radio';
  value?: string;
  onChange?: (tag: Tag | null) => void;
}

export interface CheckboxProps extends BaseProps {
  variant: 'checkbox';
  values?: Tag[];
  onApply?: (tags: Tag[]) => void;
}

export type FilterSelectProps = RadioProps | CheckboxProps;

function findTag(options: Tag[], slug: string): Tag | undefined {
  for (const opt of options) {
    if (opt.slug === slug) return opt;
    const sub = opt.subcategories?.find(s => s.slug === slug);
    if (sub) return sub;
  }
}

export function useFilterTree(props: FilterSelectProps, ref: React.RefObject<HTMLDivElement>) {
  const { variant, options, placeholder, onHover, forceNested } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(options[0]?.slug || '');
  const [localTags, setLocalTags] = useState<Tag[]>([]);

  const hasNested = forceNested || options.some(o => (o.subcategories?.length ?? 0) > 0);
  
  let activeSubs = options.find(o => o.slug === activeSlug)?.subcategories || [];
  if (activeSubs.length === 0 && options.length > 0) {
    activeSubs = options[0].subcategories || [];
  }

  const handleHover = (slug: string) => {
    setActiveSlug(slug);
    onHover?.(slug);
  };

  // Sync local tags on open (checkbox)
  useEffect(() => {
    if (isOpen && variant === 'checkbox') {
      setLocalTags((props as CheckboxProps).values || []);
    }
  }, [isOpen, variant, props]);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, ref]);

  const pluralize = (word: string) => {
    if (word.toLowerCase().endsWith('y')) {
      return word.slice(0, -1) + 'ies';
    }
    return word + 's';
  };

  // Display label
  let label = `All ${pluralize(placeholder)}`;
  if (variant === 'radio') {
    const v = (props as RadioProps).value;
    if (v) { const t = findTag(options, v); if (t) label = t.name; }
  } else {
    const v = (props as CheckboxProps).values || [];
    
    // Find all fully selected parent options (all subcategories of that parent are checked)
    const fullySelectedParents = options.filter(opt => {
      const subs = opt.subcategories || [];
      if (subs.length === 0) return false;
      return subs.every(sub => v.some(val => val.slug === sub.slug));
    });

    const simplifiedTags: Tag[] = [];
    fullySelectedParents.forEach(p => {
      simplifiedTags.push(p);
    });

    const fullySelectedParentSlugs = new Set(fullySelectedParents.map(p => p.slug));
    const childSlugsOfFullySelected = new Set(
      fullySelectedParents.flatMap(p => (p.subcategories || []).map(sub => sub.slug))
    );

    v.forEach(val => {
      if (fullySelectedParentSlugs.has(val.slug)) return;
      if (childSlugsOfFullySelected.has(val.slug)) return;
      simplifiedTags.push(val);
    });

    if (simplifiedTags.length === 1) {
      label = simplifiedTags[0].name;
    } else if (simplifiedTags.length > 1) {
      const allRegions = simplifiedTags.every(t => t.type === 'REGION');
      const allCities = simplifiedTags.every(t => t.type === 'CITY');
      
      let displayPlaceholder = placeholder;
      if (placeholder.toLowerCase() === 'location') {
        if (allRegions) displayPlaceholder = 'Region';
        else if (allCities) displayPlaceholder = 'City';
      }
      
      label = `${simplifiedTags.length} ${pluralize(displayPlaceholder)}`;
    }
  }

  const selectRadio = (tag: Tag | null) => {
    (props as RadioProps).onChange?.(tag);
    setIsOpen(false);
  };

  const toggleCheck = (tag: Tag) => {
    setLocalTags(prev => {
      // Find parent of this tag (if it is a subcategory)
      const parent = options.find(o => 
        o.subcategories?.some(sub => sub.slug === tag.slug)
      );

      const isSelected = prev.some(t => t.slug === tag.slug);

      if (parent) {
        // Tag is a subcategory (child)
        if (isSelected) {
          // Unchecking a subcategory -> Remove this subcategory and the parent region
          return prev.filter(t => t.slug !== tag.slug && t.slug !== parent.slug);
        } else {
          // Checking a subcategory -> Add this subcategory
          const next = [...prev, tag];
          
          // Check if ALL subcategories of this parent are now checked
          const siblings = parent.subcategories || [];
          const allSiblingsChecked = siblings.every(sub =>
            sub.slug === tag.slug || prev.some(t => t.slug === sub.slug)
          );
          
          if (allSiblingsChecked && !prev.some(t => t.slug === parent.slug)) {
            // Also check the parent region!
            return [...next, parent];
          }
          return next;
        }
      } else {
        // Tag is a parent (region / main category)
        const children = tag.subcategories || [];
        const childSlugs = new Set(children.map(c => c.slug));

        if (isSelected) {
          // Unchecking parent -> Remove parent + all children
          return prev.filter(t => t.slug !== tag.slug && !childSlugs.has(t.slug));
        } else {
          // Checking parent -> Add parent + all children not already checked
          const existing = new Set(prev.map(t => t.slug));
          const toAdd = [tag, ...children].filter(t => !existing.has(t.slug));
          return [...prev, ...toAdd];
        }
      }
    });
  };

  return {
    isOpen,
    setIsOpen,
    activeSlug,
    setActiveSlug,
    localTags,
    setLocalTags,
    hasNested,
    activeSubs,
    handleHover,
    label,
    selectRadio,
    toggleCheck
  };
}
