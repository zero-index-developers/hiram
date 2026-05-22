import type { Item } from '../types/item';

/**
 * Extract the owner ID from an item
 * Handles different owner formats: direct ownerId, owner object, or fallback to mock data
 */
export function getItemOwnerId(item: Item, mockUserProfiles?: any[]): string | undefined {
  // First check direct ownerId
  if (item.ownerId) {
    return item.ownerId;
  }

  // Then check owner object
  if (typeof item.owner === 'object' && item.owner?.id) {
    return item.owner.id;
  }

  // Fallback to mock data if needed
  if (mockUserProfiles) {
    const ownerName = typeof item.owner === 'string' ? item.owner : item.owner?.name;
    const mockUser = mockUserProfiles.find(
      (u) => u.name.toLowerCase() === ownerName?.toLowerCase()
    );
    return mockUser?.id;
  }

  return undefined;
}

/**
 * Generate a URL-friendly slug from an item title and ID
 */
export function generateItemSlug(title: string, id: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + id
  );
}

/**
 * Get owner name from an item in different formats
 */
export function getOwnerName(item: Item): string {
  if (typeof item.owner === 'string') {
    return item.owner;
  }
  return item.owner?.name || 'Unknown';
}

/**
 * Check if item owner is verified (has studentId)
 */
export function isOwnerVerified(item: Item): boolean {
  return typeof item.owner !== 'string' && !!item.owner?.studentId;
}

/**
 * Extract initials from a name
 */
export function getInitials(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}
