
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Calendar, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobRecord {
  id: number;
  customerName: string;
  service: string;
  price: number;
  date: string;
  status: 'completed' | 'pending';
  location: string;
}

interface PricingRule {
  service: string;
  basePrice: number;
  pricePerMile: number;
  zones: {
    [key: string]: number; // zone multiplier
  };
}

export default function RevenueTracker() {
  const [jobRecords, setJobRecords] = useState<JobRecord[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [newJob, setNewJob] = useState({
    service: '',
    basePrice: '',
    distance: '',
    zone: ''
  });

  const [stats, setStats] = useState({
    todayRevenue: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    avgJobValue: 0,
    completedJobs: 0
  });

  useEffect(() => {
    // Mock data - replace with real API calls
    const mockJobs: JobRecord[] = [
      {
        id: 1,
        customerName: "Sarah Johnson",
        service: "Tire Replacement",
        price: 180,
        date: "2025-01-25",
        status: "completed",
        location: "Palm Coast"
      },
      {
        id: 2,
        customerName: "Mike Rodriguez",
        service: "Jump Start",
        price: 85,
        date: "2025-01-25",
        status: "completed",
        location: "Daytona Beach"
      },
      {
        id: 3,
        customerName: "Jennifer Davis",
        service: "Tire Change",
        price: 120,
        date: "2025-01-24",
        status: "completed",
        location: "Jacksonville"
      }
    ];
    
    setJobRecords(mockJobs);

    const mockPricing: PricingRule[] = [
      {
        service: "Tire Replacement",
        basePrice: 150,
        pricePerMile: 2.5,
        zones: {
          "palm_coast": 1.0,
          "daytona": 1.1,
          "jacksonville": 1.2,
          "st_augustine": 1.15
        }
      },
      {
        service: "Jump Start",
        basePrice: 75,
        pricePerMile: 2.0,
        zones: {
          "palm_coast": 1.0,
          "daytona": 1.1,
          "jacksonville": 1.2,
          "st_augustine": 1.15
        }
      }
    ];
    
    setPricingRules(mockPricing);

    // Calculate stats
    const today = new Date().toISOString().split('T')[0];
    const todayJobs = mockJobs.filter(job => job.date === today && job.status === 'completed');
    const todayRevenue = todayJobs.reduce((sum, job) => sum + job.price, 0);
    
    const completedJobs = mockJobs.filter(job => job.status === 'completed');
    const avgJobValue = completedJobs.length > 0 
      ? completedJobs.reduce((sum, job) => sum + job.price, 0) / completedJobs.length 
      : 0;

    setStats({
      todayRevenue,
      weekRevenue: 2450,
      monthRevenue: 8750,
      avgJobValue,
      completedJobs: completedJobs.length
    });
  }, []);

  const calculatePrice = () => {
    const service = pricingRules.find(rule => rule.service === newJob.service);
    if (!service) return 0;

    const basePrice = service.basePrice;
    const distance = parseFloat(newJob.distance) || 0;
    const mileageCharge = distance * service.pricePerMile;
    const zoneMultiplier = service.zones[newJob.zone] || 1.0;
    
    return Math.round((basePrice + mileageCharge) * zoneMultiplier);
  };

  return (
    <div className="space-y-6">
      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.todayRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${stats.weekRevenue}</div>
            <p className="text-xs text-muted-foreground">
              Target: $3,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${stats.monthRevenue}</div>
            <p className="text-xs text-muted-foreground">
              Goal: $12,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Job Value</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${Math.round(stats.avgJobValue)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedJobs} jobs completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">💰 Price Calculator</TabsTrigger>
          <TabsTrigger value="jobs">📋 Recent Jobs</TabsTrigger>
          <TabsTrigger value="pricing">⚙️ Pricing Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>Smart Price Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="service">Service Type</Label>
                    <Select value={newJob.service} onValueChange={(value) => setNewJob({...newJob, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tire Replacement">Tire Replacement</SelectItem>
                        <SelectItem value="Jump Start">Jump Start</SelectItem>
                        <SelectItem value="Tire Change">Tire Change</SelectItem>
                        <SelectItem value="Lockout Service">Lockout Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <Input 
                      id="distance"
                      type="number"
                      placeholder="0"
                      value={newJob.distance}
                      onChange={(e) => setNewJob({...newJob, distance: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="zone">Service Zone</Label>
                    <Select value={newJob.zone} onValueChange={(value) => setNewJob({...newJob, zone: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="palm_coast">Palm Coast (Base Rate)</SelectItem>
                        <SelectItem value="daytona">Daytona Beach (+10%)</SelectItem>
                        <SelectItem value="jacksonville">Jacksonville (+20%)</SelectItem>
                        <SelectItem value="st_augustine">St. Augustine (+15%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Calculated Price</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${calculatePrice()}
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>Base price: $150</div>
                    <div>Distance: {newJob.distance || 0} miles × $2.50</div>
                    <div>Zone multiplier: {newJob.zone ? (pricingRules.find(r => r.service === newJob.service)?.zones[newJob.zone] || 1.0) : 1.0}x</div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Send Quote to Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobRecords.map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{job.customerName}</h4>
                      <p className="text-sm text-gray-600">{job.service} • {job.location}</p>
                      <p className="text-xs text-gray-500">{job.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">${job.price}</div>
                      <Badge className={job.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Rules Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pricingRules.map((rule, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3">{rule.service}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Base Price:</span>
                        <div className="text-lg font-bold text-green-600">${rule.basePrice}</div>
                      </div>
                      <div>
                        <span className="font-medium">Per Mile:</span>
                        <div className="text-lg font-bold text-blue-600">${rule.pricePerMile}</div>
                      </div>
                      <div>
                        <span className="font-medium">Daytona Zone:</span>
                        <div className="text-lg font-bold">+{((rule.zones.daytona - 1) * 100).toFixed(0)}%</div>
                      </div>
                      <div>
                        <span className="font-medium">Jacksonville:</span>
                        <div className="text-lg font-bold">+{((rule.zones.jacksonville - 1) * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
