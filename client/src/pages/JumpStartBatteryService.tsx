import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageOptimizer from "@/components/PageOptimizer";
import OptimizedIcon from "@/components/OptimizedIcon";
import { Battery, Clock, CheckCircle, Phone, Wrench, Zap } from "lucide-react";

export default function JumpStartBatteryService() {
  return (
    <>
      <SEOHead 
        title="24/7 Jump Start & Battery Service in Palm Coast & Jacksonville | AA Trust Roadside"
        description="Fast 24/7 jump start and battery service in Northeast Florida. Mobile battery testing, on-site replacement, and emergency jump starts. Call (386) 372-8412 now!"
        keywords="jump start service, battery replacement, mobile battery testing, dead battery help, car won't start, Palm Coast FL, Jacksonville FL, 24/7 battery service"
        canonicalUrl="https://aatrustroadside.com/jump-start-battery-service-fl"
      />
      
      <PageOptimizer>
        <div className="min-h-screen bg-gray-900">
          <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black py-20 pt-32">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              24/7 Jump Start & Battery Service in <span className="text-blue-500">Palm Coast & Jacksonville</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Dead battery? We provide fast, reliable jump start and battery replacement services throughout Northeast Florida. Available 24/7 for emergency situations.
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

        {/* Our Jump Start Services */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Jump Start Services
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              When your vehicle won't start, our certified technicians provide fast, professional jump start services using commercial-grade equipment. We arrive quickly and get you back on the road safely, whether it's a dead battery, alternator issue, or electrical problem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Emergency Jump Start</h3>
                <p className="text-gray-400">Fast battery jump start service using professional equipment to get your vehicle running immediately.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Battery className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Battery Testing</h3>
                <p className="text-gray-400">Complete battery health assessment to determine if replacement is needed or if a jump start will suffice.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Alternator Check</h3>
                <p className="text-gray-400">Diagnostic testing to ensure your charging system is working properly and won't leave you stranded again.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Battery Testing */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Mobile Battery Testing
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              Our mobile battery testing service uses advanced diagnostic equipment to accurately assess your battery's condition, capacity, and remaining life. We test both the battery and charging system to identify potential problems before they leave you stranded, providing detailed reports and recommendations.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Complete Battery Analysis</h3>
                    <p className="text-gray-400">Test voltage, capacity, and internal resistance to determine exact battery condition.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Charging System Check</h3>
                    <p className="text-gray-400">Test alternator output and charging system to prevent future battery failures.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Preventive Maintenance</h3>
                    <p className="text-gray-400">Battery terminal cleaning and corrosion prevention to extend battery life.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Testing Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">1</div>
                    <span className="text-gray-300">Visual inspection and terminal cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">2</div>
                    <span className="text-gray-300">Digital battery load test</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">3</div>
                    <span className="text-gray-300">Alternator and charging system test</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">4</div>
                    <span className="text-gray-300">Detailed report and recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* On-Site Battery Replacement */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              On-Site Battery Replacement
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              When your battery needs replacement, we carry high-quality batteries for all vehicle makes and models. Our technicians install your new battery on-site, properly dispose of the old battery, and ensure all connections are secure. We warranty our batteries and provide professional installation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <Battery className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Quality Battery Brands</h3>
                <p className="text-gray-400">We stock premium batteries from trusted manufacturers with warranties ranging from 2-5 years for maximum reliability.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <Wrench className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Professional Installation</h3>
                <p className="text-gray-400">Expert installation with proper terminal connections, secure mounting, and system testing to ensure optimal performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Why Choose Us For a Jump Start?
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto">
              With over 15 years of experience and certified technicians, we provide reliable jump start and battery services throughout Northeast Florida. Our mobile units are fully equipped with professional-grade equipment and quality replacement batteries.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Response</h3>
                <p className="text-gray-400">Average 15-minute response time for emergency jump start services across Northeast Florida.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Professional Equipment</h3>
                <p className="text-gray-400">Commercial-grade jump starters and diagnostic equipment for safe, effective service.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Batteries</h3>
                <p className="text-gray-400">Premium replacement batteries with warranties and professional installation included.</p>
              </div>
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
                <h3 className="text-xl font-semibold text-white mb-3">How quickly can you respond to a jump start request?</h3>
                <p className="text-gray-400">Our average response time is 15 minutes for emergency jump start services. We operate 24/7 across Northeast Florida with multiple mobile units strategically positioned for fast response.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">What if my battery needs replacement?</h3>
                <p className="text-gray-400">We carry quality batteries for all vehicle makes and models. If your battery needs replacement, we can install a new one on-site with proper disposal of the old battery and a warranty on the new battery.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Do you service all types of vehicles?</h3>
                <p className="text-gray-400">Yes, we provide jump start and battery services for cars, trucks, SUVs, motorcycles, and light commercial vehicles. Our equipment is suitable for 12V and 24V systems.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">What areas do you serve?</h3>
                <p className="text-gray-400">We serve Palm Coast, Jacksonville, Daytona Beach, Ormond Beach, DeLand, St. Augustine, and all surrounding areas within a 100-mile radius. Available 24/7 for emergency services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Emergency Jump Start Service?
            </h2>
            <p className="text-xl mb-8">
              Don't wait with a dead battery. Call now for fast, professional jump start and battery service.
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
      </PageOptimizer>
    </>
  );
}