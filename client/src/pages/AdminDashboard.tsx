import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { QuoteSubmission, ContactSubmission } from "@shared/schema";

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

  // Check if user is authenticated
  useEffect(() => {
    if ((quotesError && quotesError.message.includes("401")) || 
        (contactsError && contactsError.message.includes("401"))) {
      toast({
        title: "Session Expired",
        description: "Please log in again",
        variant: "destructive"
      });
      setLocation("/admin");
    }
  }, [quotesError, contactsError, setLocation, toast]);

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

  const stats = {
    totalQuotes: quotes?.length || 0,
    uncontactedQuotes: quotes?.filter(q => !q.contacted).length || 0,
    totalContacts: contacts?.length || 0,
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuotes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uncontacted</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.uncontactedQuotes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Quotes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayQuotes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="quotes">Quote Requests ({stats.totalQuotes})</TabsTrigger>
            <TabsTrigger value="contacts">Contact Forms ({stats.totalContacts})</TabsTrigger>
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
                          <CardTitle className="text-lg">{quote.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(quote.createdAt)}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getUrgencyColor(quote.urgency)}>
                            {quote.urgency}
                          </Badge>
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline font-medium">
                              {quote.phone}
                            </a>
                          </div>
                          {quote.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                                {quote.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{quote.location}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div><strong>Service:</strong> {quote.serviceType}</div>
                          {quote.vehicleInfo && <div><strong>Vehicle:</strong> {quote.vehicleInfo}</div>}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <strong>Description:</strong>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{quote.description}</p>
                      </div>
                      {!quote.contacted && (
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
        </Tabs>
      </div>
    </div>
  );
}