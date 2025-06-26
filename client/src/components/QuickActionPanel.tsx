
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, DollarSign, MapPin, Clock, Send } from 'lucide-react';

export default function QuickActionPanel() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const messageTemplates = [
    {
      id: 'onway',
      title: "I'm on the way",
      message: "Hi! I'm heading to your location now. ETA is about 25 minutes. I'll text when I arrive. - Fritzner, AA Trust Roadside",
      category: 'dispatch'
    },
    {
      id: 'arrived',
      title: "I've arrived",
      message: "I'm here! Look for the AA Trust Roadside truck. I'll assess the situation and get you back on the road ASAP.",
      category: 'dispatch'
    },
    {
      id: 'quote',
      title: "Price confirmed",
      message: "The service will be $[AMOUNT]. This includes parts, labor, and warranty. I can process payment via cash, card, or Venmo. Sound good?",
      category: 'pricing'
    },
    {
      id: 'completed',
      title: "Job completed",
      message: "All done! Your vehicle is ready to go. Thanks for choosing AA Trust Roadside. Please save my number for future emergencies: (386) 313-0074",
      category: 'completion'
    },
    {
      id: 'followup',
      title: "Follow-up check",
      message: "Hey! Just checking - is everything still running smoothly after yesterday's service? Let me know if you need anything else!",
      category: 'followup'
    }
  ];

  const quickPrices = [
    { service: 'Tire Change', price: '$120' },
    { service: 'Jump Start', price: '$80' },
    { service: 'Lockout', price: '$90' },
    { service: 'Fuel Delivery', price: '$75' },
    { service: 'Towing (5mi)', price: '$150' },
    { service: 'Battery Replace', price: '$200' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Quick Response Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {messageTemplates.map((template) => (
              <Button
                key={template.id}
                variant={selectedTemplate === template.id ? "default" : "outline"}
                className="justify-start text-left h-auto p-3"
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setCustomMessage(template.message);
                }}
              >
                <div>
                  <div className="font-medium">{template.title}</div>
                  <div className="text-xs text-gray-500 truncate">{template.message.substring(0, 50)}...</div>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Edit message or write custom response..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-20"
            />
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send SMS
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Pricing & Invoice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Quick Pricing & Invoice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {quickPrices.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-between h-auto p-3"
                onClick={() => setCustomMessage(`Service quote: ${item.service} - ${item.price}. This includes all parts and labor. Ready to proceed?`)}
              >
                <span className="text-sm">{item.service}</span>
                <Badge variant="secondary">{item.price}</Badge>
              </Button>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex gap-2">
              <Input placeholder="Custom service" className="flex-1" />
              <Input placeholder="$0" className="w-24" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" size="sm">
                📧 Email Invoice
              </Button>
              <Button className="flex-1" size="sm">
                💳 Send Payment Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Today's Priority Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 bg-red-600 hover:bg-red-700">
              <div className="text-center">
                <Phone className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Emergency Dispatch</div>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <MapPin className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">View Route Map</div>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Daily Earnings</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
