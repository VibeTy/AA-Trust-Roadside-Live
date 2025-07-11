import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SEOHead from "@/components/SEOHead";
import SmartServiceForm from "@/components/SmartServiceForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="24/7 Roadside Assistance & Diesel Repair | Palm Coast & Jacksonville | AA Trust Roadside"
        description="Fast, reliable 24/7 roadside assistance in NE Florida. We offer mobile tire repair, jump starts, diesel mechanics, lockouts, and more. Call now for immediate help!"
        keywords="24/7 roadside assistance, mobile tire repair, diesel repair, jump starts, lockouts, Palm Coast FL, Jacksonville FL, emergency roadside service, Northeast Florida"
        canonicalUrl="https://aatrustroadside.com"
      />
      <Navigation />
      <HeroSection />

      {/* Smart Service Analyzer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🤖 AI-Powered Problem Solver
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not sure what service you need? Our smart analyzer will match your vehicle problem 
              with the right service and give you an instant price estimate.
            </p>
          </div>
          <SmartServiceForm />
        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ServiceAreaSection />
      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from real customers who've experienced our fast, reliable roadside assistance service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <span>★★★★★</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "I had a flat tire on I-95 at 2 AM and AA Trust Roadside was there in 15 minutes! Fast, professional, and got me back on the road quickly. Highly recommend their 24/7 service."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">M</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Michael Rodriguez</p>
                  <p className="text-gray-400 text-sm">Palm Coast, FL</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <span>★★★★★</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "My diesel truck broke down on the highway and Fritzner's team saved the day! They diagnosed the issue quickly and got me running again. Professional service at a fair price."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">J</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Jennifer Thompson</p>
                  <p className="text-gray-400 text-sm">Jacksonville, FL</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <span>★★★★★</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Locked my keys in the car during a family trip to Daytona Beach. AA Trust Roadside arrived quickly and got us back on the road without damaging the vehicle. Excellent service!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">D</span>
                </div>
                <div>
                  <p className="text-white font-semibold">David Chen</p>
                  <p className="text-gray-400 text-sm">Ormond Beach, FL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <StickyCallButton />
    </div>
  );
}