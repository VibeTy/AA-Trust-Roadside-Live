import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return null;
}

// Create a simple service worker for caching static assets
export const serviceWorkerCode = `
const CACHE_NAME = 'aa-trust-roadside-v1';
const urlsToCache = [
  '/',
  '/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png',
  '/attached_assets/image_1750232639530.jpeg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
`;