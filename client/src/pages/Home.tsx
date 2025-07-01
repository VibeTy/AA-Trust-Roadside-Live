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
        title="24/7 Mobile Tire Repair Near Me | Emergency Roadside Assistance FL"
        description="Fast mobile tire repair and emergency roadside assistance in Northeast Florida. Available 24/7 for tire replacement, flat tire service, and roadside help. Call (386) 372-8412 now!"
        keywords="mobile tire repair near me, 24/7 roadside assistance, emergency tire service, tire replacement near me, flat tire repair, mobile mechanic, Northeast Florida, Palm Coast FL, Daytona Beach FL, Jacksonville FL"
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
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <StickyCallButton />
    </div>
  );
}