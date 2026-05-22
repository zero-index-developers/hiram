import { useRef } from 'react';
import { ChevronDown, Check, CheckSquare, Square } from 'lucide-react';
import { useFilterTree, type FilterSelectProps, type RadioProps, type CheckboxProps } from '../../hooks/useFilterTree';
import { FilterItem } from './FilterItem';

export function FilterSelect(props: FilterSelectProps) {
  const { variant, options, placeholder, className = '' } = props;
  const ref = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    setIsOpen,
    activeSlug,
    localTags,
    setLocalTags,
    hasNested,
    activeSubs,
    handleHover,
    label,
    selectRadio,
    toggleCheck
  } = useFilterTree(props, ref);

  return (
    <div className={`relative group ${className}`} ref={ref}>
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-neutral-50/50 border ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-neutral-200'} rounded-lg pl-3 pr-8 py-1.5 text-sm font-semibold text-neutral-600 hover:border-primary/50 transition-all cursor-pointer flex items-center select-none h-full min-w-[120px]`}
      >
        <span className="truncate">{label}</span>
        <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className={`absolute z-50 mt-2 bg-white border border-primary/10 rounded-xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 flex flex-col left-0 ${hasNested ? 'w-[460px]' : 'min-w-full w-max'}`}>
          <div className={`flex ${hasNested ? 'h-[280px]' : 'max-h-60'}`}>
            {/* Left / Main pane */}
            <div className={`overflow-y-auto scrollbar-minimal ${hasNested ? 'w-1/2 border-r border-neutral-100 bg-neutral-50/30' : 'w-full'}`}>
              <div className="p-1.5 flex flex-col gap-0.5">
                {/* "All" reset for radio flat lists */}
                {variant === 'radio' && !hasNested && (
                  <FilterItem icon="radio" selected={!(props as RadioProps).value} label={`All ${placeholder}s`} onClick={() => selectRadio(null)} />
                )}
                {options.map(opt => {
                  const isNav = activeSlug === opt.slug;
                  if (variant === 'radio') {
                    const sel = (props as RadioProps).value === opt.slug;
                    return hasNested ? (
                      <div key={opt.slug} onMouseEnter={() => handleHover(opt.slug)} onClick={() => selectRadio(opt)}
                        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${isNav ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-neutral-50 font-medium'}`}>
                        <span className="truncate pr-2">{opt.name}</span>
                        {sel && <Check className="w-4 h-4 text-primary shrink-0" />}
                      </div>
                    ) : (
                      <FilterItem key={opt.slug} icon="radio" selected={sel} label={opt.name} onClick={() => selectRadio(opt)} />
                    );
                  }
                  const chk = localTags.some(t => t.slug === opt.slug);
                  return hasNested ? (
                    <div key={opt.slug} onMouseEnter={() => handleHover(opt.slug)}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${isNav ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-neutral-100 font-medium'}`}>
                      <button type="button" onClick={(e) => { e.stopPropagation(); toggleCheck(opt); }} className="text-neutral-400 hover:text-primary transition-colors focus:outline-none">
                        {chk ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4" />}
                      </button>
                      <span className="truncate flex-1">{opt.name}</span>
                    </div>
                  ) : (
                    <FilterItem key={opt.slug} icon="checkbox" selected={chk} label={opt.name} onClick={() => toggleCheck(opt)} />
                  );
                })}
              </div>
            </div>

            {/* Right pane (subcategories) */}
            {hasNested && activeSubs.length > 0 && (
              <div className="w-1/2 bg-white overflow-y-auto scrollbar-minimal">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {activeSubs.map(sub => variant === 'radio' ? (
                    <FilterItem key={sub.slug} icon="radio" selected={(props as RadioProps).value === sub.slug} label={sub.name} onClick={() => selectRadio(sub)} />
                  ) : (
                    <FilterItem key={sub.slug} icon="checkbox" selected={localTags.some(t => t.slug === sub.slug)} label={sub.name} onClick={() => toggleCheck(sub)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar (checkbox only) */}
          {variant === 'checkbox' && (
            <div className="border-t border-neutral-100 p-3 bg-neutral-50/50 flex justify-between items-center">
              <span className="text-xs font-semibold text-neutral-500">{localTags.length} selected</span>
              <div className="flex gap-2">
                <button onClick={() => setLocalTags([])} className="px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors">Clear All</button>
                <button onClick={() => { (props as CheckboxProps).onApply?.(localTags); setIsOpen(false); }} className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-md shadow-sm hover:bg-primary/90 transition-colors">Apply</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
