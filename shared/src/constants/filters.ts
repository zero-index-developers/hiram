import type { Tag, TagType } from '../types/tag';
import { ITEM_CONDITIONS } from './conditions';
import { TRANSACTION_TYPES } from './transactionTypes';
import { ITEM_CATEGORIES } from './categories';

export interface FilterConfig {
  type: TagType;
  placeholder: string;
  options: Tag[];
  variant: 'radio' | 'checkbox';
}

// Platform-agnostic Config-Driven UI for filters
export const FILTERS_CONFIG: FilterConfig[] = [
  { type: 'CATEGORY', placeholder: 'Category', options: ITEM_CATEGORIES, variant: 'checkbox' },
  { type: 'CONDITION', placeholder: 'Condition', options: ITEM_CONDITIONS, variant: 'checkbox' },
  { type: 'TRANSACTION', placeholder: 'Transaction', options: TRANSACTION_TYPES, variant: 'checkbox' },
];
