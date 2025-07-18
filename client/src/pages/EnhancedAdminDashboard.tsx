import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  MapPin,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useEffect } from 'react';

export default function EnhancedAdminDashboard() {
  const queryClient = useQueryClient();

  // Fetch all analytics data with auto-refresh
  const { data: callTracking = [], refetch: refetchCallTracking } = useQuery({
    queryKey: ['/api/call-tracking'],
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  const { data: websiteAnalytics = [], refetch: refetchWebsiteAnalytics } = useQuery({
    queryKey: ['/api/website-analytics'],
    refetchInterval: 30000,
  });

  const { data: chatbotInteractions = [], refetch: refetchChatbotInteractions } = useQuery({
    queryKey: ['/api/chatbot-interactions'],
    refetchInterval: 30000,
  });

  const { data: jobTracking = [], refetch: refetchJobTracking } = useQuery({
    queryKey: ['/api/job-tracking'],
    refetchInterval: 30000,
  });

  const { data: marketingMetrics = [], refetch: refetchMarketingMetrics } = useQuery({
    queryKey: ['/api/marketing-metrics'],
    refetchInterval: 30000,
  });

  const { data: contactSubmissions = [], refetch: refetchContactSubmissions } = useQuery({
    queryKey: ['/api/contact-submissions'],
    refetchInterval: 30000,
  });

  const { data: quoteSubmissions = [], refetch: refetchQuoteSubmissions } = useQuery({
    queryKey: ['/api/quote-submissions'],
    refetchInterval: 30000,
  });

  const { data: smartAnalyzer = [], refetch: refetchSmartAnalyzer } = useQuery({
    queryKey: ['/api/smart-analyzer'],
    refetchInterval: 30000,
  });

  // Manual refresh function
  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  // Calculate KPIs
  const totalCalls = callTracking.length;
  const totalChatInteractions = chatbotInteractions.length;
  const totalWebsiteVisits = websiteAnalytics.length;
  const totalLeads = contactSubmissions.length + quoteSubmissions.length + smartAnalyzer.length;
  
  const callToLeadConversion = totalCalls > 0 ? ((totalLeads / totalCalls) * 100).toFixed(1) : '0';
  const chatToCallConversion = chatbotInteractions.filter(c => c.handoffToCall).length;
  const avgResponseTime = '15'; // Static for now, could be calculated from job tracking
  
  const hotLeads = smartAnalyzer.filter(s => s.urgency?.toLowerCase().includes('emergency') || s.urgency?.toLowerCase().includes('urgent')).length;
  const completedJobs = jobTracking.filter(j => j.status === 'completed').length;
  const totalRevenue = jobTracking.reduce((sum, job) => sum + (job.actualPrice || 0), 0);

  // Device and browser analytics
  const mobileVisits = websiteAnalytics.filter(w => w.device === 'mobile').length;
  const desktopVisits = websiteAnalytics.filter(w => w.device === 'desktop').length;
  const mobilePercentage = totalWebsiteVisits > 0 ? ((mobileVisits / totalWebsiteVisits) * 100).toFixed(1) : '0';

  // Recent high-priority leads
  const urgentLeads = smartAnalyzer
    .filter(s => s.urgency?.toLowerCase().includes('emergency'))
    .slice(0, 5);

  // Top performing pages
  const pageViews = websiteAnalytics.reduce((acc, visit) => {
    acc[visit.page] = (acc[visit.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topPages = Object.entries(pageViews)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AA Trust Roadside Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Comprehensive lead tracking and business performance metrics
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCalls}</div>
              <p className="text-xs text-muted-foreground">
                Primary conversion channel
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Interactions</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChatInteractions}</div>
              <p className="text-xs text-muted-foreground">
                24/7 lead capture
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Visits</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWebsiteVisits}</div>
              <p className="text-xs text-muted-foreground">
                {mobilePercentage}% mobile traffic
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                {callToLeadConversion}% conversion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Urgent Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{hotLeads}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Require immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Completed Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedJobs}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Successfully resolved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Revenue Tracked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From tracked jobs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="calls">Call Tracking</TabsTrigger>
            <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Urgent Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {urgentLeads.map((lead, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{lead.phone}</div>
                          <div className="text-sm text-gray-500">{lead.problemDescription}</div>
                        </div>
                        <Badge variant="destructive">URGENT</Badge>
                      </div>
                    ))}
                    {urgentLeads.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No urgent leads at this time</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Contact Forms</span>
                      <span className="font-medium">{contactSubmissions.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quote Requests</span>
                      <span className="font-medium">{quoteSubmissions.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Smart Analyzer</span>
                      <span className="font-medium">{smartAnalyzer.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Chatbot Interactions</span>
                      <span className="font-medium">{totalChatInteractions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Call Tracking Tab */}
          <TabsContent value="calls" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{totalCalls}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Calls</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{chatToCallConversion}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Chat to Call</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{avgResponseTime}min</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Avg Response</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {callTracking.slice(0, 10).map((call, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{call.phone}</div>
                        <div className="text-sm text-gray-500">{call.source} - {call.page}</div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(call.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chatbot Tab */}
          <TabsContent value="chatbot" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chatbot Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{totalChatInteractions}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Chats</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {chatbotInteractions.filter(c => c.leadQuality === 'hot').length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Hot Leads</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {chatbotInteractions.filter(c => c.leadQuality === 'warm').length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Warm Leads</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {chatbotInteractions.filter(c => c.gpsLatitude && c.gpsLongitude).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">GPS Locations</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {chatbotInteractions.slice(0, 10).map((chat, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{chat.customerName || 'Anonymous'}</div>
                          <div className="text-sm text-gray-500">{chat.customerPhone}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            chat.leadQuality === 'hot' ? 'destructive' : 
                            chat.leadQuality === 'warm' ? 'default' : 'secondary'
                          }>
                            {chat.leadQuality?.toUpperCase()}
                          </Badge>
                          <div className="text-sm text-gray-400">
                            {new Date(chat.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Location Information */}
                      {(chat.customerLocation || chat.gpsLatitude) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
                          <MapPin className="w-4 h-4" />
                          {chat.gpsLatitude && chat.gpsLongitude ? (
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-green-600 dark:text-green-400">
                                📍 GPS: {parseFloat(chat.gpsLatitude).toFixed(6)}, {parseFloat(chat.gpsLongitude).toFixed(6)}
                              </span>
                              {chat.gpsAccuracy && (
                                <span className="text-xs text-gray-500">
                                  ±{Math.round(parseFloat(chat.gpsAccuracy))}m
                                </span>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`https://maps.google.com?q=${chat.gpsLatitude},${chat.gpsLongitude}`, '_blank')}
                                className="text-xs h-6 px-2"
                              >
                                View on Map
                              </Button>
                            </div>
                          ) : (
                            <span>{chat.customerLocation}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Analytics Tab */}
          <TabsContent value="website" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Visits</span>
                      <span className="font-medium">{totalWebsiteVisits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mobile Traffic</span>
                      <span className="font-medium">{mobileVisits} ({mobilePercentage}%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Desktop Traffic</span>
                      <span className="font-medium">{desktopVisits} ({(100 - parseFloat(mobilePercentage)).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bounce Rate</span>
                      <span className="font-medium">
                        {((websiteAnalytics.filter(w => w.bounced).length / totalWebsiteVisits) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPages.map(([page, views], index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{page}</span>
                        <Badge variant="outline">{views} views</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <span>Website Visits</span>
                      <span className="font-bold">{totalWebsiteVisits}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <span>Form Interactions</span>
                      <span className="font-bold">{websiteAnalytics.filter(w => w.formStarted).length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <span>Call Button Clicks</span>
                      <span className="font-bold">{websiteAnalytics.filter(w => w.callButtonClicked).length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <span>Leads Generated</span>
                      <span className="font-bold">{totalLeads}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Lead-to-Call Conversion</span>
                      <span className="font-bold text-green-600">{callToLeadConversion}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Response Time</span>
                      <span className="font-bold text-blue-600">{avgResponseTime} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Job Completion Rate</span>
                      <span className="font-bold text-purple-600">
                        {jobTracking.length > 0 ? ((completedJobs / jobTracking.length) * 100).toFixed(1) : '0'}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Acquisition Cost</span>
                      <span className="font-bold text-orange-600">
                        ${totalRevenue > 0 ? (totalRevenue / totalLeads).toFixed(2) : '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}