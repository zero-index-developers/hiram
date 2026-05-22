interface FilterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-full px-3.5 py-1.5 transition-all font-semibold shadow-sm text-xs cursor-pointer ${
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-primary/10 bg-white text-neutral-600 hover:border-primary/30 hover:bg-primary/5 hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}
