
import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

export function useTrafficTracker() {
  const [location] = useLocation();
  const sessionId = useRef<string>(generateSessionId());
  const startTime = useRef<Date>(new Date());

  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      fetch('/api/track-pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId.current,
          page: location,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      }).catch(error => console.error('Failed to track page view:', error));
    };

    trackPageView();
  }, [location]);

  useEffect(() => {
    // Track user entry
    fetch('/api/track-user', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId.current,
        page: location,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    }).catch(error => console.error('Failed to track user entry:', error));

    // Track user exit
    const handleBeforeUnload = () => {
      const blob = new Blob([JSON.stringify({
        sessionId: sessionId.current
      })], { type: 'application/json' });
      navigator.sendBeacon('/api/untrack-user', blob);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const blob = new Blob([JSON.stringify({
          sessionId: sessionId.current
        })], { type: 'application/json' });
        navigator.sendBeacon('/api/untrack-user', blob);
      } else if (document.visibilityState === 'visible') {
        fetch('/api/track-user', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId.current,
            page: location,
            userAgent: navigator.userAgent,
            referrer: document.referrer
          })
        }).catch(error => console.error('Failed to track user re-entry:', error));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Track user exit on component unmount
      fetch('/api/untrack-user', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId.current
        })
      }).catch(error => console.error('Failed to track user exit:', error));
    };
  }, [location]);
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
