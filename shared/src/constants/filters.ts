import type { Tag, TagType } from '../types/tag';
import { ITEM_CONDITIONS } from './conditions';
import { TRANSACTION_TYPES } from './transactionTypes';

export interface FilterConfig {
  type: TagType;
  placeholder: string;
  options: Tag[];
}

// Platform-agnostic Config-Driven UI for filters
export const FILTERS_CONFIG: FilterConfig[] = [
  { type: 'CONDITION', placeholder: 'Condition', options: ITEM_CONDITIONS },
  { type: 'TRANSACTION', placeholder: 'Transaction', options: TRANSACTION_TYPES },
];
