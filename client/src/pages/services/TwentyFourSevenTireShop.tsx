import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TwentyFourSevenTireShop() {
  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="24/7 Tire Shop Near Me | Emergency Mobile Tire Service | AA Trust Roadside"
        description="24/7 tire shop service near you! Emergency mobile tire replacement, repair, and installation. Open all night for tire emergencies in Palm Coast, Jacksonville & Northeast FL. Call (386) 372-8412!"
        keywords="24/7 tire shop near me, mobile tire repair near me, emergency tire service, tire shop open 24 hours, mobile tire replacement, tire repair near me open now"
        canonicalUrl="https://aatrustroadside.com/24-7-tire-shop-near-me"
      />
      <Navigation />
      <StickyCallButton />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-600 text-white">
              Open 24/7 - Never Closed
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              24/7 Tire Shop <span className="text-blue-500">Near Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Never worry about tire emergencies again! Our mobile tire shop operates 24/7, bringing professional tire services directly to your location - day or night.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-6 text-lg">
                <i className="fas fa-phone mr-2"></i>
                24/7 Emergency: (386) 372-8412
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 bg-black/50 hover:bg-blue-500 hover:text-white px-8 py-6 text-lg font-semibold">
                <i className="fas fa-tire mr-2"></i>
                Get Tire Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Service Features */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-clock text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Service</h3>
              <p className="text-gray-300">Open all day, every day - including holidays</p>
            </div>
            
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-truck text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Service</h3>
              <p className="text-gray-300">We come to you - no need to find a tire shop</p>
            </div>
            
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-stopwatch text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Response</h3>
              <p className="text-gray-300">Average 15-minute response time</p>
            </div>
            
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-tire text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">All Tire Types</h3>
              <p className="text-gray-300">Cars, trucks, motorcycles, and commercial vehicles</p>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Tire Services */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Complete 24/7 Tire Shop Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional tire services available around the clock - because tire emergencies don't wait for business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-tire",
                title: "Emergency Tire Replacement",
                description: "Fast tire replacement service available 24/7 for flat tires and blowouts"
              },
              {
                icon: "fas fa-tools",
                title: "Tire Repair & Patching",
                description: "Professional tire repair service for punctures and minor damage"
              },
              {
                icon: "fas fa-balance-scale",
                title: "Tire Balancing",
                description: "Mobile tire balancing service to eliminate vibrations and improve performance"
              },
              {
                icon: "fas fa-sync-alt",
                title: "Tire Rotation",
                description: "Extend tire life with professional tire rotation service"
              },
              {
                icon: "fas fa-tachometer-alt",
                title: "Tire Pressure Check",
                description: "Complete tire pressure monitoring and adjustment service"
              },
              {
                icon: "fas fa-search",
                title: "Tire Inspection",
                description: "Comprehensive tire inspection to identify wear and safety issues"
              },
              {
                icon: "fas fa-truck",
                title: "Commercial Tire Service",
                description: "24/7 commercial tire service for trucks and fleet vehicles"
              },
              {
                icon: "fas fa-motorcycle",
                title: "Motorcycle Tire Service",
                description: "Specialized motorcycle tire repair and replacement"
              },
              {
                icon: "fas fa-dollar-sign",
                title: "Wholesale Tire Sales",
                description: "Competitive wholesale tire pricing with professional installation"
              }
            ].map((service, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <i className={`${service.icon} text-xl`}></i>
                    </div>
                    <CardTitle className="text-white">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Night Service Benefits */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our 24/7 Tire Shop?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              When other tire shops are closed, we're here to help. Here's why customers choose us for emergency tire service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Night & Weekend Service</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-moon text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Midnight Service Available</h4>
                    <p className="text-gray-300">Full tire service available all night long</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-calendar text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Weekend & Holiday Service</h4>
                    <p className="text-gray-300">Never closed - even on holidays and weekends</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-shield-alt text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Safe & Secure</h4>
                    <p className="text-gray-300">Licensed, insured, and background-checked technicians</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Emergency Response</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-bolt text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Rapid Response</h4>
                    <p className="text-gray-300">15-minute average response time for tire emergencies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Come to You</h4>
                    <p className="text-gray-300">Mobile tire shop comes to your location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-credit-card text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Flexible Payment</h4>
                    <p className="text-gray-300">Cash, card, and financing options available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Tire Emergencies */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Common 24/7 Tire Emergencies We Handle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "fas fa-exclamation-triangle",
                title: "Flat Tire on Highway",
                description: "Roadside flat tire repair and replacement on highways and busy roads"
              },
              {
                icon: "fas fa-explosion",
                title: "Tire Blowout",
                description: "Emergency tire replacement for blowouts and catastrophic tire failures"
              },
              {
                icon: "fas fa-nail",
                title: "Nail in Tire",
                description: "Professional tire repair for nails, screws, and other punctures"
              },
              {
                icon: "fas fa-snowflake",
                title: "Winter Tire Changes",
                description: "Seasonal tire changes and winter tire installation service"
              },
              {
                icon: "fas fa-truck",
                title: "Commercial Fleet Emergencies",
                description: "24/7 commercial tire service for delivery trucks and fleet vehicles"
              },
              {
                icon: "fas fa-home",
                title: "Tire Service at Home",
                description: "Convenient tire service at your home or workplace"
              }
            ].map((emergency, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-600 text-white p-3 rounded-lg">
                      <i className={`${emergency.icon} text-xl`}></i>
                    </div>
                    <CardTitle className="text-white">{emergency.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{emergency.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Need Tire Service Right Now?
          </h2>
          <p className="text-xl text-white mb-8">
            Don't wait until morning - get professional tire service 24/7!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              <i className="fas fa-phone mr-2"></i>
              Call 24/7: (386) 372-8412
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold">
              <i className="fas fa-tire mr-2"></i>
              Get Tire Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}