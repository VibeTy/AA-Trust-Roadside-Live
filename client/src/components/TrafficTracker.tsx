import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Activity, Eye, Clock, Globe, TrendingUp } from 'lucide-react';

interface TrafficStats {
  activeUsers: number;
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  hourlyData: Array<{ hour: string; visitors: number; pageViews: number }>;
  locationData: Array<{ country: string; visitors: number }>;
}

export default function TrafficTracker() {
  const [stats, setStats] = useState<TrafficStats>({
    activeUsers: 0,
    totalPageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    topPages: [],
    hourlyData: [],
    locationData: []
  });
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [recentActivity, setRecentActivity] = useState<Array<{ page: string; timestamp: string }>>([]);

  useEffect(() => {
    // Fetch initial stats
    const fetchStats = () => {
      fetch('/api/admin/traffic')
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          // Ensure data has proper structure
          const safeData = {
            activeUsers: data?.activeUsers || 0,
            totalPageViews: data?.totalPageViews || 0,
            uniqueVisitors: data?.uniqueVisitors || 0,
            avgSessionDuration: data?.avgSessionDuration || 0,
            topPages: Array.isArray(data?.topPages) ? data.topPages : [],
            hourlyData: Array.isArray(data?.hourlyData) ? data.hourlyData : [],
            locationData: Array.isArray(data?.locationData) ? data.locationData : []
          };
          setStats(safeData);
        })
        .catch(error => {
          console.error('Failed to fetch traffic data:', error);
          // Set default stats on error
          setStats({
            activeUsers: 0,
            totalPageViews: 0,
            uniqueVisitors: 0,
            avgSessionDuration: 0,
            topPages: [],
            hourlyData: [],
            locationData: []
          });
        });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds

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
          setStats(prev => ({ ...prev, activeUsers: data.count }));
        } else if (data.type === 'traffic_update') {
          setStats(prev => ({ ...prev, activeUsers: data.activeUsers }));
          setRecentActivity(prev => [
            { page: data.page, timestamp: data.timestamp },
            ...prev.slice(0, 9) // Keep last 10 activities
          ]);
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
      clearInterval(interval);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="col-span-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="activity">Live Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <div className="flex items-center gap-1">
                  {isConnected ? (
                    <Activity className="h-4 w-4 text-green-500" />
                  ) : (
                    <Activity className="h-4 w-4 text-gray-400" />
                  )}
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.activeUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isConnected ? 'Live tracking' : 'Connection lost'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views (24h)</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPageViews}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.uniqueVisitors} unique visitors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDuration(stats.avgSessionDuration)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Time per session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Location</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {stats?.locationData && stats.locationData.length > 0 ? stats.locationData[0].country : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.locationData && stats.locationData.length > 0 ? stats.locationData[0].visitors : 0} visitors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Chart Simulation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Hourly Traffic (Last 24 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end justify-between gap-1">
                {stats.hourlyData.map((hour, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-blue-500 w-full rounded-t min-h-1"
                      style={{ height: `${Math.max(hour.pageViews * 4, 4)}px` }}
                      title={`${hour.pageViews} views at ${formatTime(hour.hour)}`}
                    />
                    {index % 4 === 0 && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {formatTime(hour.hour)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Pages (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.topPages && stats.topPages.length > 0 ? stats.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-medium">{page.page}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${stats.topPages && stats.topPages.length > 0 ? (page.views / Math.max(...stats.topPages.map(p => p.views))) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{page.views}</span>
                    </div>
                  </div>
                )) : (
                  <p className="text-muted-foreground">No page data available yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visitor Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.locationData.length > 0 ? stats.locationData.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{location.country}</span>
                    <span className="font-medium">{location.visitors}</span>
                  </div>
                )) : (
                  <p className="text-muted-foreground">No location data available yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm border-b pb-2">
                    <span className="font-medium">{activity.page}</span>
                    <span className="text-muted-foreground">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                )) : (
                  <p className="text-muted-foreground">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}