/**
 * Handle API errors and return user-friendly messages
 */
export function handleApiError(error: any): string {
  // Network error
  if (!error.response) {
    return 'Network error. Please check your connection and try again.';
  }

  // 401 Unauthorized
  if (error.response?.status === 401) {
    return 'Session expired. Please login again.';
  }

  // 403 Forbidden
  if (error.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  // 404 Not Found
  if (error.response?.status === 404) {
    return 'Resource not found.';
  }

  // 422 Validation Error
  if (error.response?.status === 422) {
    const details = error.response?.data?.details;
    if (details) {
      const fields = Object.keys(details)
        .map((k) => `${k}: ${details[k].join(', ')}`)
        .join('; ');
      return `Validation error: ${fields}`;
    }
    return 'Please check your input and try again.';
  }

  // 429 Rate Limited
  if (error.response?.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  // 500+ Server Error
  if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Backend error response
  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  // Fallback
  return 'Something went wrong. Please try again.';
}

/**
 * Check if error is a specific HTTP status
 */
export function isHttpError(error: any, status: number): boolean {
  return error?.response?.status === status;
}

/**
 * Check if error is a validation error (422)
 */
export function isValidationError(error: any): boolean {
  return error?.response?.status === 422;
}

/**
 * Check if error is authentication error (401)
 */
export function isAuthError(error: any): boolean {
  return error?.response?.status === 401;
}
