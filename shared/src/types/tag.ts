export type TagType = 'LOCATION' | 'REGION' | 'CITY' | 'BARANGAY' | 'CONDITION' | 'CATEGORY' | 'SUBCATEGORY' | 'GENERAL' | 'HOT' | 'TRANSACTION' | 'PROGRAM';

export type Tag = {
  name: string;
  slug: string;
  type?: TagType;
  description?: string;
  hotScore?: number;
  subcategories?: Tag[];
};
