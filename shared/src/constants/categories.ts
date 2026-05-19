import { Tag } from '../types/tag';

export const ITEM_CATEGORIES: Tag[] = [
  {
    slug: 'ACADEMICS',
    name: 'Academics & Study',
    description: 'Calculators, review books, reference materials, drawing boards, lab gowns.',
    type: 'CATEGORY'
  },
  {
    slug: 'ELECTRONICS',
    name: 'Electronics & Gadgets',
    description: 'Cameras, tripods, ring lights, chargers, adapters, powerbanks.',
    type: 'CATEGORY'
  },
  {
    slug: 'CREATIVE',
    name: 'Art & Creative Tools',
    description: 'Sketchbooks, paint sets, specialized drafting tools, musical instruments.',
    type: 'CATEGORY'
  },
  {
    slug: 'ORGANIZATION',
    name: 'Office & Organization',
    description: 'Folders, clipboards, organizers, binders.',
    type: 'CATEGORY'
  },
  {
    slug: 'OTHERS',
    name: 'Other Items',
    description: 'Any school-appropriate item not fitting other categories.',
    type: 'CATEGORY'
  }
];
