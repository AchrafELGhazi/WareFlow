import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the current viewport matches a media query
 * @param query The media query to check (e.g. '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Initialize with the current match state
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Default to false for SSR
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create media query list
    const mediaQueryList = window.matchMedia(query);
    
    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Define callback for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener for modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      // Clean up
      return () => {
        mediaQueryList.removeEventListener('change', handleChange);
      };
    } else {
      // Fallback for older browsers (e.g., IE)
      mediaQueryList.addListener(handleChange);
      // Clean up
      return () => {
        mediaQueryList.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
};

export default useMediaQuery;