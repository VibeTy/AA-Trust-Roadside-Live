import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function AnalyticsTracker() {
  const [location] = useLocation();
  const [sessionId, setSessionId] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    // Generate session ID once
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const pageStartTime = Date.now();
    setStartTime(pageStartTime);

    // Track page view
    const trackPageView = async () => {
      try {
        const analyticsData = {
          sessionId,
          page: location,
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
                  navigator.userAgent.includes('Firefox') ? 'firefox' : 'other',
          referrer: document.referrer,
          loadTime: Math.floor((Date.now() - performance.timing.navigationStart) / 1000).toString(),
          timeOnPage: '0',
          bounced: false,
          formStarted: false,
          formCompleted: false,
          callButtonClicked: false,
          callButtonSource: null
        };

        await fetch('/api/website-analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analyticsData)
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();

    // Track time on page when user leaves
    const handleBeforeUnload = async () => {
      const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);
      
      // Consider it a bounce if less than 30 seconds
      const bounced = timeOnPage < 30;

      try {
        const analyticsData = {
          sessionId,
          page: location,
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
                  navigator.userAgent.includes('Firefox') ? 'firefox' : 'other',
          referrer: document.referrer,
          loadTime: Math.floor((Date.now() - performance.timing.navigationStart) / 1000).toString(),
          timeOnPage: timeOnPage.toString(),
          bounced,
          formStarted: false,
          formCompleted: false,
          callButtonClicked: false,
          callButtonSource: null
        };

        // Use sendBeacon for better reliability on page unload
        navigator.sendBeacon('/api/website-analytics', JSON.stringify(analyticsData));
      } catch (error) {
        console.error('Error tracking time on page:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location, sessionId]);

  // Track form interactions
  useEffect(() => {
    const trackFormStart = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const form = target.closest('form');
        if (form) {
          // Track form started
          fetch('/api/website-analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId,
              page: location,
              device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
              browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
                      navigator.userAgent.includes('Firefox') ? 'firefox' : 'other',
              formStarted: true,
              formCompleted: false,
              bounced: false,
              callButtonClicked: false,
              loadTime: '0',
              timeOnPage: Math.floor((Date.now() - startTime) / 1000).toString()
            })
          }).catch(error => console.error('Error tracking form start:', error));
        }
      }
    };

    const trackFormSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement;
      if (target.tagName === 'FORM') {
        // Track form completed
        fetch('/api/website-analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            page: location,
            device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
            browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
                    navigator.userAgent.includes('Firefox') ? 'firefox' : 'other',
            formStarted: true,
            formCompleted: true,
            bounced: false,
            callButtonClicked: false,
            loadTime: '0',
            timeOnPage: Math.floor((Date.now() - startTime) / 1000).toString()
          })
        }).catch(error => console.error('Error tracking form submit:', error));
      }
    };

    document.addEventListener('focusin', trackFormStart);
    document.addEventListener('submit', trackFormSubmit);

    return () => {
      document.removeEventListener('focusin', trackFormStart);
      document.removeEventListener('submit', trackFormSubmit);
    };
  }, [sessionId, location, startTime]);

  return null; // This component doesn't render anything
}