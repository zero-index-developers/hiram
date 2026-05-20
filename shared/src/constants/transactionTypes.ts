import type { Tag } from '../types/tag';

export const TRANSACTION_TYPES: Tag[] = [
  { slug: 'HIRAM', name: 'Hiram (Borrow)', type: 'TRANSACTION', description: 'Borrowing resources temporarily' },
  { slug: 'TRADE', name: 'Trade (Barter)', type: 'TRANSACTION', description: 'Trading or swapping resources' },
  { slug: 'REQUEST', name: 'Request (Wanted)', type: 'TRANSACTION', description: 'Asking for or requesting a specific item' },
];
