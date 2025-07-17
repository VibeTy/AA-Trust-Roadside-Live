import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageOptimizer from "@/components/PageOptimizer";
import OptimizedIcon from "@/components/OptimizedIcon";
import { CheckCircle, Clock, MapPin, Phone, Star, Users } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Fritzner",
      role: "Founder & Lead Technician",
      description: "Founded AA Trust Roadside with over 15 years of experience in mobile tire repair and roadside assistance.",
      certifications: ["ASE Certified", "Mobile Tire Specialist", "DOT Inspector"]
    }
  ];

  const companyStats = [
    { icon: Users, number: "60+", label: "Trusted Drivers" },
    { icon: Clock, number: "15min", label: "Avg Response Time" },
    { icon: MapPin, number: "100mi", label: "Service Radius" },
    { icon: Star, number: "4.8", label: "Customer Rating" }
  ];

  const whyChooseUs = [
    {
      title: "24/7 Emergency Service",
      description: "Tire emergencies don't wait for business hours. We're available around the clock to get you back on the road safely.",
      icon: Clock
    },
    {
      title: "Mobile Service",
      description: "We come to you! No need to find a tire shop or wait for a tow. Our fully equipped mobile units reach you anywhere.",
      icon: MapPin
    },
    {
      title: "Licensed & Insured",
      description: "Fully licensed, insured, and certified technicians. Your safety and satisfaction are our top priorities.",
      icon: CheckCircle
    },
    {
      title: "Competitive Pricing",
      description: "Fair, transparent pricing with no hidden fees. Quality mobile tire service at rates you can afford.",
      icon: Star
    }
  ];

  return (
    <>
      <SEOHead 
        title="About AA Trust Roadside | Mobile Tire Repair Northeast Florida"
        description="Learn about AA Trust Roadside - Northeast Florida's trusted mobile tire repair and roadside assistance service. Founded by Fritzner with 15+ years experience."
        keywords="about AA Trust Roadside, mobile tire repair company, Fritzner founder, Northeast Florida tire service, roadside assistance team"
        canonicalUrl="https://aatrustroadside.com/about"
      />
      
      <PageOptimizer preloadImages={[]} criticalCSS="">
        <div className="min-h-screen bg-gray-900">
          <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black py-20 pt-32">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-blue-500">AA Trust Roadside</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Northeast Florida's most trusted mobile tire repair and roadside assistance service, founded with a mission to keep you moving safely.
            </p>
            
            <div className="flex justify-center mb-8">
              <a 
                href="tel:+13863728412"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (386) 372-8412
              </a>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {companyStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg">
                    AA Trust Roadside was founded by Fritzner with a simple mission: to provide reliable, professional mobile tire repair and roadside assistance when you need it most.
                  </p>
                  <p className="text-lg">
                    Based in Palm Coast, Florida, we've built our reputation on fast response times, quality service, and treating every customer like family. Our team understands that tire emergencies and roadside breakdowns can happen anywhere, anytime.
                  </p>
                  <p className="text-lg">
                    That's why we've invested in fully equipped mobile service units and trained certified technicians who can handle everything from simple tire changes to complex roadside repairs - all at your location.
                  </p>
                  <p className="text-lg">
                    Whether you're a local resident, a long-haul trucker, or just passing through Northeast Florida, AA Trust Roadside is here to get you back on the road safely and quickly.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Service Areas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Palm Coast, FL",
                    "Daytona Beach, FL",
                    "Jacksonville, FL",
                    "Ormond Beach, FL",
                    "DeLand, FL",
                    "St. Augustine, FL",
                    "Palatka, FL",
                    "Gainesville, FL",
                    "+ 100 mile radius"
                  ].map((area, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-300">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment to You */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Commitment to You
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're committed to providing fast, reliable, and honest roadside assistance service that you can trust. When you're stranded or facing a tire emergency, we promise to be there quickly with the professional service you deserve.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Response</h3>
                <p className="text-gray-400">We understand that time is critical when you're stranded. Our average response time is just 15 minutes, ensuring you get back on the road quickly.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Reliable Service</h3>
                <p className="text-gray-400">Count on us 24/7, 365 days a year. Rain or shine, day or night, we're equipped and ready to help you with professional roadside assistance.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Honest Pricing</h3>
                <p className="text-gray-400">No hidden fees, no surprises. We provide upfront, transparent pricing so you know exactly what to expect before we begin any work.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose AA Trust Roadside?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're more than just a mobile tire service - we're your trusted partner for reliable roadside assistance across Northeast Florida.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChooseUs.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experienced professionals dedicated to providing the best mobile tire repair and roadside assistance service in Northeast Florida.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <p className="text-gray-400 mb-4">{member.description}</p>
                  <div className="space-y-2">
                    {member.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-300 text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the AA Trust Difference?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied customers who trust us for their mobile tire repair and roadside assistance needs.
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