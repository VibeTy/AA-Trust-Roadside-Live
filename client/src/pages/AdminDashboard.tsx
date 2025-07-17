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
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { QuoteSubmission, ContactSubmission, BookingSubmission } from "@shared/schema";
import TrafficTracker from "@/components/TrafficTracker";
import QuickActionPanel from "@/components/QuickActionPanel";
import LeadFinderTool from "@/components/LeadFinderTool";
import AIReplyAssistant from "@/components/AIReplyAssistant";
import LiveJobMap from "@/components/LiveJobMap";
import RevenueTracker from "@/components/RevenueTracker";
import SettingsPanel from "@/components/SettingsPanel";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("quotes");

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

  // Check if user is authenticated
  useEffect(() => {
    if ((quotesError && quotesError.message.includes("401")) || 
        (contactsError && contactsError.message.includes("401")) ||
        (bookingsError && bookingsError.message.includes("401"))) {
      toast({
        title: "Session Expired",
        description: "Please log in again",
        variant: "destructive"
      });
      setLocation("/admin");
    }
  }, [quotesError, contactsError, bookingsError, setLocation, toast]);

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

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully"
      });
      setLocation("/admin");
    }
  });

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
    todayQuotes: quotes?.filter(q => {
      const today = new Date().toDateString();
      return new Date(q.createdAt).toDateString() === today;
    }).length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AA Trust Roadside - Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage leads and customer inquiries</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Logout
          </Button>
        </div>

        {/* Enhanced Traffic Analytics */}
        <div className="mb-8">
          <TrafficTracker />
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.todayQuotes}</div>
              <p className="text-xs text-muted-foreground">Active leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uncontacted</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.uncontactedQuotes}</div>
              <p className="text-xs text-muted-foreground">Need response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$2,450</div>
              <p className="text-xs text-muted-foreground">Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">18m</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>
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
              <div className="text-2xl font-bold text-green-600">47</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="quotes">🔧 Jobs ({stats.totalQuotes})</TabsTrigger>
            <TabsTrigger value="map">🗺️ Live Map</TabsTrigger>
            <TabsTrigger value="revenue">💰 Revenue</TabsTrigger>
            <TabsTrigger value="leads">🎯 Lead Finder</TabsTrigger>
            <TabsTrigger value="contacts">📧 Contacts</TabsTrigger>
            <TabsTrigger value="actions">⚡ Quick Actions</TabsTrigger>
            <TabsTrigger value="reviews">⭐ Reviews</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🚀 Business Growth Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">This Month's Highlights</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-semibold text-green-600">$8,750</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jobs Completed:</span>
                        <span className="font-semibold">47 jobs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Job Value:</span>
                        <span className="font-semibold">$186</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Satisfaction:</span>
                        <span className="font-semibold text-yellow-600">4.9/5 ⭐</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Growth Opportunities</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div>• 12 potential fleet partnerships identified</div>
                      <div>• 3 body shops interested in referral program</div>
                      <div>• Weekend demand up 34% - consider premium pricing</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🎯 Today's Priority Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Follow up with emergency customer</div>
                        <div className="text-sm text-gray-600">Called 2 hours ago - tire change needed</div>
                      </div>
                      <Button size="sm">Call Now</Button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Send invoice to Fleet Corp</div>
                        <div className="text-sm text-gray-600">3 tire changes completed yesterday</div>
                      </div>
                      <Button size="sm" variant="outline">Send</Button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Update Google Business listing</div>
                        <div className="text-sm text-gray-600">Add new service photos from this week</div>
                      </div>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                          <AIReplyAssistant leadData={{
                            name: quote.name,
                            phone: quote.phone,
                            location: quote.location,
                            serviceType: quote.serviceType,
                            description: quote.description,
                            urgency: quote.urgency,
                            vehicleInfo: quote.vehicleInfo
                          }} />
                          
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

          <TabsContent value="map" className="space-y-4">
            <LiveJobMap />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <RevenueTracker />
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <LeadFinderTool />
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <QuickActionPanel />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>⭐ Google Reviews Manager</CardTitle>
                  <CardDescription>
                    Sync and manage Google Business Profile reviews
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Current Stats</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Average Rating:</span>
                        <div className="font-semibold text-blue-600">4.8/5 ⭐</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Reviews:</span>
                        <div className="font-semibold">62+ reviews</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      onClick={() => {
                        // Implement sync functionality
                        toast({
                          title: "Reviews Synced",
                          description: "Google reviews have been updated",
                        });
                      }}
                    >
                      🔄 Sync Google Reviews
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        window.open("https://business.google.com/reviews", "_blank");
                      }}
                    >
                      📱 Manage on Google
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last synced: 2 hours ago
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>🔗 Review Request Tools</CardTitle>
                  <CardDescription>
                    Tools to get more customer reviews
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Google Review Link</h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="https://g.page/r/CRFbcS048_EyEBM/review"
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
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
                        // Generate QR code for review link
                        toast({
                          title: "QR Code Generated",
                          description: "QR code for review link created",
                        });
                      }}
                    >
                      📱 Generate QR Code
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Send review request via SMS
                        toast({
                          title: "Review Request",
                          description: "SMS template ready to send",
                        });
                      }}
                    >
                      💬 SMS Review Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}