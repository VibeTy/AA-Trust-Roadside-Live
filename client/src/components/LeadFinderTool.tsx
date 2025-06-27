import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Star, Phone, Mail, Download, Target } from 'lucide-react';

interface LeadData {
  name: string;
  type: string;
  rating: number;
  reviews: number;
  phone?: string;
  address: string;
  opportunity: string;
  priority: 'high' | 'medium' | 'low';
}

export default function LeadFinderTool() {
  const [searchLocation, setSearchLocation] = useState('Palm Coast, FL');
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState<LeadData[]>([]);

  // Simulated lead data - in production this would connect to actual APIs
  const sampleLeads: LeadData[] = [
    {
      name: "Bob's Auto Repair",
      type: "Auto Repair Shop",
      rating: 3.2,
      reviews: 47,
      phone: "(386) 555-0123",
      address: "123 US-1, Palm Coast, FL",
      opportunity: "Low reviews - offer partnership for roadside referrals",
      priority: "high"
    },
    {
      name: "Flagler Towing",
      type: "Towing Service",
      rating: 4.1,
      reviews: 89,
      phone: "(386) 555-0456",
      address: "456 Palm Harbor Pkwy, Palm Coast, FL",
      opportunity: "Competitor - monitor pricing and services",
      priority: "medium"
    },
    {
      name: "Coastal Fleet Services",
      type: "Fleet Management",
      rating: 4.8,
      reviews: 23,
      phone: "(386) 555-0789",
      address: "789 Commerce Ave, Palm Coast, FL",
      opportunity: "High-rated fleet company - potential partnership",
      priority: "high"
    },
    {
      name: "Speedway Gas Station",
      type: "Gas Station",
      rating: 3.5,
      reviews: 156,
      address: "321 State Road 100, Palm Coast, FL",
      opportunity: "Busy location - offer 24/7 roadside partnership",
      priority: "medium"
    }
  ];

  const searchForLeads = async () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setLeads(sampleLeads);
      setIsSearching(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateOutreachMessage = (lead: LeadData) => {
    const templates = {
      "Auto Repair Shop": `Hi ${lead.name}! I'm Fritzner from AA Trust Roadside. I noticed you serve the ${searchLocation} area. I'd love to discuss a partnership where I can handle your after-hours roadside calls and emergency towing. This could be great additional revenue for both of us. Would you be interested in a quick 5-minute chat?`,
      "Towing Service": `Hello! I'm a mobile mechanic in ${searchLocation} and I'm looking to partner with reliable towing services for situations beyond roadside repair. I handle tire changes, jump starts, lockouts, and fuel delivery - which means less basic calls for you and more focus on your higher-value tows. Interested in discussing a referral partnership?`,
      "Fleet Management": `Hi there! I'm Fritzner from AA Trust Roadside, providing 24/7 mobile mechanic services in ${searchLocation}. I specialize in emergency fleet support - tire changes, jump starts, and roadside diagnostics that get your vehicles back on the road fast. I'd love to discuss how I can support your fleet operations. Do you have 10 minutes this week to chat?`,
      "Gas Station": `Hi! I'm a local mobile mechanic and I'm reaching out to see if you'd be interested in referring customers who break down at your location to AA Trust Roadside. I provide 24/7 tire changes, jump starts, and emergency repairs. I can offer you a referral fee for each customer you send my way. Would this be something you'd consider?`
    };

    return templates[lead.type as keyof typeof templates] || `Hi ${lead.name}! I'm Fritzner from AA Trust Roadside, providing 24/7 mobile mechanic services in ${searchLocation}. I'd love to discuss potential partnership opportunities. Are you available for a quick chat this week?`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Local Lead Finder & Outreach Tool
          </CardTitle>
          <p className="text-gray-600">Find potential partners, competitors, and opportunities in your service area</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter city, state (e.g., Palm Coast, FL)"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={searchForLeads} disabled={isSearching}>
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Leads
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {leads.length > 0 && (
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList>
            <TabsTrigger value="opportunities">Opportunities ({leads.length})</TabsTrigger>
            <TabsTrigger value="outreach">Outreach Messages</TabsTrigger>
            <TabsTrigger value="export">Export & Track</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4">
            {leads.map((lead, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{lead.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {lead.address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority} priority
                      </Badge>
                      <Badge variant="outline">{lead.type}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{lead.rating}</span>
                      <span className="text-gray-500">({lead.reviews} reviews)</span>
                    </div>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                        <Phone className="h-4 w-4" />
                        {lead.phone}
                      </a>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                    <h4 className="font-medium text-blue-800 mb-1">💡 Opportunity:</h4>
                    <p className="text-blue-700 text-sm">{lead.opportunity}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm">
                      Generate Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="outreach" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SMS Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">Fleet Partnership</h5>
                    <p className="text-sm text-gray-700 mb-3">
                      "Hi! I'm Fritzner from AA Trust Roadside. I noticed your fleet might need reliable mobile tire service. We offer 24/7 emergency response + fleet discounts. Can we schedule a quick call?"
                    </p>
                    <Button size="sm" variant="outline">Copy Template</Button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">Body Shop Referral</h5>
                    <p className="text-sm text-gray-700 mb-3">
                      "Hello! AA Trust Roadside provides mobile tire + roadside help. We'd love to partner for customer referrals. Our drivers are licensed, insured & offer same-day service. Interested?"
                    </p>
                    <Button size="sm" variant="outline">Copy Template</Button>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">Competitor Response</h5>
                    <p className="text-sm text-gray-700 mb-3">
                      "Saw your recent review about slow service. AA Trust Roadside averages 15-min response in your area. Licensed, insured, fair pricing. Give us a try next time!"
                    </p>
                    <Button size="sm" variant="outline">Copy Template</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Professional Introduction</h5>
                    <div className="text-sm text-gray-700 space-y-2 mb-3">
                      <p><strong>Subject:</strong> Mobile Tire & Roadside Partnership Opportunity</p>
                      <p>Dear [Business Name],</p>
                      <p>I'm Fritzner, owner of AA Trust Roadside. We provide 24/7 mobile tire replacement and roadside assistance across Palm Coast, Daytona, and Jacksonville.</p>
                      <p>Our services include:</p>
                      <ul className="list-disc list-inside ml-4">
                        <li>15-minute average response time</li>
                        <li>Licensed & insured technicians</li>
                        <li>Fleet discounts available</li>
                        <li>Same-day tire replacement</li>
                      </ul>
                      <p>We'd love to discuss a referral partnership that benefits both our customers.</p>
                      <p>Best regards,<br />Fritzner - AA Trust Roadside</p>
                    </div>
                    <Button size="sm" variant="outline">Copy Template</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Outreach Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">23</div>
                    <p className="text-sm text-gray-600">Prospects Selected</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <p className="text-sm text-gray-600">Delivery Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">12%</div>
                    <p className="text-sm text-gray-600">Response Rate</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Start SMS Campaign
                  </Button>
                  <Button variant="outline">
                    Schedule Email Blast
                  </Button>
                  <Button variant="outline">
                    Export Phone Numbers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Export & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-16">
                    <div className="text-center">
                      <Download className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm">Export CSV</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16">
                    <div className="text-center">
                      <Mail className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm">Email List</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16">
                    <div className="text-center">
                      <Target className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm">Track Outreach</div>
                    </div>
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">📊 Outreach Tracking</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-800">24</div>
                      <div className="text-yellow-600">Contacts Made</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-yellow-600">Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-yellow-600">Partnerships</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}