import { Link } from "wouter";
import { Phone, MapPin, Clock, Wrench, Star, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";

export default function MobileTireRepairNearMe() {
  const localAreas = [
    { city: "Palm Coast", zip: "32137, 32164", features: ["24/7 Service", "15min Response"] },
    { city: "Daytona Beach", zip: "32114, 32117, 32118", features: ["Emergency Service", "Mobile Repair"] },
    { city: "Ormond Beach", zip: "32174, 32176", features: ["Fast Response", "Professional Service"] },
    { city: "DeLand", zip: "32720, 32724", features: ["24/7 Available", "Licensed Techs"] },
    { city: "Jacksonville", zip: "32202, 32207, 32210", features: ["Emergency Repair", "Mobile Service"] },
    { city: "St. Augustine", zip: "32080, 32084", features: ["Fast Service", "Quality Work"] }
  ];

  const mobileServices = [
    "Flat Tire Repair & Patching",
    "Mobile Tire Installation", 
    "Tire Pressure Service",
    "Emergency Tire Replacement",
    "Roadside Tire Service",
    "Wheel Balancing",
    "Tire Rotation Service",
    "Run-Flat Tire Service"
  ];

  return (
    <>
      <SEOHead 
        title="Mobile Tire Repair Near Me | Local Tire Service Northeast FL"
        description="Need mobile tire repair near you? Fast, professional tire service in Palm Coast, Daytona Beach, Jacksonville FL. Call (386) 372-8412 for immediate mobile tire repair!"
        keywords="mobile tire repair near me, tire service near me, mobile tire installation, flat tire repair, tire shop near me, Northeast Florida tire service, Palm Coast tire repair, Daytona Beach mobile tire"
        canonicalUrl="/mobile-tire-repair-near-me"
      />
      
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <StickyCallButton />
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black py-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-blue-500">Mobile Tire Repair</span> Near Me<br />
              <span className="text-3xl md:text-5xl">Northeast Florida</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Professional mobile tire repair service that comes to you. Fast, reliable tire service in Palm Coast, Daytona Beach, Jacksonville and surrounding areas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="tel:+13863728412"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 372-8412
              </a>
              <Link href="/quote">
                <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  Get Free Quote
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-white">4.8/5 Stars - Top Rated Mobile Tire Service</span>
            </div>
          </div>
        </section>

        {/* Local Service Areas */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Mobile Tire Repair Service Areas Near You
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We provide professional mobile tire repair and roadside assistance throughout Northeast Florida. Find your local area below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localAreas.map((area, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{area.city}</h3>
                      <p className="text-gray-400 text-sm">ZIP: {area.zip}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {area.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a 
                      href="tel:+13863728412"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center block transition-colors"
                    >
                      Call for Service
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Tire Services */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professional Mobile Tire Services
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Complete mobile tire repair and installation services. We bring the tire shop to you with professional equipment and quality tires.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mobileServices.map((service, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Mobile Tire Repair */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Choose Mobile Tire Repair Near You?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Convenience</h3>
                      <p className="text-gray-300">We come to your location - home, work, or roadside. No need to drive on a flat tire or wait for a tow.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Fast Response</h3>
                      <p className="text-gray-300">Average 15-minute response time for emergency calls. Professional mobile tire service when you need it most.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Professional Equipment</h3>
                      <p className="text-gray-300">Fully equipped mobile units with professional tools, tire inventory, and certified technicians.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Competitive Pricing</h3>
                      <p className="text-gray-300">Fair, transparent pricing with no hidden fees. Quality mobile tire service at affordable rates.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-white">
                  <Clock className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Available 24/7</h3>
                  <p className="mb-6">Emergency mobile tire repair service available around the clock</p>
                  <a 
                    href="tel:+13863728412"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Call Now: (386) 372-8412
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Mobile Tire Repair Near You?
            </h2>
            <p className="text-xl mb-8">
              Fast, professional mobile tire service throughout Northeast Florida
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+13863728412"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 372-8412
              </a>
              <Link href="/quote">
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}