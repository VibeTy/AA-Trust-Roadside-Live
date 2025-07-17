import { useEffect } from "react";

const criticalAssets = [
  '/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png',
];

export default function AssetPreloader() {
  useEffect(() => {
    // Preload critical assets
    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = asset;
      document.head.appendChild(link);
    });

    // Preload critical CSS
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

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