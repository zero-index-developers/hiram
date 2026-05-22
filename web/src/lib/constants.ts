/**
 * Centralized configuration and constants for the web application
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
};

export const UI_CONSTANTS = {
  PAGINATION_SIZE: 10,
  IMAGE_MAX_SIZE_MB: 5,
  TOAST_DURATION_MS: 3000,
  DEBOUNCE_MS: 300,
  SEARCH_DEBOUNCE_MS: 300,
};

export const FORM_CONSTANTS = {
  MIN_ITEM_TITLE_LENGTH: 3,
  MAX_ITEM_TITLE_LENGTH: 100,
  MIN_ITEM_DESC_LENGTH: 10,
  MAX_ITEM_DESC_LENGTH: 500,
  MIN_USER_NAME_LENGTH: 2,
  MAX_USER_NAME_LENGTH: 50,
  MIN_PROPOSAL_DURATION_DAYS: 1,
  MAX_PROPOSAL_DURATION_DAYS: 90,
};

export const ANIMATION_TIMING = {
  FAST: 'duration-200',
  NORMAL: 'duration-300',
  SLOW: 'duration-500',
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'hiram_token',
  USER_AVATAR: (userId: string) => `hiram_avatar_${userId}`,
  SAVED_ITEMS: 'hiram_saved_items',
  THEME_MODE: 'hiram_theme',
};
