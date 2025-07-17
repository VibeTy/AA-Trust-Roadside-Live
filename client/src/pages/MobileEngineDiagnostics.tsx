import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Computer, Settings, Truck, Wrench, CheckCircle, Phone, Monitor } from "lucide-react";

export default function MobileEngineDiagnostics() {
  return (
    <>
      <SEOHead 
        title="Mobile Engine Diagnostics & Roadside Repair | Northeast Florida | AA Trust Roadside"
        description="Professional mobile engine diagnostics and roadside repair services. Computer diagnostics, forced regens, diesel engine service. Available 24/7 in Northeast Florida."
        keywords="mobile engine diagnostics, roadside repair, computer diagnostics, forced regen, diesel engine service, engine problems, Northeast Florida, Palm Coast FL"
        canonicalUrl="https://aatrustroadside.com/mobile-engine-diagnostics-fl"
      />
      
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black py-20 pt-32">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mobile Engine Diagnostics & <span className="text-blue-500">Roadside Repair</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Advanced mobile diagnostics and on-site engine repair services for all vehicle types. Our certified technicians bring professional diagnostic equipment directly to your location.
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

        {/* On-Site Computer Diagnostics */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              On-Site Computer Diagnostics
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Our mobile diagnostic service uses advanced computer scanning equipment to identify engine problems, read fault codes, and perform comprehensive system analysis. We diagnose issues with all major vehicle systems including engine, transmission, emissions, and electrical components right at your location.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Computer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">ECU Scanning</h3>
                <p className="text-gray-400">Complete engine control unit analysis to identify fault codes and system malfunctions.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Live Data Analysis</h3>
                <p className="text-gray-400">Real-time monitoring of engine parameters and performance data for accurate diagnosis.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">System Reset</h3>
                <p className="text-gray-400">Clear fault codes and reset systems after repairs to restore optimal performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Engine Problems */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Common Engine Problems We Fix
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Our experienced technicians diagnose and repair a wide range of engine problems on-site. From check engine lights to performance issues, we have the expertise and equipment to get your vehicle running properly again without the need for expensive towing.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Check Engine Light</h3>
                    <p className="text-gray-400">Diagnose and resolve check engine light issues with proper code reading and repairs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Poor Performance</h3>
                    <p className="text-gray-400">Address rough idling, power loss, and acceleration problems through comprehensive diagnostics.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Emission Problems</h3>
                    <p className="text-gray-400">Resolve emission system faults and ensure compliance with environmental standards.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Electrical Issues</h3>
                    <p className="text-gray-400">Diagnose and repair electrical problems affecting engine performance and operation.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Diagnostic Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</div>
                    <span className="text-gray-300">Initial system scan and code reading</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</div>
                    <span className="text-gray-300">Live data analysis and testing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</div>
                    <span className="text-gray-300">Problem identification and repair</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">4</div>
                    <span className="text-gray-300">System reset and verification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Forced Regens & Diesel Engine Service */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Forced Regens & Diesel Engine Service
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Specialized diesel engine diagnostics and forced regeneration services for commercial trucks and diesel vehicles. Our technicians are certified in diesel systems and use professional-grade equipment to perform forced regens, clear DPF codes, and maintain diesel emission systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <Truck className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Forced Regeneration</h3>
                <p className="text-gray-400">Professional forced regen service to clear DPF systems and restore proper diesel engine operation without costly dealer visits.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <Wrench className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">DPF Maintenance</h3>
                <p className="text-gray-400">Diesel particulate filter diagnostics, cleaning, and maintenance to prevent costly engine damage and downtime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Diagnostic Technology */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Diagnostic Technology
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              We invest in the latest diagnostic technology and equipment to provide accurate, comprehensive engine diagnostics. Our mobile units are equipped with professional-grade scanners, meters, and testing equipment capable of diagnosing all vehicle makes and models.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Computer className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Advanced Scanners</h3>
                <p className="text-gray-400">Professional OBD-II scanners with manufacturer-specific capabilities for accurate diagnostics.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Live Data Monitoring</h3>
                <p className="text-gray-400">Real-time engine parameter monitoring and analysis for precise problem identification.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Calibration Tools</h3>
                <p className="text-gray-400">Professional calibration and programming tools for system resets and updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Professional Engine Diagnostics?
            </h2>
            <p className="text-xl mb-8">
              Don't guess what's wrong with your engine. Get professional mobile diagnostics and repair service.
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