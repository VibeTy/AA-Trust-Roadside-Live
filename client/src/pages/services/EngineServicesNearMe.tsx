import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EngineServicesNearMe() {
  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Engine Services Near Me | 24/7 Mobile Engine Repair | AA Trust Roadside"
        description="Expert engine services near you! 24/7 mobile engine repair, diagnostics, and maintenance. Serving Palm Coast, Jacksonville & Northeast FL. Call (386) 445-7505 for immediate engine help!"
        keywords="engine services near me, mobile engine repair, engine diagnostics near me, 24/7 engine service, truck engine repair, diesel engine service, emergency engine repair"
        canonicalUrl="https://aatrustroadside.com/engine-services-near-me"
      />
      <Navigation />
      <StickyCallButton />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-600 text-white">
              Emergency Engine Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Engine Services <span className="text-blue-500">Near Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Professional mobile engine services brought directly to your location. Expert diagnostics, repairs, and maintenance for all engine types - gas and diesel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-6 text-lg">
                <i className="fas fa-phone mr-2"></i>
                Emergency: (386) 445-7505
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-6 text-lg">
                <i className="fas fa-wrench mr-2"></i>
                Get Engine Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Engine Services Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Complete Mobile Engine Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From check engine lights to complete engine overhauls, we bring professional engine services to your location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-laptop-code",
                title: "Engine Diagnostics",
                description: "Advanced computer diagnostics to identify engine problems quickly and accurately"
              },
              {
                icon: "fas fa-exclamation-triangle",
                title: "Check Engine Light",
                description: "Professional diagnosis and repair of check engine light issues"
              },
              {
                icon: "fas fa-oil-can",
                title: "Oil Changes & Service",
                description: "Mobile oil change service with high-quality oils and filters"
              },
              {
                icon: "fas fa-cogs",
                title: "Engine Repair",
                description: "On-site engine repairs for gasoline and diesel engines"
              },
              {
                icon: "fas fa-thermometer-half",
                title: "Cooling System",
                description: "Radiator, thermostat, and cooling system repair and maintenance"
              },
              {
                icon: "fas fa-battery-full",
                title: "Starting System",
                description: "Starter, alternator, and charging system diagnosis and repair"
              },
              {
                icon: "fas fa-tachometer-alt",
                title: "Performance Tuning",
                description: "Engine performance optimization and tuning services"
              },
              {
                icon: "fas fa-truck",
                title: "Fleet Services",
                description: "Commercial fleet engine maintenance and repair programs"
              },
              {
                icon: "fas fa-clock",
                title: "Emergency Service",
                description: "24/7 emergency engine repair service when you need it most"
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

      {/* Why Choose Our Engine Services */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose AA Trust for Engine Services?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-tools text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Technicians</h3>
              <p className="text-gray-300">ASE-certified technicians with years of engine repair experience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Service</h3>
              <p className="text-gray-300">We come to you - no need to tow your vehicle to a shop</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-clock text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Response</h3>
              <p className="text-gray-300">Average 15-minute response time for engine emergencies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Engine Services Throughout Northeast Florida
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional mobile engine services available 24/7 in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Palm Coast Engine Services",
              "Jacksonville Engine Repair",
              "Daytona Beach Engine Service",
              "St. Augustine Engine Repair",
              "Ormond Beach Engine Service",
              "DeLand Engine Repair",
              "Gainesville Engine Services",
              "Palatka Engine Repair",
              "Flagler Beach Engine Service"
            ].map((area, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-blue-500 transition-all duration-300">
                <h3 className="text-white font-semibold">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Need Engine Services Right Now?
          </h2>
          <p className="text-xl text-white mb-8">
            Don't let engine problems leave you stranded. Our mobile technicians are ready to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              <i className="fas fa-phone mr-2"></i>
              Call Now: (386) 445-7505
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg">
              <i className="fas fa-wrench mr-2"></i>
              Get Engine Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}