import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Phone, X, Send, User, Bot, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  problem?: string;
  urgency?: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [leadData, setLeadData] = useState<LeadData>({});
  const [currentStep, setCurrentStep] = useState('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
    accuracy?: number;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          setUserLocation({
            latitude,
            longitude,
            accuracy
          });
          
          // Update lead data with precise location
          setLeadData(prev => ({
            ...prev,
            location: `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`,
            coordinates: `${latitude}, ${longitude}`,
            accuracy: accuracy
          }));
          
          addMessage(`Perfect! I've captured your GPS coordinates (${latitude.toFixed(6)}, ${longitude.toFixed(6)}) with ${Math.round(accuracy)}m accuracy. Our technician will be able to find you precisely.`, 'bot');
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = "I couldn't get your exact location automatically. ";
          if (error.code === 1) {
            errorMessage += "Please allow location access and try again, or describe where you are (address, intersection, or nearby landmarks).";
          } else if (error.code === 2) {
            errorMessage += "Location services are unavailable. Please describe where you are (address, intersection, or nearby landmarks).";
          } else {
            errorMessage += "Please describe where you are (address, intersection, or nearby landmarks).";
          }
          addMessage(errorMessage, 'bot');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      addMessage("Your browser doesn't support location services. Please tell me your location manually.", 'bot');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot', options?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    addMessage(message, 'user');
    setInputMessage('');
    processUserMessage(message);
  };

  const processUserMessage = (message: string) => {
    simulateTyping(() => {
      switch (currentStep) {
        case 'greeting':
          handleGreeting(message);
          break;
        case 'problem':
          handleProblem(message);
          break;
        case 'location':
          handleLocation(message);
          break;
        case 'urgency':
          handleUrgency(message);
          break;
        case 'contact':
          handleContact(message);
          break;
        case 'phone':
          handlePhone(message);
          break;
        case 'email':
          handleEmail(message);
          break;
        default:
          handleGeneral(message);
      }
    });
  };

  const handleGreeting = (message: string) => {
    const name = extractName(message);
    if (name) {
      setLeadData(prev => ({ ...prev, name }));
      addMessage(`Nice to meet you, ${name}! I'm here to help with your roadside assistance needs. What's the problem you're experiencing?`, 'bot', [
        "Flat tire - need repair/replacement",
        "Dead battery - need jump start",
        "Locked out of my vehicle",
        "Ran out of gas/diesel",
        "Engine won't start",
        "Other mechanical issue"
      ]);
      setCurrentStep('problem');
    } else {
      addMessage("I'd love to help! What's your name so I can assist you better?", 'bot');
    }
  };

  const handleProblem = (message: string) => {
    setLeadData(prev => ({ ...prev, problem: message }));
    addMessage(`I understand you're dealing with: ${message}. I can help you share your location with our team. How would you like to proceed?`, 'bot', [
      "📍 Share my GPS location automatically",
      "📝 I'll type my location manually",
      "🗺️ I'll describe nearby landmarks"
    ]);
    setCurrentStep('location');
  };

  const handleLocation = (message: string) => {
    if (message.toLowerCase().includes('gps location') || message.toLowerCase().includes('share my gps')) {
      addMessage("I'll get your GPS location now. Please allow location access when prompted for the most accurate positioning.", 'bot');
      getUserLocation();
      // Location will be set by getUserLocation, continue to urgency after location is captured
      setTimeout(() => {
        addMessage("How urgent is this situation?", 'bot', [
          "Emergency - stranded/unsafe",
          "Urgent - need help within 1 hour",
          "Today - can wait a few hours",
          "Flexible - schedule for later"
        ]);
        setCurrentStep('urgency');
      }, 2000);
    } else {
      setLeadData(prev => ({ ...prev, location: message }));
      addMessage(`Got it, you're at: ${message}. How urgent is this situation?`, 'bot', [
        "Emergency - stranded/unsafe",
        "Urgent - need help within 1 hour",
        "Today - can wait a few hours",
        "Flexible - schedule for later"
      ]);
      setCurrentStep('urgency');
    }
  };

  const handleUrgency = (message: string) => {
    setLeadData(prev => ({ ...prev, urgency: message }));
    
    if (message.toLowerCase().includes('emergency') || message.toLowerCase().includes('urgent')) {
      addMessage(`This sounds urgent! I need to connect you with our team immediately. What's your phone number?`, 'bot');
      setCurrentStep('phone');
    } else {
      addMessage(`Thanks for the info! I'll help you get this resolved. What's your phone number so our technician can reach you?`, 'bot');
      setCurrentStep('phone');
    }
  };

  const handlePhone = (message: string) => {
    if (isValidPhone(message)) {
      setLeadData(prev => ({ ...prev, phone: message }));
      addMessage(`Perfect! Got your number: ${message}. Would you like to provide an email address for updates? (Optional - you can type "skip" to continue)`, 'bot');
      setCurrentStep('email');
    } else {
      addMessage("I need a valid phone number to have our technician contact you. Please provide your phone number:", 'bot');
    }
  };

  const handleEmail = (message: string) => {
    if (message.toLowerCase() === 'skip') {
      completeChat();
    } else if (isValidEmail(message)) {
      setLeadData(prev => ({ ...prev, email: message }));
      completeChat();
    } else {
      addMessage("Please provide a valid email address or type 'skip' to continue:", 'bot');
    }
  };

  const handleGeneral = (message: string) => {
    // Handle FAQ-style questions
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      addMessage("Our pricing varies by service. For tire repair/replacement, it's typically $80-150. For jump starts, around $50-80. For exact pricing, I can connect you with our team. Would you like me to get you a quote?", 'bot', [
        "Yes, get me a quote",
        "Just need general info",
        "I'll call directly"
      ]);
    } else if (lowerMessage.includes('hour') || lowerMessage.includes('time')) {
      addMessage("We're available 24/7! Our average response time is 15-30 minutes depending on your location. Where are you located?", 'bot');
      setCurrentStep('location');
    } else if (lowerMessage.includes('area') || lowerMessage.includes('location')) {
      addMessage("We serve all of Northeast Florida including Jacksonville, Palm Coast, St. Augustine, Gainesville, and surrounding areas within 100 miles. Where do you need service?", 'bot');
      setCurrentStep('location');
    } else {
      addMessage("I'm here to help with roadside assistance! I can help you with tire issues, dead batteries, lockouts, fuel delivery, and more. What problem are you experiencing?", 'bot');
      setCurrentStep('problem');
    }
  };

  const completeChat = () => {
    const urgentKeywords = ['emergency', 'urgent', 'stranded', 'unsafe'];
    const isUrgent = urgentKeywords.some(word => leadData.urgency?.toLowerCase().includes(word));
    
    simulateTyping(() => {
      if (isUrgent) {
        addMessage(`🚨 URGENT: I've got all your details! Our dispatch team is being notified immediately. You should get a call within 5-10 minutes at ${leadData.phone}.`, 'bot');
        addMessage(`In the meantime, if you need immediate assistance, you can call our emergency line: (386) 372-8412`, 'bot', [
          "📞 Call Emergency Line Now",
          "✅ Wait for dispatch call",
          "💬 Ask another question"
        ]);
      } else {
        addMessage(`Perfect! I have all your information. Our team will contact you at ${leadData.phone} within 30 minutes to schedule your service.`, 'bot');
        addMessage(`For immediate service, you can also call us directly at (386) 372-8412`, 'bot', [
          "📞 Call Now for Immediate Service",
          "✅ Wait for callback",
          "💬 I have another question"
        ]);
      }
      
      // Submit lead data
      submitChatLead();
    }, 800);
  };

  const submitChatLead = async () => {
    try {
      const chatData = {
        sessionId: generateSessionId(),
        customerName: leadData.name,
        customerPhone: leadData.phone,
        customerEmail: leadData.email,
        conversation: JSON.stringify(messages),
        customerLocation: leadData.location,
        gpsLatitude: userLocation?.latitude?.toString(),
        gpsLongitude: userLocation?.longitude?.toString(),
        gpsAccuracy: userLocation?.accuracy?.toString(),
        locationMethod: userLocation ? 'gps' : 'manual',
        leadQuality: determineLeadQuality(),
        handoffToCall: false,
        issueResolved: false
      };

      const response = await fetch('/api/chatbot-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatData)
      });

      if (response.ok) {
        // Also create a smart analyzer submission for the admin dashboard
        const analyzerData = {
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email,
          location: leadData.location,
          problemDescription: leadData.problem || 'Chatbot interaction',
          suggestedService: getSuggestedService(),
          estimatedPrice: getEstimatedPrice(),
          urgency: leadData.urgency || 'Medium',
          confidence: 'High'
        };

        await fetch('/api/smart-analyzer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analyzerData)
        });
      }
    } catch (error) {
      console.error('Error submitting chat lead:', error);
    }
  };

  const determineLeadQuality = () => {
    if (leadData.urgency?.toLowerCase().includes('emergency') || leadData.urgency?.toLowerCase().includes('urgent')) {
      return 'hot';
    } else if (leadData.phone && leadData.location) {
      return 'warm';
    } else {
      return 'cold';
    }
  };

  const getSuggestedService = () => {
    const problem = leadData.problem?.toLowerCase() || '';
    if (problem.includes('tire') || problem.includes('flat')) return 'Mobile Tire Repair';
    if (problem.includes('battery') || problem.includes('jump')) return 'Jump Start Service';
    if (problem.includes('lock') || problem.includes('key')) return 'Vehicle Lockout';
    if (problem.includes('gas') || problem.includes('fuel')) return 'Emergency Fuel Delivery';
    if (problem.includes('engine') || problem.includes('start')) return 'Engine Diagnostics';
    return 'General Roadside Assistance';
  };

  const getEstimatedPrice = () => {
    const service = getSuggestedService();
    switch (service) {
      case 'Mobile Tire Repair': return '$80-150';
      case 'Jump Start Service': return '$50-80';
      case 'Vehicle Lockout': return '$60-100';
      case 'Emergency Fuel Delivery': return '$40-70';
      case 'Engine Diagnostics': return '$90-180';
      default: return '$50-150';
    }
  };

  const extractName = (message: string) => {
    const words = message.split(' ');
    const greetings = ['hi', 'hello', 'hey', 'good', 'morning', 'afternoon', 'evening', 'i\'m', 'im', 'my', 'name', 'is'];
    const nameWord = words.find(word => 
      word.length > 1 && 
      !greetings.includes(word.toLowerCase()) &&
      isNaN(Number(word)) &&
      word.match(/^[a-zA-Z]+$/)
    );
    return nameWord;
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateSessionId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleQuickAction = (action: string) => {
    if (action === '📞 Call Emergency Line Now' || action === '📞 Call Now for Immediate Service') {
      window.location.href = 'tel:+13863728412';
    } else if (action === '✅ Wait for dispatch call' || action === '✅ Wait for callback') {
      addMessage("Great! Our team will contact you shortly. This chat will remain open if you need anything else.", 'bot');
    } else if (action === '💬 Ask another question' || action === '💬 I have another question') {
      addMessage("What else can I help you with?", 'bot');
      setCurrentStep('general');
    } else {
      handleSendMessage(action);
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      simulateTyping(() => {
        addMessage("👋 Hi! I'm the AA Trust Roadside assistant. I'm here to help you 24/7 with tire repairs, jump starts, lockouts, and other roadside emergencies. What's your name?", 'bot');
      }, 500);
      setCurrentStep('greeting');
    }
  };

  useEffect(() => {
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-20 left-4 z-50 md:bottom-28 md:left-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-transparent hover:bg-transparent rounded-full w-16 h-16 md:w-24 md:h-24 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-0 p-0 md:animate-bounce hover:animate-none"
          aria-label="Open chat assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
          ) : (
            <img 
              src="/attached_assets/Gemini_Generated_Image_ve42n9ve42n9ve42_1752809889726.png" 
              alt="Fritzner Roadside Assistant" 
              className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-full scale-[1.75] md:animate-pulse"
            />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 w-80 h-[450px] md:bottom-24 md:left-6 md:w-96 md:h-[500px] z-40 shadow-2xl">
          <Card className="h-full flex flex-col">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg p-4 flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" />
                AA Trust Roadside Assistant
              </CardTitle>
              <p className="text-blue-100 text-sm">24/7 Roadside Help • Avg Response: 15min</p>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 max-h-[350px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === 'user' ? (
                          <User className="w-3 h-3" />
                        ) : (
                          <Bot className="w-3 h-3" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                      
                      {message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full text-left justify-start text-xs"
                              onClick={() => handleQuickAction(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        <Bot className="w-3 h-3" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4 bg-white dark:bg-gray-800 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputMessage)}
                    disabled={!inputMessage.trim()}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = 'tel:+13863728412'}
                    className="text-xs"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Call Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage("How much does it cost?")}
                    className="text-xs"
                  >
                    💰 Pricing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage("How fast can you get here?")}
                    className="text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Response Time
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      addMessage("📍 Share my GPS location automatically", 'user');
                      processUserMessage("📍 Share my GPS location automatically");
                    }}
                    className="text-xs"
                  >
                    📍 Share Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}