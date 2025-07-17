import { useEffect } from "react";
import { preloadCriticalAssets, optimizeFonts, enableFastNavigation, injectCriticalCSS } from "@/utils/pageOptimizations";

const criticalAssets = [
  '/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png',
];

export default function AssetPreloader() {
  useEffect(() => {
    // Inject critical CSS first for instant styling
    injectCriticalCSS();
    
    // Preload critical assets
    preloadCriticalAssets(criticalAssets);
    
    // Optimize fonts
    optimizeFonts();
    
    // Enable fast navigation
    enableFastNavigation();

    // Preconnect to external domains
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com'
    ];
    
    preconnects.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
}