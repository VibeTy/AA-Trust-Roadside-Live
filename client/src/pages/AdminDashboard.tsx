import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, AlertTriangle, Users, BarChart3, TrendingUp, ArrowUp, ArrowDown, LogOut, Settings, Zap, Star, Eye, Calendar, DollarSign, RefreshCw } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { QuoteSubmission, ContactSubmission, BookingSubmission, SmartAnalyzerSubmission, CallTracking, WebsiteAnalytics, ChatbotInteraction, JobTracking, MarketingMetrics } from "@shared/schema";
import PageOptimizer from "@/components/PageOptimizer";
import OptimizedIcon from "@/components/OptimizedIcon";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // Real-time traffic data
  const { data: trafficData, isLoading: trafficLoading } = useQuery({
    queryKey: ['/api/admin/traffic'],
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: false,
  });

  const { data: quotes, isLoading: quotesLoading, error: quotesError } = useQuery<QuoteSubmission[]>({
    queryKey: ['/api/quotes'],
    retry: false,
  });

  const { data: contacts, isLoading: contactsLoading, error: contactsError } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contacts'],
    retry: false,
  });

  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery<BookingSubmission[]>({
    queryKey: ['/api/bookings'],
    retry: false,
  });

  const { data: smartAnalyzer, isLoading: smartAnalyzerLoading, error: smartAnalyzerError } = useQuery<SmartAnalyzerSubmission[]>({
    queryKey: ['/api/smart-analyzer'],
    retry: false,
  });

  // Tracking data queries
  const { data: callTracking, isLoading: callTrackingLoading } = useQuery<CallTracking[]>({
    queryKey: ['/api/call-tracking'],
    retry: false,
  });

  const { data: websiteAnalytics, isLoading: websiteAnalyticsLoading } = useQuery<WebsiteAnalytics[]>({
    queryKey: ['/api/website-analytics'],
    retry: false,
  });

  const { data: chatbotInteractions, isLoading: chatbotInteractionsLoading } = useQuery<ChatbotInteraction[]>({
    queryKey: ['/api/chatbot-interactions'],
    retry: false,
  });

  const { data: jobTracking, isLoading: jobTrackingLoading } = useQuery<JobTracking[]>({
    queryKey: ['/api/job-tracking'],
    retry: false,
  });

  const { data: marketingMetrics, isLoading: marketingMetricsLoading } = useQuery<MarketingMetrics[]>({
    queryKey: ['/api/marketing-metrics'],
    retry: false,
  });

  // Check if user is authenticated
  useEffect(() => {
    if ((quotesError && quotesError.message.includes("401")) || 
        (contactsError && contactsError.message.includes("401")) ||
        (bookingsError && bookingsError.message.includes("401")) ||
        (smartAnalyzerError && smartAnalyzerError.message.includes("401"))) {
      toast({
        title: "Session Expired",
        description: "Please log in again",
        variant: "destructive"
      });
      setLocation("/admin");
    }
  }, [quotesError, contactsError, bookingsError, smartAnalyzerError, setLocation, toast]);

  // Logout functionality
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Logout failed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
      setLocation("/admin");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to log out properly",
        variant: "destructive"
      });
    }
  });

  // Real data calculations
  const totalQuotes = quotes?.length || 0;
  const totalContacts = contacts?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalSmartAnalyzer = smartAnalyzer?.length || 0;
  const pendingQuotes = quotes?.filter(q => !q.contacted).length || 0;
  const completedQuotes = quotes?.filter(q => q.contacted).length || 0;
  const pendingSmartAnalyzer = smartAnalyzer?.filter(s => !s.contacted).length || 0;
  const completionRate = totalQuotes > 0 ? Math.round((completedQuotes / totalQuotes) * 100) : 0;
  const activeUsers = trafficData?.activeUsers || 0;
  const totalPageViews = trafficData?.totalPageViews || 0;

  const [editingQuote, setEditingQuote] = useState<QuoteSubmission | null>(null);
  const [editForm, setEditForm] = useState<Partial<QuoteSubmission>>({});

  const markContactedMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/quotes/${id}/contacted`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to update quote');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      toast({
        title: "Success",
        description: "Quote marked as contacted",
      });
    },
  });

  const deleteQuoteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to delete quote');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      toast({
        title: "Success",
        description: "Quote deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive",
      });
    },
  });

  const updateQuoteMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<QuoteSubmission> }) => {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update quote');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      setEditingQuote(null);
      setEditForm({});
      toast({
        title: "Success",
        description: "Quote updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update quote",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (quote: QuoteSubmission) => {
    setEditingQuote(quote);
    setEditForm(quote);
  };

  const handleSaveEdit = () => {
    if (editingQuote && editForm) {
      updateQuoteMutation.mutate({ id: editingQuote.id, data: editForm });
    }
  };

  const handleCancelEdit = () => {
    setEditingQuote(null);
    setEditForm({});
  };

  const handleDelete = (id: number, customerName: string) => {
    if (confirm(`Are you sure you want to delete the quote from ${customerName}? This action cannot be undone.`)) {
      deleteQuoteMutation.mutate(id);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'emergency': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'today': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const markBookingContactedMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/bookings/${id}/contacted`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacted: true })
      });
      if (!response.ok) throw new Error('Failed to update booking');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Success",
        description: "Booking marked as contacted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive"
      });
    }
  });

  const stats = {
    totalQuotes: quotes?.length || 0,
    uncontactedQuotes: quotes?.filter(q => !q.contacted).length || 0,
    totalContacts: contacts?.length || 0,
    totalBookings: bookings?.length || 0,
    uncontactedBookings: bookings?.filter(b => !b.contacted).length || 0,
    totalSmartAnalyzer: smartAnalyzer?.length || 0,
    uncontactedSmartAnalyzer: smartAnalyzer?.filter(s => !s.contacted).length || 0,
    todayQuotes: quotes?.filter(q => {
      const today = new Date().toDateString();
      return new Date(q.createdAt).toDateString() === today;
    }).length || 0,
  };

  return (
    <PageOptimizer>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Modern Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <span className="truncate">AA Trust Roadside - Admin</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Complete business management dashboard</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                    {activeUsers} active
                  </span>
                </div>
                <Button 
                  onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
                    queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
                    queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
                    queryClient.invalidateQueries({ queryKey: ['/api/smart-analyzer'] });
                    queryClient.invalidateQueries({ queryKey: ['/api/admin/traffic'] });
                    toast({
                      title: "Refreshed",
                      description: "All data has been refreshed",
                    });
                  }}
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                <Button 
                  onClick={() => logoutMutation.mutate()} 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Real-time Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Quotes</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalQuotes}</div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {pendingQuotes} pending responses
                </p>
                <div className="mt-2">
                  <Progress value={completionRate} className="h-2" />
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{completionRate}% completion rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Contacts</CardTitle>
                <Mail className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">{totalContacts}</div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  General inquiries
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{totalBookings}</div>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Scheduled services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">Website Views</CardTitle>
                <Eye className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{totalPageViews}</div>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  {activeUsers} active now
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">Inquiries</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Done</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">0</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Organized Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto p-1 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <TabsTrigger value="overview" className="flex flex-col items-center justify-center gap-1 text-xs md:text-sm py-3 px-3 rounded-lg transition-all">
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
                <span className="text-xs text-gray-500">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="leads" className="flex flex-col items-center justify-center gap-1 text-xs md:text-sm py-3 px-3 rounded-lg transition-all">
                <Users className="w-5 h-5" />
                <span className="font-medium">Leads</span>
                <span className="text-xs text-gray-500">({totalQuotes + totalContacts + totalSmartAnalyzer})</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex flex-col items-center justify-center gap-1 text-xs md:text-sm py-3 px-3 rounded-lg transition-all">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Jobs</span>
                <span className="text-xs text-gray-500">({totalBookings})</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex flex-col items-center justify-center gap-1 text-xs md:text-sm py-3 px-3 rounded-lg transition-all">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Analytics</span>
                <span className="text-xs text-gray-500">Live Data</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col items-center justify-center gap-1 text-xs md:text-sm py-3 px-3 rounded-lg transition-all">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
                <span className="text-xs text-gray-500">Config</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Business Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {totalQuotes + totalContacts + totalBookings + totalSmartAnalyzer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
                        <p className="text-2xl font-bold text-green-600">{completionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Quote Requests:</span>
                        <span className="font-semibold">{totalQuotes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Contact Forms:</span>
                        <span className="font-semibold">{totalContacts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Bookings:</span>
                        <span className="font-semibold">{totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pending Responses:</span>
                        <span className="font-semibold text-red-600">{pendingQuotes}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <p className="text-sm text-green-600 dark:text-green-400">Active Users</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-200">{activeUsers}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600 dark:text-green-400">Page Views</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-200">{totalPageViews}</p>
                      </div>
                    </div>
                    
                    {pendingQuotes > 0 && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-semibold">Urgent: {pendingQuotes} pending response{pendingQuotes > 1 ? 's' : ''}</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          Review quote requests that need immediate attention
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <Button 
                    onClick={() => setActiveTab("quotes")}
                    className="h-16 md:h-20 flex flex-col items-center justify-center gap-1 md:gap-2"
                    variant={pendingQuotes > 0 ? "destructive" : "default"}
                  >
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs md:text-sm">Review Quotes</span>
                    {pendingQuotes > 0 && <Badge className="bg-red-600 text-white text-xs">{pendingQuotes}</Badge>}
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab("contacts")}
                    className="h-16 md:h-20 flex flex-col items-center justify-center gap-1 md:gap-2"
                    variant="outline"
                  >
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs md:text-sm">Check Messages</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab("settings")}
                    className="h-16 md:h-20 flex flex-col items-center justify-center gap-1 md:gap-2"
                    variant="outline"
                  >
                    <Settings className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs md:text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Quote Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalQuotes}</div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    {pendingQuotes} pending • {completedQuotes} completed
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Forms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900 dark:text-green-100">{totalContacts}</div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">General inquiries</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-purple-900 dark:text-purple-100 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Smart Analyzer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{totalSmartAnalyzer}</div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    {pendingSmartAnalyzer} pending • AI-powered leads
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="quotes" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="quotes" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quote Requests ({totalQuotes})
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Forms ({totalContacts})
                </TabsTrigger>
                <TabsTrigger value="smart-analyzer" className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Smart Analyzer ({totalSmartAnalyzer})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quotes" className="space-y-4">
            {quotesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {quotes?.map((quote) => (
                  <Card key={quote.id} className={`${!quote.contacted ? 'border-red-200 dark:border-red-800' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          {editingQuote?.id === quote.id ? (
                            <div className="space-y-2">
                              <Input
                                value={editForm.name || ''}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                placeholder="Customer Name"
                                className="text-lg font-semibold"
                              />
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Clock className="h-4 w-4" />
                                {formatDate(quote.createdAt)}
                              </CardDescription>
                            </div>
                          ) : (
                            <div>
                              <CardTitle className="text-lg">{quote.name}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Clock className="h-4 w-4" />
                                {formatDate(quote.createdAt)}
                              </CardDescription>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          {editingQuote?.id === quote.id ? (
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                onClick={handleSaveEdit}
                                disabled={updateQuoteMutation.isPending}
                              >
                                Save
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(quote)}
                              >
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDelete(quote.id, quote.name)}
                                disabled={deleteQuoteMutation.isPending}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                          <div className="flex gap-2">
                            {editingQuote?.id === quote.id ? (
                              <Select 
                                value={editForm.urgency || ''} 
                                onValueChange={(value) => setEditForm({ ...editForm, urgency: value })}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Emergency (ASAP)">Emergency</SelectItem>
                                  <SelectItem value="Urgent (Today)">Urgent</SelectItem>
                                  <SelectItem value="Within 24 Hours">24 Hours</SelectItem>
                                  <SelectItem value="This Week">This Week</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Badge className={getUrgencyColor(quote.urgency)}>
                                {quote.urgency}
                              </Badge>
                            )}
                            {quote.contacted ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Contacted
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            {editingQuote?.id === quote.id ? (
                              <Input
                                value={editForm.phone || ''}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                placeholder="Phone Number"
                                className="text-sm"
                              />
                            ) : (
                              <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline font-medium">
                                {quote.phone}
                              </a>
                            )}
                          </div>
                          {(quote.email || editingQuote?.id === quote.id) && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              {editingQuote?.id === quote.id ? (
                                <Input
                                  value={editForm.email || ''}
                                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                  placeholder="Email Address"
                                  className="text-sm"
                                />
                              ) : (
                                <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                                  {quote.email}
                                </a>
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            {editingQuote?.id === quote.id ? (
                              <Input
                                value={editForm.location || ''}
                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                placeholder="Location"
                                className="text-sm"
                              />
                            ) : (
                              <span>{quote.location}</span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <strong>Service:</strong> 
                            {editingQuote?.id === quote.id ? (
                              <Select 
                                value={editForm.serviceType || ''} 
                                onValueChange={(value) => setEditForm({ ...editForm, serviceType: value })}
                              >
                                <SelectTrigger className="w-full mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Emergency Roadside Service">Emergency Roadside Service</SelectItem>
                                  <SelectItem value="Mobile Mechanic Service">Mobile Mechanic Service</SelectItem>
                                  <SelectItem value="Diagnostic Services">Diagnostic Services</SelectItem>
                                  <SelectItem value="Fleet & Commercial Service">Fleet & Commercial Service</SelectItem>
                                  <SelectItem value="Motorcycle Service">Motorcycle Service</SelectItem>
                                  <SelectItem value="General Automotive">General Automotive</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <span> {quote.serviceType}</span>
                            )}
                          </div>
                          {(quote.vehicleInfo || editingQuote?.id === quote.id) && (
                            <div>
                              <strong>Vehicle:</strong> 
                              {editingQuote?.id === quote.id ? (
                                <Input
                                  value={editForm.vehicleInfo || ''}
                                  onChange={(e) => setEditForm({ ...editForm, vehicleInfo: e.target.value })}
                                  placeholder="Vehicle Information"
                                  className="text-sm mt-1"
                                />
                              ) : (
                                <span> {quote.vehicleInfo}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <strong>Description:</strong>
                        {editingQuote?.id === quote.id ? (
                          <Textarea
                            value={editForm.description || ''}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            placeholder="Service Description"
                            className="mt-1"
                            rows={3}
                          />
                        ) : (
                          <p className="mt-1 text-gray-700 dark:text-gray-300">{quote.description}</p>
                        )}
                      </div>
                      {!quote.contacted && editingQuote?.id !== quote.id && (
                        <div className="space-y-4">
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Quick Response</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                              Contact {quote.name} at {quote.phone} for {quote.serviceType} in {quote.location}
                            </p>
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const message = `Hi ${quote.name}! This is AA Trust Roadside. I got your ${quote.serviceType} request in ${quote.location}. I can help you right away. Call me at (386) 372-8412.`;
                                  navigator.clipboard.writeText(message);
                                  toast({
                                    title: "Message Copied",
                                    description: "Quick response message copied to clipboard",
                                  });
                                }}
                              >
                                Copy Quick Response
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => markContactedMutation.mutate(quote.id)}
                              disabled={markContactedMutation.isPending}
                              size="sm"
                              variant="outline"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Contacted
                            </Button>
                            <Button size="sm" asChild>
                              <a href={`tel:${quote.phone}`}>
                                <Phone className="h-4 w-4 mr-2" />
                                Call Now
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {(!quotes || quotes.length === 0) && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-gray-500">No quote requests yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            {contactsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {contacts?.map((contact) => (
                  <Card key={contact.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(contact.createdAt)}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline font-medium">
                              {contact.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                              {contact.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <strong>Message:</strong>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{contact.message}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" asChild>
                          <a href={`tel:${contact.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${contact.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(!contacts || contacts.length === 0) && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-gray-500">No contact form submissions yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="smart-analyzer" className="space-y-4">
            {smartAnalyzerLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {smartAnalyzer?.map((submission) => (
                  <Card key={submission.id} className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-purple-600" />
                            {submission.name || 'Anonymous User'}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(submission.createdAt)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getUrgencyColor(submission.urgency)}>
                            {submission.urgency}
                          </Badge>
                          <Badge variant="outline">{submission.confidence}% match</Badge>
                          {submission.contacted ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Contacted
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {submission.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <a href={`tel:${submission.phone}`} className="text-blue-600 hover:underline font-medium">
                                {submission.phone}
                              </a>
                            </div>
                          )}
                          {submission.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                                {submission.email}
                              </a>
                            </div>
                          )}
                          {submission.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{submission.location}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                            <h5 className="font-medium text-purple-800 dark:text-purple-200">AI Suggested Service</h5>
                            <p className="text-sm text-purple-700 dark:text-purple-300">{submission.suggestedService}</p>
                            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{submission.estimatedPrice}</p>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <strong>Customer Problem Description:</strong>
                        <p className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          {submission.problemDescription}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        {!submission.contacted && (
                          <Button 
                            size="sm"
                            onClick={() => {
                              // Mark as contacted functionality
                              fetch(`/api/smart-analyzer/${submission.id}/contacted`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                              }).then(() => {
                                queryClient.invalidateQueries({ queryKey: ['/api/smart-analyzer'] });
                                toast({
                                  title: "Success",
                                  description: "Smart Analyzer submission marked as contacted",
                                });
                              });
                            }}
                            variant="outline"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Contacted
                          </Button>
                        )}
                        {submission.phone && (
                          <Button size="sm" asChild>
                            <a href={`tel:${submission.phone}`}>
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </a>
                          </Button>
                        )}
                        {submission.email && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={`mailto:${submission.email}`}>
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </a>
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            const message = `Hi ${submission.name || 'there'}! This is AA Trust Roadside. I see you need ${submission.suggestedService.toLowerCase()} service. Our AI estimated ${submission.estimatedPrice}. I can help you right away. Call me at (386) 313-0074.`;
                            navigator.clipboard.writeText(message);
                            toast({
                              title: "Message Copied",
                              description: "AI-generated response copied to clipboard",
                            });
                          }}
                        >
                          Copy AI Response
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(!smartAnalyzer || smartAnalyzer.length === 0) && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No Smart Analyzer submissions yet.</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Smart Analyzer submissions from the website will appear here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Website & Customer Tracking
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Real-time analytics and user behavior tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Website Analytics</h4>
                    <p className="text-2xl font-bold text-blue-600">{websiteAnalytics?.length || 0}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Page views tracked</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Call Tracking</h4>
                    <p className="text-2xl font-bold text-green-600">{callTracking?.length || 0}</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Calls tracked</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Chat Interactions</h4>
                    <p className="text-2xl font-bold text-orange-600">{chatbotInteractions?.length || 0}</p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Chatbot conversations</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">GPS Locations</h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {chatbotInteractions?.filter(chat => chat.gpsLatitude && chat.gpsLongitude).length || 0}
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Precise GPS captured</p>
                  </div>
                </div>

                <Tabs defaultValue="website" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="website">Website Analytics</TabsTrigger>
                    <TabsTrigger value="calls">Call Tracking</TabsTrigger>
                    <TabsTrigger value="chat">Chat Interactions</TabsTrigger>
                    <TabsTrigger value="gps">GPS Locations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="website" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Website Analytics Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {websiteAnalyticsLoading && (
                            <div className="text-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                              <p className="text-gray-500 mt-2">Loading website analytics...</p>
                            </div>
                          )}
                          {websiteAnalytics?.map((analytics) => (
                            <div key={analytics.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold">{analytics.page}</h4>
                                  <p className="text-sm text-gray-600">Session: {analytics.sessionId}</p>
                                </div>
                                <Badge variant="outline">{analytics.device}</Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Browser</p>
                                  <p className="text-gray-600">{analytics.browser || 'Unknown'}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Location</p>
                                  <p className="text-gray-600">{analytics.location || 'Unknown'}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Time on Page</p>
                                  <p className="text-gray-600">{analytics.timeOnPage ? `${analytics.timeOnPage}s` : 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Referrer</p>
                                  <p className="text-gray-600">{analytics.referrer || 'Direct'}</p>
                                </div>
                              </div>
                              <div className="mt-3 flex gap-2">
                                {analytics.formStarted && <Badge variant="secondary">Form Started</Badge>}
                                {analytics.formCompleted && <Badge variant="default">Form Completed</Badge>}
                                {analytics.callButtonClicked && <Badge variant="destructive">Call Button Clicked</Badge>}
                                {analytics.bounced && <Badge variant="outline">Bounced</Badge>}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(analytics.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))}
                          {(!websiteAnalytics || websiteAnalytics.length === 0) && !websiteAnalyticsLoading && (
                            <div className="text-center py-8">
                              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">No website analytics data yet.</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="calls" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Call Tracking Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {callTrackingLoading && (
                            <div className="text-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                              <p className="text-gray-500 mt-2">Loading call tracking...</p>
                            </div>
                          )}
                          {callTracking?.map((call) => (
                            <div key={call.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {call.phone}
                                  </h4>
                                  <p className="text-sm text-gray-600">From: {call.page}</p>
                                </div>
                                <Badge variant="outline">{call.source}</Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Session ID</p>
                                  <p className="text-gray-600">{call.sessionId}</p>
                                </div>
                                <div>
                                  <p className="font-medium">IP Address</p>
                                  <p className="text-gray-600">{call.ipAddress}</p>
                                </div>
                                <div>
                                  <p className="font-medium">User Agent</p>
                                  <p className="text-gray-600 truncate">{call.userAgent || 'Unknown'}</p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(call.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))}
                          {(!callTracking || callTracking.length === 0) && !callTrackingLoading && (
                            <div className="text-center py-8">
                              <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">No call tracking data yet.</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="chat" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Chatbot Interactions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {chatbotInteractionsLoading && (
                            <div className="text-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                              <p className="text-gray-500 mt-2">Loading chat interactions...</p>
                            </div>
                          )}
                          {chatbotInteractions?.map((chat) => (
                            <div key={chat.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold">{chat.customerName || 'Anonymous'}</h4>
                                  <p className="text-sm text-gray-600">Session: {chat.sessionId}</p>
                                </div>
                                <div className="flex gap-2">
                                  {chat.leadQuality && <Badge variant="outline">{chat.leadQuality}</Badge>}
                                  {chat.handoffToCall && <Badge variant="destructive">Handoff to Call</Badge>}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                <div>
                                  <p className="font-medium">Phone</p>
                                  <p className="text-gray-600">{chat.customerPhone || 'Not provided'}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Email</p>
                                  <p className="text-gray-600">{chat.customerEmail || 'Not provided'}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Location</p>
                                  <p className="text-gray-600">{chat.customerLocation || 'Not provided'}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Satisfaction</p>
                                  <p className="text-gray-600">{chat.satisfaction || 'Not rated'}</p>
                                </div>
                              </div>
                              {chat.gpsLatitude && chat.gpsLongitude && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                                  <p className="font-medium text-blue-800 dark:text-blue-200">GPS Location:</p>
                                  <p className="text-sm text-blue-700 dark:text-blue-300">
                                    {chat.gpsLatitude}, {chat.gpsLongitude}
                                    {chat.gpsAccuracy && ` (±${chat.gpsAccuracy}m)`}
                                  </p>
                                  <a 
                                    href={`https://maps.google.com/?q=${chat.gpsLatitude},${chat.gpsLongitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                  >
                                    View on Google Maps
                                  </a>
                                </div>
                              )}
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                <p className="font-medium mb-2">Conversation Summary:</p>
                                <div className="text-sm text-gray-700 dark:text-gray-300 max-h-32 overflow-y-auto">
                                  {chat.conversation ? (
                                    <pre className="whitespace-pre-wrap font-mono text-xs">
                                      {chat.conversation.slice(0, 500)}
                                      {chat.conversation.length > 500 && '...'}
                                    </pre>
                                  ) : (
                                    'No conversation data'
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                {chat.issueResolved && <Badge variant="default">Issue Resolved</Badge>}
                                {chat.locationMethod && <Badge variant="secondary">Location: {chat.locationMethod}</Badge>}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(chat.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))}
                          {(!chatbotInteractions || chatbotInteractions.length === 0) && !chatbotInteractionsLoading && (
                            <div className="text-center py-8">
                              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">No chatbot interactions yet.</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="gps" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>GPS Location Data</CardTitle>
                        <CardDescription>
                          Precise customer locations for emergency response
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {chatbotInteractions?.filter(chat => chat.gpsLatitude && chat.gpsLongitude).map((chat) => (
                            <div key={chat.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold">{chat.customerName || 'Anonymous Customer'}</h4>
                                  <p className="text-sm text-gray-600">Session: {chat.sessionId}</p>
                                </div>
                                <Badge variant="outline">{chat.locationMethod}</Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                  <p className="font-medium text-blue-800 dark:text-blue-200">GPS Coordinates:</p>
                                  <p className="text-sm text-blue-700 dark:text-blue-300 font-mono">
                                    {chat.gpsLatitude}, {chat.gpsLongitude}
                                  </p>
                                  {chat.gpsAccuracy && (
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                      Accuracy: ±{chat.gpsAccuracy} meters
                                    </p>
                                  )}
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                  <p className="font-medium text-green-800 dark:text-green-200">Contact Info:</p>
                                  <p className="text-sm text-green-700 dark:text-green-300">
                                    {chat.customerPhone && `Phone: ${chat.customerPhone}`}
                                    {chat.customerEmail && `Email: ${chat.customerEmail}`}
                                    {!chat.customerPhone && !chat.customerEmail && 'No contact provided'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 mb-3">
                                <Button size="sm" variant="outline" asChild>
                                  <a 
                                    href={`https://maps.google.com/?q=${chat.gpsLatitude},${chat.gpsLongitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    View on Google Maps
                                  </a>
                                </Button>
                                <Button size="sm" variant="outline" asChild>
                                  <a 
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${chat.gpsLatitude},${chat.gpsLongitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Get Directions
                                  </a>
                                </Button>
                                {chat.customerPhone && (
                                  <Button size="sm" asChild>
                                    <a href={`tel:${chat.customerPhone}`}>
                                      <Phone className="w-4 h-4 mr-2" />
                                      Call Customer
                                    </a>
                                  </Button>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">
                                Location captured: {new Date(chat.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))}
                          {(!chatbotInteractions?.some(chat => chat.gpsLatitude && chat.gpsLongitude)) && (
                            <div className="text-center py-8">
                              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">No GPS locations captured yet.</p>
                              <p className="text-sm text-gray-400 mt-2">
                                GPS locations will appear here when customers share their location through the chatbot.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Business Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Phone
                      </label>
                      <Input 
                        type="tel" 
                        defaultValue="(386) 372-8412" 
                        className="w-full"
                        placeholder="Business phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Service Area (miles)
                      </label>
                      <Input 
                        type="number" 
                        defaultValue="100" 
                        className="w-full"
                        placeholder="Service radius in miles"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Emergency Response Time
                      </label>
                      <Input 
                        type="text" 
                        defaultValue="15 minutes" 
                        className="w-full"
                        placeholder="Average response time"
                      />
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Review Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Google Review Link</h4>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value="https://g.page/r/CRFbcS048_EyEBM/review"
                          readOnly
                          className="flex-1 text-sm"
                        />
                        <Button 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText("https://g.page/r/CRFbcS048_EyEBM/review");
                            toast({
                              title: "Copied!",
                              description: "Review link copied to clipboard",
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.open("https://business.google.com/reviews", "_blank");
                        }}
                      >
                        Manage Google Reviews
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "QR Code Generated",
                            description: "QR code for review link created",
                          });
                        }}
                      >
                        Generate QR Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
    </PageOptimizer>
  );
}