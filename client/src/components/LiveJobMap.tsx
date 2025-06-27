
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobLocation {
  id: number;
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  status: 'pending' | 'en_route' | 'in_progress' | 'completed';
  urgency: string;
  lat: number;
  lng: number;
  timeSubmitted: string;
  estimatedArrival?: string;
}

export default function LiveJobMap() {
  const [jobs, setJobs] = useState<JobLocation[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [mapView, setMapView] = useState<'satellite' | 'roadmap'>('roadmap');

  const zones = [
    { value: "all", label: "All Areas" },
    { value: "palm_coast", label: "Palm Coast" },
    { value: "daytona", label: "Daytona Beach" },
    { value: "jacksonville", label: "Jacksonville" },
    { value: "st_augustine", label: "St. Augustine" }
  ];

  useEffect(() => {
    // In real implementation, this would fetch from your API
    const mockJobs: JobLocation[] = [
      {
        id: 1,
        name: "Sarah Johnson",
        phone: "(386) 555-0123",
        address: "123 Palm Coast Pkwy, Palm Coast, FL",
        serviceType: "Tire Change",
        status: "pending",
        urgency: "emergency",
        lat: 29.5845,
        lng: -81.2087,
        timeSubmitted: "2025-01-25T10:30:00Z"
      },
      {
        id: 2,
        name: "Mike Rodriguez",
        phone: "(904) 555-0456",
        address: "456 Beach St, Daytona Beach, FL",
        serviceType: "Jump Start",
        status: "en_route",
        urgency: "urgent",
        lat: 29.2108,
        lng: -81.0228,
        timeSubmitted: "2025-01-25T09:45:00Z",
        estimatedArrival: "15 mins"
      }
    ];
    setJobs(mockJobs);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'en_route': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500 text-white';
      case 'urgent': return 'bg-orange-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const filteredJobs = selectedZone === "all" 
    ? jobs 
    : jobs.filter(job => {
        const address = job.address.toLowerCase();
        switch (selectedZone) {
          case 'palm_coast': return address.includes('palm coast');
          case 'daytona': return address.includes('daytona');
          case 'jacksonville': return address.includes('jacksonville');
          case 'st_augustine': return address.includes('st. augustine');
          default: return true;
        }
      });

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Live Job Tracker Map
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {zones.map(zone => (
                    <SelectItem key={zone.value} value={zone.value}>
                      {zone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMapView(mapView === 'roadmap' ? 'satellite' : 'roadmap')}
              >
                {mapView === 'roadmap' ? '🛰️ Satellite' : '🗺️ Road'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Placeholder for actual Google Map integration */}
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Google Maps Integration</p>
              <p className="text-sm text-gray-400">Real-time job locations will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Jobs ({filteredJobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{job.name}</h4>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getUrgencyColor(job.urgency)}>
                      {job.urgency}
                    </Badge>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Service:</span> {job.serviceType}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(job.timeSubmitted).toLocaleTimeString()}</span>
                  </div>
                  {job.estimatedArrival && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Navigation className="h-4 w-4" />
                      <span>ETA: {job.estimatedArrival}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" asChild>
                    <a href={`tel:${job.phone}`}>
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a 
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(job.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Navigate
                    </a>
                  </Button>
                  <Button size="sm" variant="outline">
                    Update Status
                  </Button>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p>No active jobs in {selectedZone === 'all' ? 'any area' : zones.find(z => z.value === selectedZone)?.label}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
