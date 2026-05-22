export type ItemCategory = 
  | 'ACADEMICS'      // Calculators, review books, drafting tools, lab gowns
  | 'ELECTRONICS'    // Tripods, cameras, chargers, powerbanks
  | 'CREATIVE'       // Art supplies, drawing boards, musical instruments
  | 'ORGANIZATION'   // Organizers, folders, clipboards
  | 'OTHERS';

export type ItemCondition = 
  | 'EXCELLENT'      // Brand new or like new
  | 'GOOD'           // Light wear, fully functional
  | 'FAIR'           // Visible wear, fully functional
  | 'POOR';          // Heavily worn, but usable

export type ItemTransactionType = 'HIRAM' | 'TRADE' | 'REQUEST';

export interface Item {
  id: string;
  title: string;
  description?: string;
  category: ItemCategory;
  subcategory?: string;
  condition: ItemCondition;
  preferredTransaction?: ItemTransactionType;
  imageUrls?: string[];
  isAvailable?: boolean;
  ownerId?: string;
  createdAt?: Date;
  regionCode?: string;
  cityCode?: string;
  barangayCode?: string;

  // Client-side helpers
  image?: string;
  date?: Date;
  owner?: string | {
    id?: string;
    studentId?: string | null;
    name: string;
    avatarUrl?: string;
  };
}
