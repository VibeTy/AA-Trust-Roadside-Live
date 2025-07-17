import { useEffect, useState } from 'react';

interface FastPageLoaderProps {
  children: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
}

export default function FastPageLoader({ children, priority = 'medium' }: FastPageLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use different loading strategies based on priority
    const loadDelay = priority === 'high' ? 0 : priority === 'medium' ? 50 : 100;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, loadDelay);

    return () => clearTimeout(timer);
  }, [priority]);

  if (!isVisible) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}