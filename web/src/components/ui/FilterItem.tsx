import { Check, CheckSquare, Square } from 'lucide-react';

interface FilterItemProps {
  icon: 'radio' | 'checkbox';
  selected: boolean;
  label: string;
  onClick: () => void;
}

export function FilterItem({ icon, selected, label, onClick }: FilterItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
        icon === 'radio'
          ? (selected ? 'bg-primary/5 text-primary font-bold' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 font-medium')
          : 'text-neutral-600 hover:bg-neutral-50 font-medium'
      }`}
    >
      {icon === 'checkbox' && (
        <span className="text-neutral-400 hover:text-primary transition-colors shrink-0">
          {selected ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4" />}
        </span>
      )}
      <span className="truncate flex-1">{label}</span>
      {icon === 'radio' && selected && <Check className="w-4 h-4 ml-auto shrink-0 text-primary" />}
    </div>
  );
}
