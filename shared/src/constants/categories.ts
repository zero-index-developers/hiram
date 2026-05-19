import type { Tag } from '../types/tag';

export const ITEM_CATEGORIES: Tag[] = [
  {
    slug: 'ACADEMICS',
    name: 'Academics & Study',
    description: 'Calculators, review books, reference materials, drawing boards, lab gowns.',
    type: 'CATEGORY',
    subcategories: [
      { slug: 'GRAPHING_CALCULATOR', name: 'Graphing Calculator', type: 'SUBCATEGORY' },
      { slug: 'REVIEW_BOOKS', name: 'Review Books', type: 'SUBCATEGORY' },
      { slug: 'LAB_GOWN', name: 'Lab Gown', type: 'SUBCATEGORY' },
      { slug: 'REFERENCE_MATERIALS', name: 'Reference Materials', type: 'SUBCATEGORY' }
    ]
  },
  {
    slug: 'ELECTRONICS',
    name: 'Electronics & Gadgets',
    description: 'Cameras, tripods, ring lights, chargers, adapters, powerbanks.',
    type: 'CATEGORY',
    subcategories: [
      { slug: 'LAB_EQUIPMENT', name: 'Lab Equipment', type: 'SUBCATEGORY' },
      { slug: 'CHARGERS', name: 'Chargers & Adapters', type: 'SUBCATEGORY' },
      { slug: 'POWERBANKS', name: 'Powerbanks', type: 'SUBCATEGORY' },
      { slug: 'LAPTOP_ACCESSORIES', name: 'Laptop Accessories', type: 'SUBCATEGORY' }
    ]
  },
  {
    slug: 'CREATIVE',
    name: 'Art & Creative Tools',
    description: 'Sketchbooks, paint sets, specialized drafting tools, musical instruments.',
    type: 'CATEGORY',
    subcategories: [
      { slug: 'CAMERA_TRIPOD', name: 'Camera / Tripod', type: 'SUBCATEGORY' },
      { slug: 'DRAWING_BOARDS', name: 'Drawing Boards', type: 'SUBCATEGORY' },
      { slug: 'ART_SUPPLIES', name: 'Art Supplies', type: 'SUBCATEGORY' },
      { slug: 'MUSICAL_INSTRUMENTS', name: 'Musical Instruments', type: 'SUBCATEGORY' }
    ]
  },
  {
    slug: 'ORGANIZATION',
    name: 'Office & Organization',
    description: 'Folders, clipboards, organizers, binders.',
    type: 'CATEGORY',
    subcategories: [
      { slug: 'FOLDERS', name: 'Folders & Binders', type: 'SUBCATEGORY' },
      { slug: 'ORGANIZERS', name: 'Desk Organizers', type: 'SUBCATEGORY' },
      { slug: 'CLIPBOARDS', name: 'Clipboards', type: 'SUBCATEGORY' }
    ]
  },
  {
    slug: 'OTHERS',
    name: 'Other Items',
    description: 'Any school-appropriate item not fitting other categories.',
    type: 'CATEGORY',
    subcategories: [
      { slug: 'MISC', name: 'Miscellaneous', type: 'SUBCATEGORY' }
    ]
  }
];
