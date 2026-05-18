import type { LucideIcon } from 'lucide-react';

interface Category {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export function CategoryFilters({
  categories,
  selectedCategory,
  setSelectedCategory
}: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition shrink-0 duration-300 ${isSelected
              ? 'bg-primary/50 border border-primary'
              : 'bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/50'
              }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
