
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wrench, Truck, Battery, AlertTriangle } from 'lucide-react';

interface ServiceMatch {
  service: string;
  confidence: number;
  urgency: 'emergency' | 'urgent' | 'today' | 'scheduled';
  estimatedPrice: string;
}

export default function SmartServiceForm() {
  const [problemDescription, setProblemDescription] = useState('');
  const [suggestedServices, setSuggestedServices] = useState<ServiceMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeVehicleProblem = async (description: string) => {
    if (!description.trim()) return;
    
    setIsAnalyzing(true);
    
    // AI-powered service matching (simulated for now, can integrate with actual AI later)
    const keywords = description.toLowerCase();
    const matches: ServiceMatch[] = [];

    if (keywords.includes('tire') || keywords.includes('flat') || keywords.includes('puncture')) {
      matches.push({
        service: 'Emergency Tire Replacement',
        confidence: 95,
        urgency: keywords.includes('highway') || keywords.includes('stuck') ? 'emergency' : 'urgent',
        estimatedPrice: '$120-180'
      });
    }

    if (keywords.includes('battery') || keywords.includes('dead') || keywords.includes('jump')) {
      matches.push({
        service: 'Jump Start / Battery Replacement',
        confidence: 90,
        urgency: 'urgent',
        estimatedPrice: '$80-250'
      });
    }

    if (keywords.includes('engine') || keywords.includes('overheating') || keywords.includes('smoke')) {
      matches.push({
        service: 'Mobile Engine Diagnostics',
        confidence: 85,
        urgency: keywords.includes('smoke') || keywords.includes('overheating') ? 'emergency' : 'today',
        estimatedPrice: '$150-300'
      });
    }

    if (keywords.includes('locked') || keywords.includes('keys') || keywords.includes('unlock')) {
      matches.push({
        service: 'Vehicle Lockout Service',
        confidence: 98,
        urgency: 'urgent',
        estimatedPrice: '$75-120'
      });
    }

    if (keywords.includes('tow') || keywords.includes('breakdown') || keywords.includes('wont start')) {
      matches.push({
        service: 'Emergency Towing',
        confidence: 80,
        urgency: 'urgent',
        estimatedPrice: '$100-200'
      });
    }

    setTimeout(() => {
      setSuggestedServices(matches);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'today': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getServiceIcon = (service: string) => {
    if (service.includes('Tire')) return <Wrench className="h-5 w-5" />;
    if (service.includes('Battery') || service.includes('Jump')) return <Battery className="h-5 w-5" />;
    if (service.includes('Towing')) return <Truck className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-blue-600" />
          Smart Vehicle Problem Analyzer
        </CardTitle>
        <p className="text-gray-600">Describe your vehicle issue and we'll match you with the right service</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">What's wrong with your vehicle?</label>
          <Textarea
            placeholder="e.g., 'My tire is flat and I'm stuck on I-95' or 'Engine is overheating and making noise'"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            className="min-h-20"
          />
          <Button 
            onClick={() => analyzeVehicleProblem(problemDescription)}
            disabled={!problemDescription.trim() || isAnalyzing}
            className="mt-3 w-full"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Problem...
              </>
            ) : (
              'Find My Service'
            )}
          </Button>
        </div>

        {suggestedServices.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Recommended Services:</h3>
            {suggestedServices.map((match, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getServiceIcon(match.service)}
                    <h4 className="font-medium">{match.service}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getUrgencyColor(match.urgency)}>
                      {match.urgency}
                    </Badge>
                    <Badge variant="outline">{match.confidence}% match</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">{match.estimatedPrice}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Request This Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestedServices.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🚀 Ready to get help?</h4>
            <p className="text-blue-700 text-sm mb-3">
              Our certified technicians are available 24/7. Average response time: 30-45 minutes.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                📞 Call Now: (386) 313-0074
              </Button>
              <Button variant="outline" className="flex-1">
                💬 Text for Quote
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
