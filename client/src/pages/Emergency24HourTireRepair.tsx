import { Link } from "wouter";
import { Phone, Clock, MapPin, Wrench, Shield, Star } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

export default function Emergency24HourTireRepair() {
  const emergencyServices = [
    "24/7 Emergency Tire Replacement",
    "Flat Tire Repair & Patching", 
    "Mobile Tire Installation",
    "Roadside Tire Service",
    "Emergency Towing Service",
    "Tire Pressure Checks",
    "Wheel Balancing",
    "Emergency Brake Service"
  ];

  const serviceAreas = [
    "Palm Coast, FL",
    "Daytona Beach, FL", 
    "Ormond Beach, FL",
    "DeLand, FL",
    "Palatka, FL",
    "St. Augustine, FL",
    "Jacksonville, FL",
    "Gainesville, FL"
  ];

  return (
    <>
      <SEOHead 
        title="24/7 Emergency Mobile Tire Repair Near Me | AA Trust Roadside"
        description="Emergency mobile tire repair available 24/7 in Northeast Florida. Fast flat tire service, tire replacement, and roadside assistance. Call (386) 372-8412 for immediate help!"
        keywords="24/7 emergency tire repair, emergency mobile tire service, flat tire repair near me, 24 hour tire service, emergency roadside assistance, tire replacement near me, Northeast Florida"
        canonicalUrl="/emergency-24-hour-tire-repair"
      />
      
      <div className="min-h-screen bg-gray-900 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-900 via-gray-900 to-black py-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-red-500">24/7 Emergency</span><br />
              Mobile Tire Repair Near Me
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Flat tire emergency? We're here 24/7! Fast mobile tire replacement and roadside assistance across Northeast Florida.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="tel:+13863728412"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now: (386) 372-8412
              </a>
              <Link href="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
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
              <span className="text-white">4.8/5 - 60+ Reviews</span>
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Emergency Mobile Tire Services Available 24/7
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Don't let a flat tire ruin your day. Our emergency mobile tire repair service comes to you anywhere in Northeast Florida, any time of day or night.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyServices.map((service, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center hover:border-red-500 transition-all duration-300">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Emergency Service */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Our 24/7 Emergency Tire Repair?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">24/7 Availability</h3>
                <p className="text-gray-400">
                  Tire emergencies don't wait for business hours. We're available 24/7, 365 days a year for emergency tire service.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Mobile Service</h3>
                <p className="text-gray-400">
                  We come to you! No need to find a tire shop or wait for a tow. Our mobile tire repair service reaches you anywhere.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Licensed & Insured</h3>
                <p className="text-gray-400">
                  Fully licensed, insured, and certified technicians. Your safety and satisfaction are our top priorities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Emergency Tire Service Areas in Northeast Florida
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our 24/7 emergency mobile tire repair service covers all of Northeast Florida and surrounding areas.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serviceAreas.map((area, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition-all duration-300">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white font-medium">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tire Emergency? We're Here to Help!
            </h2>
            <p className="text-xl mb-8">
              Don't wait - call now for immediate 24/7 emergency mobile tire repair service
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+13863728412"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 372-8412 Now
              </a>
              <a 
                href="tel:+13863387945"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Backup: (386) 338-7945
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}