import { useEffect, useState } from 'react';
import type { Tag, TagType } from '@hiram/shared';
import { FILTERS_CONFIG, psgcService } from '@hiram/shared';
import { FilterSelect } from '../ui/FilterSelect';

interface FilterSelectGroupProps {
  selectedTags: Tag[];
  onSelectTag: (tag: Tag) => void;
  onApplyTags?: (tags: Tag[], typesToReplace: TagType[]) => void;
  className?: string;
}

export function FilterSelectGroup({
  selectedTags,
  onSelectTag,
  onApplyTags,
  className = ''
}: FilterSelectGroupProps) {
  // Location States
  const [regions, setRegions] = useState<Tag[]>([]);
  const [citiesMap, setCitiesMap] = useState<Record<string, Tag[]>>({});

  useEffect(() => {
    psgcService.getRegions().then(data => {
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      // Prioritize NCR (National Capital Region) to be first
      const ncrIndex = sorted.findIndex(r => r.name.toUpperCase().includes('NCR') || r.name.toUpperCase().includes('NATIONAL CAPITAL REGION'));
      let ordered = [...sorted];
      if (ncrIndex > -1) {
        const [ncr] = ordered.splice(ncrIndex, 1);
        ordered = [ncr, ...ordered];
      }

      const regionTags: Tag[] = ordered.map(r => ({
        slug: r.code,
        name: r.name,
        type: 'REGION'
      }));
      setRegions(regionTags);

      // Pre-fetch NCR cities immediately so they are loaded as default
      if (regionTags.length > 0) {
        const ncrCode = regionTags[0].slug;
        psgcService.getCitiesAndMunicipalities(ncrCode).then(citiesData => {
          const sortedCities = citiesData.sort((a, b) => a.name.localeCompare(b.name));
          const cityTags: Tag[] = sortedCities.map(c => ({
            slug: c.code,
            name: c.name,
            type: 'CITY'
          }));
          setCitiesMap(prev => ({ ...prev, [ncrCode]: cityTags }));
        });
      }
    });
  }, []);

  const handleLocationHover = (slug: string) => {
    const region = regions.find(r => r.slug === slug);
    if (region && !citiesMap[slug]) {
      psgcService.getCitiesAndMunicipalities(slug).then(data => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        const cityTags: Tag[] = sorted.map(c => ({
          slug: c.code,
          name: c.name,
          type: 'CITY'
        }));
        setCitiesMap(prev => ({ ...prev, [slug]: cityTags }));
      });
    }
  };

  const locationOptions = regions.map(r => ({
    ...r,
    subcategories: citiesMap[r.slug] || []
  }));
  const activeLocationValues = selectedTags.filter(t => t.type === 'REGION' || t.type === 'CITY');

  return (
    <div className={`flex flex-wrap justify-center items-center gap-3 ${className}`}>
      {/* Location Filter */}
      <FilterSelect
        variant="checkbox"
        options={locationOptions}
        placeholder="Location"
        values={activeLocationValues}
        onApply={(tags) => onApplyTags?.(tags, ['REGION', 'CITY'])}
        onHover={handleLocationHover}
        forceNested={true}
      />

      {/* Config-Driven Filters */}
      {FILTERS_CONFIG.map((filter) => {
        // Collect all tag types in this filter's option tree
        const allTypes: TagType[] = [];
        const typeSet = new Set<string>();
        filter.options.forEach(o => {
          if (o.type && !typeSet.has(o.type)) { typeSet.add(o.type); allTypes.push(o.type); }
          o.subcategories?.forEach(s => { if (s.type && !typeSet.has(s.type)) { typeSet.add(s.type); allTypes.push(s.type); } });
        });
        const activeValues = selectedTags.filter(t => t.type && typeSet.has(t.type));

        if (filter.variant === 'checkbox') {
          return (
            <FilterSelect
              key={filter.type}
              variant="checkbox"
              options={filter.options}
              placeholder={filter.placeholder}
              values={activeValues}
              onApply={(tags) => onApplyTags?.(tags, allTypes)}
            />
          );
        }

        const selectedValue = selectedTags.find(t => t.type === filter.type)?.slug || '';
        return (
          <FilterSelect
            key={filter.type}
            variant="radio"
            options={filter.options}
            placeholder={filter.placeholder}
            value={selectedValue}
            onChange={(tag) => {
              if (tag) {
                onSelectTag(tag);
              } else {
                onSelectTag({ slug: '', name: '', type: filter.type });
              }
            }}
          />
        );
      })}
    </div>
  );
}
