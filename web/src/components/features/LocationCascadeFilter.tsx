import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { psgcService } from '@hiram/shared';
import type { Region, CityMunicipality, Barangay, Tag } from '@hiram/shared';

interface LocationCascadeFilterProps {
  selectedTags: Tag[];
  onSelectTag: (tag: Tag) => void;
  className?: string;
}

export function LocationCascadeFilter({
  selectedTags,
  onSelectTag,
  className = ''
}: LocationCascadeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // PSGC Data States
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<CityMunicipality[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);

  // Navigation state (which columns are open)
  const [navRegionCode, setNavRegionCode] = useState<string>('');
  const [navCityCode, setNavCityCode] = useState<string>('');

  // Local draft selection state before "Apply"
  const [localTag, setLocalTag] = useState<Tag | null>(null);

  // Active globally selected tag
  const activeRegion = selectedTags.find(t => t.type === 'REGION');
  const activeCity = selectedTags.find(t => t.type === 'CITY');
  const activeBarangay = selectedTags.find(t => t.type === 'BARANGAY');
  
  // Best display label
  const activeLabel = activeBarangay?.name || activeCity?.name || activeRegion?.name || 'All Locations';

  // Sync nav state when opened
  useEffect(() => {
    if (isOpen) {
      if (activeRegion) setNavRegionCode(activeRegion.slug);
      if (activeCity) setNavCityCode(activeCity.slug);
      
      const currentActiveTag = activeBarangay || activeCity || activeRegion || null;
      setLocalTag(currentActiveTag);
    }
  }, [isOpen, activeRegion, activeCity, activeBarangay]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Data Fetching
  useEffect(() => {
    psgcService.getRegions().then(data => {
      setRegions(data.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, []);

  useEffect(() => {
    if (!navRegionCode) {
      setCities([]);
      return;
    }
    psgcService.getCitiesAndMunicipalities(navRegionCode).then(data => {
      setCities(data.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, [navRegionCode]);

  useEffect(() => {
    if (!navCityCode) {
      setBarangays([]);
      return;
    }
    psgcService.getBarangays(navCityCode).then(data => {
      setBarangays(data.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, [navCityCode]);

  // Handlers
  const handleSelectRegion = (region: Region) => {
    setNavRegionCode(region.code);
    setNavCityCode('');
    setLocalTag({ slug: region.code, name: region.name, type: 'REGION' });
  };

  const handleSelectCity = (city: CityMunicipality) => {
    setNavCityCode(city.code);
    setLocalTag({ slug: city.code, name: city.name, type: 'CITY' });
  };

  const handleSelectBarangay = (brgy: Barangay) => {
    setLocalTag({ slug: brgy.code, name: brgy.name, type: 'BARANGAY' });
  };

  const handleApply = () => {
    // In App.tsx, handleSelectTag usually *replaces* the tag of the same type.
    // To handle clearing downstream gracefully, App.tsx checks type === 'REGION' and clears CITY/BARANGAY.
    // Wait, since we are only dispatching the deepest selected node (e.g. BARANGAY), 
    // we actually need to dispatch all nodes up the chain to App, OR App needs to know the full chain.
    // Wait! In DiscoverSection, we filter if item matches ANY of the region/city/brgy tags selected.
    // If we only dispatch the single localTag, then `selectedTags` will only have that one tag.
    // This is fine, because DiscoverSection checks:
    // matchesLocation = item.barangayCode === barangayTag.slug (if barangayTag exists).
    // So as long as we pass the deepest tag and ensure App clears the others, it works.
    
    // First, clear ALL location tags if they exist. We can do this by passing a dummy tag with slug='' for all types.
    // Since handleSelectTag in App.tsx doesn't take multiple tags natively, 
    // actually App.tsx's handleSelectTag already clears downstream!
    // But if we select a CITY, it clears BARANGAY. If we select BARANGAY, it doesn't clear CITY.
    // Let's just dispatch the most specific one. Wait, if we dispatch BARANGAY, region and city are lost?
    // Actually, App.tsx filters out the exact type passed, but keeps others.
    // This means if we switch from Region A to Region B, we dispatch REGION B, which clears CITY/BARANGAY in App.tsx. This is perfect.
    // But if we click "Clear All", we need to clear everything.
    
    if (localTag) {
      onSelectTag(localTag);
    } else {
      // Clear completely
      onSelectTag({ slug: '', name: '', type: 'REGION' });
      onSelectTag({ slug: '', name: '', type: 'CITY' });
      onSelectTag({ slug: '', name: '', type: 'BARANGAY' });
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalTag(null);
    setNavRegionCode('');
    setNavCityCode('');
  };

  return (
    <div className={`relative group ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-neutral-50/50 border ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-neutral-200'} rounded-lg pl-3 pr-8 py-1.5 text-sm font-semibold text-neutral-600 hover:border-primary/50 transition-all cursor-pointer flex items-center justify-between select-none h-full min-w-[150px]`}
      >
        <span className="truncate">{activeLabel}</span>
        <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
      </div>

      {/* Cascader Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-primary/10 rounded-xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 flex flex-col left-0 md:left-auto max-w-[90vw] overflow-x-auto">
          <div className="flex h-[320px] divide-x divide-neutral-100 bg-white">
            
            {/* Column 1: Regions */}
            <div className="w-[200px] flex-shrink-0 overflow-y-auto">
              <div className="p-1">
                {regions.map(region => {
                  const isActiveNav = navRegionCode === region.code;
                  const isSelected = localTag?.slug === region.code;
                  return (
                    <div
                      key={region.code}
                      onClick={() => handleSelectRegion(region)}
                      className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                        isActiveNav ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-neutral-50 font-medium'
                      }`}
                    >
                      <span className="truncate pr-2">{region.name}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <ChevronRight className={`w-4 h-4 shrink-0 ${isActiveNav ? 'text-primary' : 'text-neutral-300'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Cities */}
            {navRegionCode && (
              <div className="w-[220px] flex-shrink-0 overflow-y-auto bg-neutral-50/30">
                <div className="p-1">
                  {cities.length > 0 ? (
                    cities.map(city => {
                      const isActiveNav = navCityCode === city.code;
                      const isSelected = localTag?.slug === city.code;
                      return (
                        <div
                          key={city.code}
                          onClick={() => handleSelectCity(city)}
                          className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                            isActiveNav ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-white hover:shadow-sm font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{city.name}</span>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-primary shrink-0" />
                          ) : (
                            <ChevronRight className={`w-4 h-4 shrink-0 ${isActiveNav ? 'text-primary' : 'text-neutral-300'}`} />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-sm text-neutral-400">Loading cities...</div>
                  )}
                </div>
              </div>
            )}

            {/* Column 3: Barangays */}
            {navCityCode && (
              <div className="w-[200px] flex-shrink-0 overflow-y-auto bg-neutral-50/50">
                <div className="p-1">
                  {barangays.length > 0 ? (
                    barangays.map(brgy => {
                      const isSelected = localTag?.slug === brgy.code;
                      return (
                        <div
                          key={brgy.code}
                          onClick={() => handleSelectBarangay(brgy)}
                          className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-primary/10 text-primary font-bold' : 'text-neutral-600 hover:bg-white hover:shadow-sm font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{brgy.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-sm text-neutral-400">Loading barangays...</div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Bar: Actions */}
          <div className="border-t border-neutral-100 p-3 bg-white flex justify-between items-center sticky left-0 w-full">
            <span className="text-xs font-semibold text-neutral-500 truncate max-w-[200px]">
              {localTag ? localTag.name : 'No location selected'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-md shadow-sm hover:bg-primary/90 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
