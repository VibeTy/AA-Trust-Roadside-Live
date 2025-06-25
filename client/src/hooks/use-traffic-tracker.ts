
import { useEffect } from 'react';

export function useTrafficTracker() {
  useEffect(() => {
    // Track user entry
    fetch('/api/track-user', { method: 'POST' })
      .catch(error => console.error('Failed to track user entry:', error));

    // Track user exit
    const handleBeforeUnload = () => {
      navigator.sendBeacon('/api/untrack-user');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        navigator.sendBeacon('/api/untrack-user');
      } else if (document.visibilityState === 'visible') {
        fetch('/api/track-user', { method: 'POST' })
          .catch(error => console.error('Failed to track user re-entry:', error));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Track user exit on component unmount
      fetch('/api/untrack-user', { method: 'POST' })
        .catch(error => console.error('Failed to track user exit:', error));
    };
  }, []);
}
