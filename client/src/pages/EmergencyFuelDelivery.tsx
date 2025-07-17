import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Fuel, Truck, Clock, CheckCircle, Phone, MapPin, Shield } from "lucide-react";

export default function EmergencyFuelDelivery() {
  return (
    <>
      <SEOHead 
        title="24/7 Emergency Fuel & Diesel Delivery Service | Northeast Florida | AA Trust Roadside"
        description="Emergency fuel and diesel delivery service in Northeast Florida. 24/7 gasoline delivery, diesel fuel for trucks, and emergency fuel service. Call (386) 372-8412!"
        keywords="emergency fuel delivery, diesel delivery, gasoline delivery, fuel service, out of gas, emergency fuel, diesel fuel delivery, Northeast Florida, 24/7 fuel delivery"
        canonicalUrl="https://aatrustroadside.com/emergency-fuel-delivery-fl"
      />
      
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black py-20 pt-32">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              24/7 Emergency Fuel & <span className="text-blue-500">Diesel Delivery Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Out of gas? We deliver emergency fuel and diesel directly to your location. Fast, reliable fuel delivery service available 24/7 throughout Northeast Florida.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="tel:+13863728412"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 372-8412
              </a>
              <a 
                href="/quote"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </section>

        {/* Gasoline Delivery Service */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Gasoline Delivery Service
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Our emergency gasoline delivery service provides high-quality fuel directly to your location when you're stranded without gas. We deliver enough fuel to get you to the nearest gas station safely, with fast response times and professional service throughout Northeast Florida.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Fuel className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Gasoline</h3>
                <p className="text-gray-400">High-quality gasoline delivered in clean, safe containers directly to your vehicle's location.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Anywhere Delivery</h3>
                <p className="text-gray-400">We deliver fuel to any location including highways, parking lots, home driveways, and remote areas.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Response</h3>
                <p className="text-gray-400">Average 20-minute response time for emergency fuel delivery throughout our service area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Diesel Fuel Delivery for Trucks */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Diesel Fuel Delivery for Trucks
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Specialized diesel fuel delivery service for commercial trucks, semi-trailers, and heavy-duty vehicles. We understand the importance of keeping commercial vehicles moving and provide fast, reliable diesel delivery to minimize downtime and get you back on the road quickly.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Commercial Grade Diesel</h3>
                    <p className="text-gray-400">High-quality diesel fuel suitable for all commercial vehicles and heavy-duty equipment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Large Capacity Service</h3>
                    <p className="text-gray-400">Delivery of sufficient diesel fuel to meet the needs of large trucks and commercial vehicles.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">DOT Compliant</h3>
                    <p className="text-gray-400">All fuel delivery follows DOT regulations and safety standards for commercial vehicles.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Fleet Service Available</h3>
                    <p className="text-gray-400">Emergency fuel delivery for fleet vehicles and commercial operations.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <Truck className="w-16 h-16 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Commercial Vehicle Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-300">Semi-trailers and tractor-trailers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-300">Delivery trucks and box trucks</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-300">Construction and utility vehicles</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-300">RVs and motorhomes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-300">Agricultural equipment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Fuel Service Works */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              How Our Fuel Service Works
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Our emergency fuel delivery process is designed to be fast, safe, and convenient. From the moment you call until we deliver fuel to your vehicle, we prioritize speed and safety to get you back on the road as quickly as possible.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Call Us</h3>
                <p className="text-gray-400">Call our 24/7 emergency line and provide your location and fuel type needed.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">2. We Dispatch</h3>
                <p className="text-gray-400">Our nearest mobile unit is dispatched to your location with the appropriate fuel.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fuel className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Fuel Delivery</h3>
                <p className="text-gray-400">We safely deliver and transfer fuel directly into your vehicle's tank.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">4. Back on Road</h3>
                <p className="text-gray-400">You're back on the road with enough fuel to reach the nearest gas station.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Quality */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Safety & Quality Standards
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              We maintain the highest safety standards for fuel delivery with proper equipment, training, and procedures to ensure safe handling and transfer of fuel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Safety First</h3>
                <p className="text-gray-400">DOT-compliant fuel containers and safety equipment used for all deliveries.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fuel className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Fuel</h3>
                <p className="text-gray-400">Premium gasoline and diesel fuel from trusted suppliers and regular quality testing.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Trained Staff</h3>
                <p className="text-gray-400">Certified technicians trained in safe fuel handling and emergency response procedures.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Emergency Fuel Delivery Areas
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              We provide 24/7 emergency fuel delivery throughout Northeast Florida with fast response times and professional service.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                "Palm Coast, FL",
                "Jacksonville, FL", 
                "Daytona Beach, FL",
                "Ormond Beach, FL",
                "DeLand, FL",
                "St. Augustine, FL",
                "Palatka, FL",
                "Gainesville, FL"
              ].map((city, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <p className="text-white font-medium">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Emergency Fuel Delivery?
            </h2>
            <p className="text-xl mb-8">
              Don't stay stranded without fuel. Call now for fast, reliable emergency fuel delivery service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+13863728412"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 372-8412
              </a>
              <a 
                href="/quote"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}