import type { LucideIcon } from 'lucide-react';

interface Tab {
  key: string;
  label: string;
  icon?: LucideIcon;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  variant?: 'horizontal' | 'vertical';
}

export function TabBar({ tabs, activeTab, onChange, variant = 'horizontal' }: TabBarProps) {
  if (variant === 'vertical') {
    return (
      <nav className="flex sm:flex-col gap-1 shrink-0 sm:w-52 sm:mr-8 sm:sticky sm:top-24 sm:self-start mb-4 sm:mb-0 overflow-x-auto sm:overflow-x-visible">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-primary/5 text-primary shadow-sm border-l-2 border-primary'
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 border-l-2 border-transparent'
              }`}
            >
              {Icon && <Icon size={16} />}
              {tab.label}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <div className={`flex border-b border-neutral-100 bg-white shrink-0`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
