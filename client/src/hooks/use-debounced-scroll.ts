import { useState, useEffect, useCallback } from 'react';

export function useDebouncedScroll(delay: number = 10) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 100);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, delay);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll, delay]);

  return { scrollY, isScrolled };
}