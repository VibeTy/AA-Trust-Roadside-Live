
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ExternalLink, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GoogleReviewRequestProps {
  businessName?: string;
  googleReviewUrl?: string;
  showInline?: boolean;
}

export default function GoogleReviewRequest({ 
  businessName = "AA Trust Roadside",
  googleReviewUrl = "https://g.page/r/CRFbcS048_EyEBM/review",
  showInline = false
}: GoogleReviewRequestProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(googleReviewUrl);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Google review link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const handleReviewClick = () => {
    window.open(googleReviewUrl, '_blank');
  };

  if (showInline) {
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 my-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="font-semibold text-gray-800">Love our service?</span>
        </div>
        <p className="text-gray-700 mb-4">
          Help other drivers find reliable roadside assistance! Your review helps us serve more customers in need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleReviewClick}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
          >
            <Star className="w-4 h-4 mr-2" />
            Leave Google Review
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 sm:w-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-yellow-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Star className="w-5 h-5 text-yellow-500" />
          Review Request
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Satisfied with our service?
          </h3>
          <p className="text-gray-600 mb-4">
            Help other drivers find reliable roadside assistance by leaving a review on Google!
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleReviewClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            size="lg"
          >
            <Star className="w-4 h-4 mr-2" />
            Leave Google Review
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={googleReviewUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600"
            />
            <Button 
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Your honest feedback helps us improve our service and reach more customers in need.
        </div>
      </CardContent>
    </Card>
  );
}
