import { useState, useEffect } from 'react';

export function useStickyScroll(threshold = 215, forceSticky = false) {
  const [isSticky, setIsSticky] = useState(forceSticky);

  useEffect(() => {
    if (forceSticky) {
      setIsSticky(true);
      return;
    }
    const handleScroll = () => {
      setIsSticky(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceSticky, threshold]);

  return isSticky;
}
