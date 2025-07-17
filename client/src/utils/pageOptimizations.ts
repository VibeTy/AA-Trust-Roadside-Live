// Bulk performance optimization utilities
export const preloadCriticalAssets = (assets: string[]) => {
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};

export const optimizeFonts = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Critical CSS for instant page loading
export const injectCriticalCSS = () => {
  const criticalCSS = `
    .page-loader{position:fixed;top:0;left:0;width:100%;height:100%;background:#111827;z-index:9999;display:flex;align-items:center;justify-content:center}
    .page-loader.hide{opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
    .spinner{width:40px;height:40px;border:4px solid #374151;border-top:4px solid #3b82f6;border-radius:50%;animation:spin 1s linear infinite}
    @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    .fade-in{opacity:0;animation:fadeIn .5s ease-in-out forwards}
    @keyframes fadeIn{to{opacity:1}}
    .slide-up{transform:translateY(20px);opacity:0;animation:slideUp .6s ease-out forwards}
    @keyframes slideUp{to{transform:translateY(0);opacity:1}}
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

export const enableFastNavigation = () => {
  // Prefetch links on hover
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = target.getAttribute('href')!;
      document.head.appendChild(link);
    }
  });
};