import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Key, Shield, Clock, CheckCircle, Phone, Car, Truck } from "lucide-react";

export default function VehicleLockoutService() {
  return (
    <>
      <SEOHead 
        title="Fast & Damage-Free Car Lockout Service | 24/7 Northeast Florida | AA Trust Roadside"
        description="Professional car lockout service in Northeast Florida. Damage-free unlocking for all vehicle makes and models. Available 24/7 for emergency lockouts. Call now!"
        keywords="car lockout service, vehicle lockout, locked out of car, auto locksmith, damage-free unlocking, 24/7 lockout service, Northeast Florida, Palm Coast FL"
        canonicalUrl="https://aatrustroadside.com/vehicle-lockout-service-fl"
      />
      
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black py-20 pt-32">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Fast & Damage-Free <span className="text-blue-500">Car Lockout Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Locked out of your vehicle? Our professional technicians provide fast, damage-free lockout service for all vehicle makes and models. Available 24/7 throughout Northeast Florida.
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

        {/* Unlocking All Vehicle Makes & Models */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Unlocking All Vehicle Makes & Models
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Our skilled technicians are trained to safely unlock all types of vehicles using professional lockout tools and techniques. From classic cars to modern vehicles with advanced security systems, we have the expertise and equipment to get you back in your vehicle quickly and safely.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cars & SUVs</h3>
                <p className="text-gray-400">Professional lockout service for all passenger vehicles including sedans, coupes, SUVs, and crossovers.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Trucks & Vans</h3>
                <p className="text-gray-400">Specialized service for pickup trucks, commercial vans, and fleet vehicles of all sizes.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Modern Security</h3>
                <p className="text-gray-400">Advanced techniques for vehicles with modern security systems, keyless entry, and smart locks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Damage-Free Techniques */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Damage-Free Techniques
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              We use professional lockout tools and proven techniques that protect your vehicle's paint, weather seals, and interior components. Our methods are safe, effective, and won't damage your vehicle's doors, windows, or locking mechanisms.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Professional Tools</h3>
                    <p className="text-gray-400">We use specialized lockout tools designed to safely access vehicles without causing damage.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Protective Methods</h3>
                    <p className="text-gray-400">Door frame protection and careful techniques prevent scratches and damage to paint and seals.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Trained Technicians</h3>
                    <p className="text-gray-400">Our technicians are trained in proper lockout techniques and safety procedures.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Insurance Protection</h3>
                    <p className="text-gray-400">Fully insured service with protection against any unlikely damage during the process.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Lockout Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</div>
                    <span className="text-gray-300">Assess vehicle type and locking mechanism</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</div>
                    <span className="text-gray-300">Select appropriate tools and technique</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</div>
                    <span className="text-gray-300">Protect vehicle surfaces and components</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">4</div>
                    <span className="text-gray-300">Safely unlock and verify operation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 24-Hour Emergency Response */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              24-Hour Emergency Response
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Vehicle lockouts can happen at any time, day or night. Our 24/7 emergency response team is always ready to help you regain access to your vehicle quickly and safely. We understand the urgency of being locked out and prioritize fast response times.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Response</h3>
                <p className="text-gray-400">Average 15-minute response time for emergency lockout services across Northeast Florida.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Safe & Secure</h3>
                <p className="text-gray-400">Licensed, insured, and bonded technicians with proper identification and professional equipment.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">All Vehicle Types</h3>
                <p className="text-gray-400">Expertise with all vehicle makes, models, and security systems including modern keyless entry.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Emergency Lockout Service Areas
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              We provide 24/7 vehicle lockout service throughout Northeast Florida with fast response times and professional equipment.
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
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-white font-medium">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">How quickly can you respond to a lockout?</h3>
                <p className="text-gray-400">Our average response time is 15 minutes for emergency lockout services. We have mobile units positioned throughout Northeast Florida for fast response.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Will you damage my vehicle?</h3>
                <p className="text-gray-400">No, we use professional lockout tools and techniques designed to safely access vehicles without causing damage. We're fully insured for your protection.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Can you unlock modern vehicles with keyless entry?</h3>
                <p className="text-gray-400">Yes, our technicians are trained in advanced techniques for modern vehicles with keyless entry systems and smart locks.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">What identification do you require?</h3>
                <p className="text-gray-400">We require valid photo ID and proof of vehicle ownership or registration to ensure we're helping the rightful owner.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Locked Out of Your Vehicle?
            </h2>
            <p className="text-xl mb-8">
              Don't panic! Call now for fast, professional, damage-free lockout service.
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