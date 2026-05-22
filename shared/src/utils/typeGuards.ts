import type { Item } from '../types/item';

/**
 * Type guards to reduce scattered typeof checks throughout the codebase
 */

/**
 * Check if owner is a user object (not a string)
 */
export function isUserObject(owner: any): owner is { id: string; name: string; studentId?: string } {
  return owner && typeof owner === 'object' && 'name' in owner;
}

/**
 * Check if user is verified (has studentId)
 */
export function isUserVerified(user: any): boolean {
  return user?.studentId != null && user.studentId !== '';
}

/**
 * Check if item owner is verified
 */
export function isItemOwnerVerified(item: Item): boolean {
  if (typeof item.owner === 'string') {
    return false;
  }
  return isUserVerified(item.owner);
}

/**
 * Check if string is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is empty string or null/undefined
 */
export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === '';
}

/**
 * Check if string is an absolute URL
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
