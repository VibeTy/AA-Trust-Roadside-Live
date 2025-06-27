
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Copy, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIReplyAssistantProps {
  leadData: {
    name: string;
    phone: string;
    location: string;
    serviceType: string;
    description: string;
    urgency: string;
    vehicleInfo?: string;
  };
}

export default function AIReplyAssistant({ leadData }: AIReplyAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{
    reply: string;
    price: string;
    urgencyScore: number;
    reasoning: string;
  } | null>(null);
  const { toast } = useToast();

  const generateSmartReply = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/smart-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) throw new Error('Failed to generate reply');
      
      const suggestion = await response.json();
      setAiSuggestion(suggestion);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI reply",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Reply copied to clipboard"
    });
  };

  const sendReply = async (method: 'sms' | 'email') => {
    if (!aiSuggestion) return;
    
    try {
      const response = await fetch('/api/send-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method,
          to: method === 'sms' ? leadData.phone : leadData.email,
          message: aiSuggestion.reply,
          customerName: leadData.name
        })
      });

      if (!response.ok) throw new Error('Failed to send reply');
      
      toast({
        title: "Success!",
        description: `Reply sent via ${method.toUpperCase()}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to send ${method}`,
        variant: "destructive"
      });
    }
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 80) return "bg-red-100 text-red-800";
    if (score >= 60) return "bg-orange-100 text-orange-800";
    if (score >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Reply Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Customer:</strong> {leadData.name}</div>
          <div><strong>Service:</strong> {leadData.serviceType}</div>
          <div><strong>Location:</strong> {leadData.location}</div>
          <div><strong>Issue:</strong> {leadData.description}</div>
        </div>

        <Button 
          onClick={generateSmartReply} 
          disabled={isGenerating}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              AI is analyzing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Generate Smart Reply
            </>
          )}
        </Button>

        {aiSuggestion && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">AI Recommendation</h4>
              <Badge className={getUrgencyColor(aiSuggestion.urgencyScore)}>
                {aiSuggestion.urgencyScore}/100 Urgency
              </Badge>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium mb-2">Suggested Reply:</h5>
              <Textarea 
                value={aiSuggestion.reply}
                readOnly
                className="min-h-[100px] bg-white"
              />
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(aiSuggestion.reply)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => sendReply('sms')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Send SMS
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => sendReply('email')}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <h5 className="font-medium text-blue-800">Suggested Price</h5>
                <p className="text-2xl font-bold text-blue-600">{aiSuggestion.price}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h5 className="font-medium text-gray-800">AI Reasoning</h5>
                <p className="text-sm text-gray-600">{aiSuggestion.reasoning}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
