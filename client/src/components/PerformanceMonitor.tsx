import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if ('performance' in window && 'PerformanceObserver' in window) {
      
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      
      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      
      // Monitor Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let clsValue = 0;
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('Performance monitoring not supported');
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null;
}