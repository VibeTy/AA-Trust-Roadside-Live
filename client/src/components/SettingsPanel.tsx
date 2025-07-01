
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Phone, Brain, DollarSign, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPanel() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Twilio Settings
    twilioAccountSid: "",
    twilioAuthToken: "",
    twilioPhoneNumber: "",
    
    // AI Settings
    aiProvider: "together",
    togetherApiKey: "",
    
    // Business Settings
    businessPhone: "(386) 333-4458",
    autoReplyEnabled: true,
    defaultResponseTime: "15-20 minutes",
    
    // Pricing Settings
    baseTirePrice: 150,
    baseJumpStartPrice: 75,
    mileageRate: 2.50,
    
    // Notification Settings
    smsNotifications: true,
    emailNotifications: true,
    webhookUrl: ""
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!response.ok) throw new Error('Failed to save settings');
      
      toast({
        title: "Settings Saved",
        description: "All configuration has been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AA Trust Roadside - Admin Settings</CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="business">📞 Business</TabsTrigger>
          <TabsTrigger value="messaging">💬 Messaging</TabsTrigger>
          <TabsTrigger value="ai">🤖 AI Assistant</TabsTrigger>
          <TabsTrigger value="pricing">💰 Pricing</TabsTrigger>
          <TabsTrigger value="notifications">🔔 Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessPhone">Primary Phone Number</Label>
                <Input 
                  id="businessPhone"
                  value={settings.businessPhone}
                  onChange={(e) => setSettings({...settings, businessPhone: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="responseTime">Default Response Time</Label>
                <Input 
                  id="responseTime"
                  value={settings.defaultResponseTime}
                  onChange={(e) => setSettings({...settings, defaultResponseTime: e.target.value})}
                  placeholder="e.g. 15-20 minutes"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoReply"
                  checked={settings.autoReplyEnabled}
                  onCheckedChange={(checked) => setSettings({...settings, autoReplyEnabled: checked})}
                />
                <Label htmlFor="autoReply">Enable automatic replies to new leads</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Twilio SMS Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="twilioSid">Account SID</Label>
                <Input 
                  id="twilioSid"
                  type="password"
                  value={settings.twilioAccountSid}
                  onChange={(e) => setSettings({...settings, twilioAccountSid: e.target.value})}
                  placeholder="Enter your Twilio Account SID"
                />
              </div>
              
              <div>
                <Label htmlFor="twilioToken">Auth Token</Label>
                <Input 
                  id="twilioToken"
                  type="password"
                  value={settings.twilioAuthToken}
                  onChange={(e) => setSettings({...settings, twilioAuthToken: e.target.value})}
                  placeholder="Enter your Twilio Auth Token"
                />
              </div>

              <div>
                <Label htmlFor="twilioPhone">Twilio Phone Number</Label>
                <Input 
                  id="twilioPhone"
                  value={settings.twilioPhoneNumber}
                  onChange={(e) => setSettings({...settings, twilioPhoneNumber: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Setup Instructions</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Create a Twilio account at twilio.com</li>
                  <li>Purchase a phone number ($1/month)</li>
                  <li>Copy your Account SID and Auth Token from the dashboard</li>
                  <li>Paste them above and save settings</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Reply Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="togetherKey">Together AI API Key</Label>
                <Input 
                  id="togetherKey"
                  type="password"
                  value={settings.togetherApiKey}
                  onChange={(e) => setSettings({...settings, togetherApiKey: e.target.value})}
                  placeholder="Enter your Together AI API key"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🚀 AI Features Enabled</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Smart reply suggestions for customer messages</li>
                  <li>• Automatic pricing recommendations</li>
                  <li>• Urgency scoring for job prioritization</li>
                  <li>• Professional message templates</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Service Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tirePrice">Base Tire Replacement</Label>
                  <Input 
                    id="tirePrice"
                    type="number"
                    value={settings.baseTirePrice}
                    onChange={(e) => setSettings({...settings, baseTirePrice: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="jumpPrice">Jump Start Service</Label>
                  <Input 
                    id="jumpPrice"
                    type="number"
                    value={settings.baseJumpStartPrice}
                    onChange={(e) => setSettings({...settings, baseJumpStartPrice: parseInt(e.target.value)})}
                  />
                </div>

                <div>
                  <Label htmlFor="mileageRate">Price Per Mile</Label>
                  <Input 
                    id="mileageRate"
                    type="number"
                    step="0.25"
                    value={settings.mileageRate}
                    onChange={(e) => setSettings({...settings, mileageRate: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">📊 Zone Multipliers</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-yellow-700">
                  <div>Palm Coast: Base rate (1.0x)</div>
                  <div>Daytona: +10% (1.1x)</div>
                  <div>Jacksonville: +20% (1.2x)</div>
                  <div>St. Augustine: +15% (1.15x)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="smsAlerts"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                />
                <Label htmlFor="smsAlerts">SMS alerts for new leads</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="emailAlerts"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
                <Label htmlFor="emailAlerts">Email notifications</Label>
              </div>

              <div>
                <Label htmlFor="webhook">Webhook URL (optional)</Label>
                <Input 
                  id="webhook"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings({...settings, webhookUrl: e.target.value})}
                  placeholder="https://your-app.com/webhook"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
