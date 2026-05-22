import { useState } from 'react';

/**
 * Hook to manage image loading state (loading, loaded, error)
 * Reduces repetitive image state management across components
 */
export function useImageLoad(imageUrl?: string) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return {
    imgError,
    imgLoaded,
    onLoad: () => setImgLoaded(true),
    onError: () => setImgError(true),
    reset: () => {
      setImgError(false);
      setImgLoaded(false);
    },
    shouldRender: !!imageUrl && !imgError,
    isLoading: !imgLoaded && !!imageUrl,
  };
}
