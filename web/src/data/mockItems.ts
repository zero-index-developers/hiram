export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  isAvailable: boolean;
  owner: string;
  createdAt: Date;
  image?: string;
}

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'HP Prime Graphing Calculator',
    description: 'Perfect for engineering students taking advanced math or engineering subjects. Lending for up to 2 weeks.',
    category: 'ACADEMICS',
    condition: 'EXCELLENT',
    isAvailable: true,
    owner: 'Maria Clara',
    createdAt: new Date('2026-05-15'),
    image: 'https://images.unsplash.com/photo-1594818821901-b68a52862c64?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    title: 'Professional Tripod & Ring Light',
    description: 'Used for journalism or broadcasting projects. Complete set with carrying bag.',
    category: 'ELECTRONICS',
    condition: 'GOOD',
    isAvailable: true,
    owner: 'Juan Dela Cruz',
    createdAt: new Date('2026-05-17'),
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    title: 'Rotring Drafting Board (A3)',
    description: 'Heavy duty drawing board for architecture plates. Well-maintained T-square included.',
    category: 'CREATIVE',
    condition: 'EXCELLENT',
    isAvailable: true,
    owner: 'Isagani Santos',
    createdAt: new Date('2026-05-18'),
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '4',
    title: 'Chemistry Laboratory Manual',
    description: 'Clean lab manual with no markings. Essential study guide for general chemistry courses.',
    category: 'ACADEMICS',
    condition: 'EXCELLENT',
    isAvailable: true,
    owner: 'Ariel Roxas',
    createdAt: new Date('2026-05-18'),
    image: undefined
  }
];
