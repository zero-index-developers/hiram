import type { Item } from '@hiram/shared';

interface TransactionBadgeProps {
  transaction: Item['preferredTransaction'];
  compact?: boolean;
}

const colors: Record<string, string> = {
  HIRAM: 'bg-blue-50 text-blue-600 border-blue-100',
  TRADE: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};

const labels: Record<string, string> = {
  HIRAM: 'Hiram',
  TRADE: 'Trade',
};

export function TransactionBadge({ transaction, compact }: TransactionBadgeProps) {
  if (!transaction) return null;
  const color = colors[transaction] || 'bg-amber-50 text-amber-600 border-amber-100';
  const label = labels[transaction] || 'Request';
  return (
    <span
      className={`font-extrabold uppercase tracking-wider border shadow-sm ${
        compact
          ? 'px-1.5 py-0.5 rounded text-[8px]'
          : 'px-2.5 py-0.5 rounded-full text-[10px]'
      } ${color}`}
    >
      {label}
    </span>
  );
}
