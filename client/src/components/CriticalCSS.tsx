import { useEffect } from 'react';

const criticalCSS = `
  body { font-family: Inter, system-ui, sans-serif; margin: 0; padding: 0; }
  .nav-fixed { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: black; }
  .hero-min-h { min-height: 100vh; }
  .hero-bg { background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%); }
  .text-center { text-align: center; }
  .text-white { color: white; }
  .text-blue-500 { color: #3b82f6; }
  .text-yellow-400 { color: #facc15; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .gap-3 { gap: 0.75rem; }
  .gap-4 { gap: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .rounded-full { border-radius: 9999px; }
  .bg-blue-600 { background-color: #2563eb; }
  .bg-red-600 { background-color: #dc2626; }
  .font-bold { font-weight: 700; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
  .transition-all { transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); }
  .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
  .hover\\:bg-red-700:hover { background-color: #b91c1c; }
  .hover\\:scale-105:hover { transform: scale(1.05); }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .opacity-20 { opacity: 0.2; }
  .opacity-50 { opacity: 0.5; }
  .opacity-70 { opacity: 0.7; }
  .z-10 { z-index: 10; }
  .max-w-5xl { max-width: 64rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .object-contain { object-fit: contain; }
  .w-auto { width: auto; }
  .h-28 { height: 7rem; }
  .h-40 { height: 10rem; }
  .leading-tight { line-height: 1.25; }
  @media (min-width: 768px) {
    .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
    .md\\:text-5xl { font-size: 3rem; line-height: 1; }
    .md\\:h-40 { height: 10rem; }
    .md\\:mb-8 { margin-bottom: 2rem; }
  }
`;

export default function CriticalCSS() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null;
}