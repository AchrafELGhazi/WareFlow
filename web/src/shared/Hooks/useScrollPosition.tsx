import { useState, useEffect } from 'react';

/**
 * Custom hook to track window scroll position
 * @returns Current scroll position in pixels
 */
export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Call handler right away to update scroll position on initial load
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
