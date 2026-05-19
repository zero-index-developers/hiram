import type { Tag, TagType } from '../types/tag';
import { CAMPUS_LOCATIONS } from './locations';
import { ITEM_CATEGORIES } from './categories';
import { ITEM_CONDITIONS } from './conditions';

export interface FilterConfig {
  type: TagType;
  placeholder: string;
  options: Tag[];
}

// Platform-agnostic Config-Driven UI for filters
export const FILTERS_CONFIG: FilterConfig[] = [
  { type: 'LOCATION', placeholder: 'Location', options: CAMPUS_LOCATIONS },
  { type: 'CATEGORY', placeholder: 'Category', options: ITEM_CATEGORIES },
  { type: 'CONDITION', placeholder: 'Condition', options: ITEM_CONDITIONS },
];
