
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity } from 'lucide-react';

export default function TrafficTracker() {
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Fetch initial count
    fetch('/api/admin/traffic')
      .then(res => res.json())
      .then(data => setActiveUsers(data.activeUsers))
      .catch(error => console.error('Failed to fetch traffic data:', error));

    // Setup WebSocket connection for real-time updates
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/admin`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to admin WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'user_count') {
          setActiveUsers(data.count);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from admin WebSocket');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Activity className="h-4 w-4 text-green-500" />
          ) : (
            <Activity className="h-4 w-4 text-gray-400" />
          )}
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-600">{activeUsers}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {isConnected ? 'Live tracking' : 'Connection lost'}
        </p>
      </CardContent>
    </Card>
  );
}
