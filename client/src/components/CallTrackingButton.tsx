import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CallTrackingButtonProps {
  phoneNumber: string;
  source: string;
  page: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function CallTrackingButton({ 
  phoneNumber, 
  source, 
  page, 
  className = '',
  children,
  variant = 'primary'
}: CallTrackingButtonProps) {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate session ID once when component mounts
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setSessionId(id);
  }, []);

  const handleCallClick = async () => {
    // Track the call button click
    try {
      const analyticsData = {
        sessionId,
        page,
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
                navigator.userAgent.includes('Firefox') ? 'firefox' : 'other',
        callButtonClicked: true,
        callButtonSource: source,
        formStarted: false,
        formCompleted: false,
        bounced: false,
        loadTime: '0',
        timeOnPage: Math.floor((Date.now() - performance.timing.navigationStart) / 1000).toString()
      };

      await fetch('/api/website-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsData)
      });

      // Track call specifically
      const callData = {
        sessionId,
        phone: phoneNumber,
        source,
        page,
        userAgent: navigator.userAgent,
        ipAddress: 'unknown' // Will be set by server
      };

      await fetch('/api/call-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callData)
      });
    } catch (error) {
      console.error('Error tracking call:', error);
    }

    // Make the call
    window.location.href = `tel:${phoneNumber}`;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <button
      onClick={handleCallClick}
      className={`inline-flex items-center font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${getVariantStyles()} ${className}`}
      aria-label={`Call ${phoneNumber} - ${source}`}
    >
      <Phone className="w-5 h-5 mr-2" />
      {children || `Call ${phoneNumber}`}
    </button>
  );
}