import { useEffect, memo, useState } from 'react';
import { useDebouncedScroll } from '@/hooks/use-debounced-scroll';
import { lazyLoadImages } from '@/utils/pageOptimizations';

interface PageOptimizerProps {
  children: React.ReactNode;
  preloadImages?: string[];
  criticalCSS?: string;
}

const PageOptimizer = memo(function PageOptimizer({ 
  children, 
  preloadImages = [], 
  criticalCSS 
}: PageOptimizerProps) {
  const { isScrolled } = useDebouncedScroll();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Show loading state briefly for perceived performance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Preload images for this page
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Inject critical CSS if provided
    if (criticalCSS) {
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    }

    // Initialize lazy loading
    lazyLoadImages();

    return () => {
      clearTimeout(timer);
      if (criticalCSS) {
        const styles = document.querySelectorAll('style');
        styles.forEach(style => {
          if (style.textContent === criticalCSS) {
            style.remove();
          }
        });
      }
    };
  }, [preloadImages, criticalCSS]);

  if (!isLoaded) {
    return (
      <div className="page-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={`layout-stable fade-in ${isScrolled ? 'gpu-accelerated' : ''}`}>
      {children}
    </div>
  );
});

export default PageOptimizer;