import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SEOHead from "@/components/SEOHead";
import PageOptimizer from "@/components/PageOptimizer";
import OptimizedIcon from "@/components/OptimizedIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DieselRoadsideAssistance() {
  return (
    <>
      <SEOHead 
        title="Diesel Roadside Assistance Near Me | 24/7 Emergency Service | AA Trust Roadside"
        description="Expert diesel roadside assistance near you! 24/7 emergency service for diesel trucks, forced regens, DEF issues, and more. Serving Palm Coast, Jacksonville & Northeast FL. Call (386) 372-8412!"
        keywords="diesel roadside assistance near me, diesel mechanic near me, 24/7 diesel repair, forced regen service, DEF system repair, diesel truck breakdown, emergency diesel service"
        canonicalUrl="https://aatrustroadside.com/diesel-roadside-assistance-near-me"
      />
      <PageOptimizer>
        <div className="min-h-screen bg-black">
          <Navigation />
          <StickyCallButton />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-600 text-white">
              24/7 Emergency Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Diesel Roadside Assistance <span className="text-blue-500">Near Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Expert diesel roadside assistance when you need it most. Our certified technicians provide 24/7 emergency service for all diesel vehicles across Northeast Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-6 text-lg">
                <i className="fas fa-phone mr-2"></i>
                Call Now: (386) 372-8412
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-6 text-lg">
                <i className="fas fa-clipboard mr-2"></i>
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Stats */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">15 Min</div>
              <div className="text-white">Average Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
              <div className="text-white">Emergency Service</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">100%</div>
              <div className="text-white">Mobile Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diesel Services */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Complete Diesel Roadside Assistance Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From forced regens to DEF system repairs, we handle all diesel emergencies with expert care and rapid response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-truck",
                title: "Forced Regen Service",
                description: "Emergency forced regeneration service for diesel trucks and commercial vehicles"
              },
              {
                icon: "fas fa-oil-can",
                title: "DEF System Repair",
                description: "Diesel exhaust fluid system diagnosis and repair service"
              },
              {
                icon: "fas fa-battery-full",
                title: "Diesel Jump Start",
                description: "Heavy-duty jump start service for diesel engines and trucks"
              },
              {
                icon: "fas fa-wrench",
                title: "Engine Diagnostics",
                description: "Computer diagnostics for diesel engines and emission systems"
              },
              {
                icon: "fas fa-gas-pump",
                title: "Diesel Fuel Delivery",
                description: "Emergency diesel fuel delivery service to your location"
              },
              {
                icon: "fas fa-cogs",
                title: "Emergency Repairs",
                description: "On-site diesel engine repairs and troubleshooting"
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

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose AA Trust Roadside for Diesel Service?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Diesel Expertise</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Certified Diesel Technicians</h4>
                    <p className="text-gray-300">Our team specializes in diesel engines and emission systems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Advanced Diagnostic Equipment</h4>
                    <p className="text-gray-300">Professional-grade tools for accurate diesel diagnostics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">All Makes & Models</h4>
                    <p className="text-gray-300">Service for all diesel vehicles, trucks, and commercial fleets</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Emergency Response</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-clock text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Fast Response Time</h4>
                    <p className="text-gray-300">Average 15-minute response for diesel emergencies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Mobile Service</h4>
                    <p className="text-gray-300">We come to you - no need to tow your diesel vehicle</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-shield-alt text-blue-500 mt-1"></i>
                  <div>
                    <h4 className="text-white font-semibold">Licensed & Insured</h4>
                    <p className="text-gray-300">Fully licensed and insured for your protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Common questions about our diesel roadside assistance service
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "What types of diesel vehicles do you service?",
                answer: "We service all diesel vehicles including pickup trucks, commercial trucks, delivery vehicles, RVs, and heavy-duty equipment. Our technicians are experienced with all major diesel engine manufacturers."
              },
              {
                question: "How quickly can you respond to diesel emergencies?",
                answer: "Our average response time is 15 minutes for diesel roadside assistance. We maintain a fleet of mobile service units strategically located throughout Northeast Florida for rapid response."
              },
              {
                question: "Do you provide forced regen services?",
                answer: "Yes, we specialize in forced regeneration services for diesel vehicles with DPF (Diesel Particulate Filter) issues. Our technicians can perform forced regens on-site to get you back on the road quickly."
              },
              {
                question: "What areas do you serve for diesel roadside assistance?",
                answer: "We provide 24/7 diesel roadside assistance throughout Northeast Florida including Palm Coast, Jacksonville, Daytona Beach, St. Augustine, DeLand, Gainesville, and surrounding areas."
              },
              {
                question: "Are your technicians certified for diesel work?",
                answer: "Yes, all our technicians are certified and experienced in diesel engine repair, diagnostics, and emission systems. We maintain ongoing training to stay current with the latest diesel technology."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{faq.answer}</p>
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
            Need Diesel Roadside Assistance Now?
          </h2>
          <p className="text-xl text-white mb-8">
            Don't let diesel problems leave you stranded. Our expert technicians are ready to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              <i className="fas fa-phone mr-2"></i>
              Call Emergency Line: (386) 372-8412
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg">
              <i className="fas fa-clipboard mr-2"></i>
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

          <Footer />
        </div>
      </PageOptimizer>
    </>
  );
}