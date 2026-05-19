export type TagType = 'LOCATION' | 'CONDITION' | 'CATEGORY' | 'GENERAL' | 'HOT';

export type Tag = {
  name: string;
  slug: string;
  type?: TagType;
  description?: string;
  hotScore?: number;
};
