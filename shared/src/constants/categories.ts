import type { ItemCategory } from '../types/item';

export const ITEM_CATEGORIES: { value: ItemCategory; label: string; description: string }[] = [
  {
    value: 'ACADEMICS',
    label: 'Academics & Study',
    description: 'Calculators, review books, reference materials, drawing boards, lab gowns.'
  },
  {
    value: 'ELECTRONICS',
    label: 'Electronics & Gadgets',
    description: 'Cameras, tripods, ring lights, chargers, adapters, powerbanks.'
  },
  {
    value: 'CREATIVE',
    label: 'Art & Creative Tools',
    description: 'Sketchbooks, paint sets, specialized drafting tools, musical instruments.'
  },
  {
    value: 'ORGANIZATION',
    label: 'Office & Organization',
    description: 'Folders, clipboards, organizers, binders.'
  },
  {
    value: 'OTHERS',
    label: 'Other Items',
    description: 'Any school-appropriate item not fitting other categories.'
  }
];
